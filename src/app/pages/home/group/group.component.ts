import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {HttpService} from '../../../shared/services/http.service';
import {menus} from 'src/app/core/components/menu/menu';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  menus = menus;
  username = 'Agreement Box';
  active: number;


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private httpService: HttpService) {
    this.username = this.httpService.name;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.active = 1;
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
