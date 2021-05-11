import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeyValue} from '../models/key-value';
@Injectable({
  providedIn: 'root'
})
export class HttpAudithorService {
  baseUrl = environment.baseMicroserviceAudithor;

  constructor(private http: HttpClient) {}


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
      .append('Content-Type', 'application/json')
      //.append('Access-Control-Allow-Origin', '*');
    const params = new HttpParams();
    keysValues.forEach(kv => {
      params.append(kv.key, kv.value);
    });
    console.log(url);
    return this.http.post<any>(this.baseUrl + url, JSON.stringify(body), {headers, params})
      ;
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


}
