import {Component, Input, OnInit} from '@angular/core';
import {Menu} from './menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() x: Menu;
  @Input() active: number;
  show = false;

  constructor() {
  }

  ngOnInit() {
  }

}
