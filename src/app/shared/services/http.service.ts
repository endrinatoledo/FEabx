import {EventEmitter, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeyValue} from '../models/key-value';
import {Group} from '../models/group';
import {Assignment} from '../models/assignment';
import {Meeting} from '../models/meeting';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = environment.baseUrl;
  baseMicroservice = environment.baseMicroservice;
  userId: number;
  name: string;
  email: string;
  selectGroup: Group;
  updateGroup: Group;
  selectAssig: Assignment;
  userRol: string;
  selectMeeting: Meeting;
  meetingId: number;
  participants: [];
  groupId: number;
  public userEmitter = new EventEmitter();

  constructor(private http: HttpClient) {}

  saveToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearToken() {
    localStorage.clear();
  }

  get(url: string, keysValues: KeyValue[] = []): Observable<any> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json');

    const params = new HttpParams();
    keysValues.forEach(kv => {
      params.append(kv.key, kv.value);
    });

    return this.http.get<any>(this.baseUrl + url, {headers, params});
  }

  post(url: string, body, keysValues: KeyValue[] = []): Observable<any> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json');

    const params = new HttpParams();
    keysValues.forEach(kv => {
      params.append(kv.key, kv.value);
    });
    console.log(url);
    return this.http.post<any>(this.baseUrl + url, JSON.stringify(body), {headers, params});
  }


  put(url: string, body, keysValues: KeyValue[] = []): Observable<any> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json');

    const params = new HttpParams();
    keysValues.forEach(kv => {
      params.append(kv.key, kv.value);
    });

    return this.http.put<any>(this.baseUrl + url, JSON.stringify(body), {headers, params});
  }

  delete(url: string,  keysValues: KeyValue[] = []): Observable<any> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json');

    const params = new HttpParams();
    keysValues.forEach(kv => {
      params.append(kv.key, kv.value);
    });

    return this.http.delete<any>(this.baseUrl + url, {headers, params});
  }

  //
  postNotifier(url: string, body, keysValues: KeyValue[] = []): Observable<any> {
    const headers = new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-Type', 'application/json');

    const params = new HttpParams();
    keysValues.forEach(kv => {
      params.append(kv.key, kv.value);
    });

    return this.http.post<any>(this.baseMicroservice + url, JSON.stringify(body), {headers, params});
  }
}
