import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatAutocomplete, MatChipInputEvent, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {HttpService} from '../../../services/http.service';
import {User} from '../../../models/user';
import {ModalConstants} from '../modal-constants'
import {ModalParticipantsConstants} from './modal-participant-constants';


@Component({
  selector: 'app-modal-participant',
  templateUrl: './modal-participant.component.html',
  styleUrls: ['./modal-participant.component.scss']
})
export class ModalParticipantComponent implements OnInit {
  public title: string;
  formParticipant: FormGroup = new FormGroup({
    userByOrg: new FormControl(null, []),
    email: new FormControl(null, [Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')])
  });
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  usersFilteredOptions: Observable<User[]>;
  userByOrg: User[] = [];
  idGroup: number = 0;
  idOrg: number
  nameGroup: string
  selectedUser: User;
  listInvitations: string[] = new Array()
  idUser: number = 0
  participant: User;
  participants: User[] = new Array()
  users: User[]
  participantFilter: User[] = new Array()

  @ViewChild('userInput', {static: false}) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('userAutoComplete', {static: false}) matAutocomplete: MatAutocomplete;


  constructor(public dialogRef: MatDialogRef<ModalParticipantComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private httpService: HttpService, private snackBar: MatSnackBar) {
    this.idGroup = this.httpService.selectGroup.id;
    this.idOrg = this.httpService.selectGroup.orgId;
    this.nameGroup = this.httpService.selectGroup.name
  }

  ngOnInit() {
    this.getUserByGroup()
    this.getAllUserActByOrg()
  }

  getAllUserActByOrg() {
    this.httpService.get(ModalConstants.GET_USERS_ACT_ORG(this.idOrg)).subscribe(res => {
      this.userByOrg = res['users'];
      this.participants.forEach(part => {
        this.userByOrg = this.userByOrg.filter((u) => u.id != part.id);
      })
      this.usersFilteredOptions = this.formParticipant.get('userByOrg').valueChanges
        .pipe(startWith(''), map(value => this.userFilter(value)));
    })
  }

  getUserByGroup() {
    this.httpService.get(ModalConstants.GET_USERS_BY_GROUPS_URI(this.idGroup)).subscribe(res => {
      this.participants = res['users'];
      this.participants = this.participants.filter((p) => p.id != this.httpService.userId)
    })
  }


  selectUser(): void {
    this.selectedUser = this.userByOrg.find(app => app.id === this.formParticipant.get('userByOrg').value.id);
    console.log(this.selectedUser)
    this.userInput.nativeElement.value = '';
  }

  removeUser(): void {
    this.selectedUser = null;
    this.formParticipant.get('userByOrg').reset();
  }

  hasError(controlName: string, errorName: string) {
    return this.formParticipant.controls[controlName].hasError(errorName);
  }

  displayWith(option) {
    return option !== null ? '' : '';
  }

  userDisplayWith(option) {
    return option !== null ? option.name : '';
  }

  private userFilter(value: any): User[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.userByOrg.filter(user => user.firstName.toLowerCase().includes(filterValue)
        || user.lastName.toLowerCase().includes(filterValue));
    } else {
      return this.userByOrg;
    }
  }

  onSaveParticipant() {
    this.participant = this.formParticipant.get('userByOrg').value
    const formParticipants = {
      invited: this.formParticipant.get('email').value,
      participant: this.participant
    }

    if (!this.formParticipant.get('email').value && !this.formParticipant.get('userByOrg').value) {
      this.snackBar.open('Debe agregar un participante o invitado', null, {duration: 10000}).afterOpened().subscribe(res => {
      });
    } else {
      //validar si el correo de invitado ya existe
      this.httpService.get(ModalParticipantsConstants.GET_USER_BY_EMAIL_URI(this.formParticipant.get('email').value)).subscribe(res => {
        if (!res.user) {
          console.log(formParticipants)
          this.dialogRef.close({formParticipants})
        } else {
          this.idUser = res.user.id
          //validar si el usuario ya existe en el grupo
          this.httpService.get(ModalParticipantsConstants.GET_ROL_BY_USER_GROUP_URI(this.idUser, this.idGroup)).subscribe(res => {
            if (res.rol != null) {
              this.snackBar.open('Participante ya es miembro del grupo', null, {duration: 10000}).afterOpened().subscribe(res => {
              });
            } else {
              this.dialogRef.close({formParticipants})
            }
          });
        }
      });

    }
  }

  onCloseModal() {
    const id_group = this.idGroup
    this.dialogRef.close({
      id_group
    })
  }

}

