import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-agreement-box',
  templateUrl: './welcome-agreement-box.component.html',
  styleUrls: ['./welcome-agreement-box.component.scss']
})
export class WelcomeAgreementBoxComponent implements OnInit {
  mensaje:string="Has sido invitado a formar parte de un grupo. Ahora vamos a proceder a conﬁgurar tu cuenta"
  constructor() { }

  ngOnInit() {
  }

}
