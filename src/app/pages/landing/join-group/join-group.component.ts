import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.scss']
})
export class JoinGroupComponent implements OnInit {
  joinGroupFormGroup = new FormGroup({
    email: new FormControl(null, [Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'), Validators.required]),
    
  });
  constructor() { }
  hasError(controlName: string, errorName: string) {
    return this.joinGroupFormGroup.controls[controlName].hasError(errorName);
  }
  ngOnInit() {
  }

}
