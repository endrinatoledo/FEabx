import { Component, OnInit,Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material';
import {HttpService} from '../../../services/http.service';
import {Group} from '../../../models/group';
import {ModalDeleteConstants} from './modal-delete-constants'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-modal-delete-group',
  templateUrl: './modal-delete-group.component.html',
  styleUrls: ['./modal-delete-group.component.scss']
})
export class ModalDeleteGroupComponent implements OnInit {
  public title: string;
  group:Group;
  constructor(public dialogRef: MatDialogRef<ModalDeleteGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private httpService: HttpService, private snackBar: MatSnackBar) {
      this.group = data.group;
}

  ngOnInit() { }

  //Elimina el grupo seleccionado
  deleteGroup(group:Group){
    this.httpService.delete(ModalDeleteConstants.GET_GROUP_URI(group.id)).subscribe(res=>{
      this.snackBar.open('El grupo se a eliminado con exito', null, {
        duration: 10000
        })
    })
  }
}
