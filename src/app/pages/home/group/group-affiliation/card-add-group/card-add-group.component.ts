import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-add-group',
  templateUrl: './card-add-group.component.html',
  styleUrls: ['./card-add-group.component.scss']
})
export class CardAddGroupComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  newGroup() {
    this.router.navigate(['/home/group/my-group']);
  }
}
