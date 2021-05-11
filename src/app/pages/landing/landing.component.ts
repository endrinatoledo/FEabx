import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  title: string;
  description: string;
  version: string;

  constructor() {
  }

  ngOnInit() {
    this.title = 'AGREEMENT BOX';
    this.description = 'Herramienta multi-organizacional y empresarial ' +
      'para el control integrado de reuniones, sus acuerdos y asignaciones resultantes';
    this.version = 'ABX V1.1 2019';
  }

}
