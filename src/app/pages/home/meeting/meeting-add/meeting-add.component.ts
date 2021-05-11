import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatAutocomplete, MatChipInputEvent, MatSnackBar} from '@angular/material';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../../../shared/services/http.service';
import {Observable} from 'rxjs';
import {MeetingAddConstants} from './meeting-add-constants';
import {User} from '../../../../shared/models/user';
import {Assignment} from '../../../../shared/models/assignment';
import {Meeting} from '../../../../shared/models/meeting';
import {Agreement} from '../../../../shared/models/agreement';
import {NotesConstants} from '../../new-dashboard/notes/notes-constants';
import {Note} from '../../../../shared/models/note';

@Component({
  selector: 'app-meeting-add',
  templateUrl: './meeting-add.component.html',
  styleUrls: ['./meeting-add.component.scss']
})
export class MeetingAddComponent implements OnInit {
  formCreateMeeting: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    descrition: new FormControl(null),
    grpSelectGrupo: new FormControl(null),
    date: new FormControl(),
    type: new FormControl(null),
    userToAssign: new FormControl(null)
  });
  selectedUser: User;
  tags: string[] = [];
  usersToAssign: User[] = [];
  usersFilteredOptions: Observable<User[]>;
  @ViewChild('userInput', {static: false}) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('userAutoComplete', {static: false}) matAutocomplete: MatAutocomplete;
  isShow = false;
  @Input() meeting: Meeting;
  @Output() note: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataNote: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpService: HttpService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.httpService.get(MeetingAddConstants.GET_ALL_USER_BY_MEETING(this.httpService.selectMeeting.id)).subscribe(res => {
      this.usersToAssign = res.users;
      this.usersFilteredOptions = this.formCreateMeeting.get('userToAssign').valueChanges
      .pipe(
        startWith(''),
        map(value => this.userFilter(value)
        ));
    });

  }
  addNote() {
    let newUser: User;
    let ban = true;
    if (typeof(this.formCreateMeeting.get('userToAssign').value) === 'string') {
      if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.formCreateMeeting.get('userToAssign').value)) {
        const user: User = {
          lastName: '',
          firstName: '',
          secondName: '',
          birthdate: new Date(),
          login: this.formCreateMeeting.get('userToAssign').value,
          email: this.formCreateMeeting.get('userToAssign').value,
        };
        newUser = user;
      } else {
        ban = false;
        this.formCreateMeeting.get('userToAssign').setErrors({error: true});
        this.snackBar.open('Formato de correo invalido', null, {duration: 4000});
      }
    } else {
      newUser = this.formCreateMeeting.get('userToAssign').value;
    }
    if (this.formCreateMeeting.get('title').value !== '' && this.formCreateMeeting.get('title').value && this.formCreateMeeting.get('descrition').value !== ''  && ban) {

      this.dataNote.emit(false); // le cambiamos el valor a esta bandera para que para la proxima vuelva a actualizar
      this.createDocument();
      this.formCreateMeeting.get('title').setValue('');
      this.formCreateMeeting.get('descrition').setValue('');
      this.removeUser();
    }
  }

  /**
   * Metodo que funciona como selector, dependiendo del tipo de documento seleccionado se procedera a especificamente
   * crear el tipo de documento escogido
   */
  createDocument(): void {
    const docType = this.formCreateMeeting.value.type; // Extramos el tipo de documento seleccionado
    switch (docType) { // Con base al tipo seleccionamos la creacion pertinente
      case 'Asignacion':
        this.createAssignmente(this.formCreateMeeting.value);
        break;
      case 'Acuerdo':
        this.createAgreement(this.formCreateMeeting.value);
        break;
      case 'Información':
        this.createNote(this.formCreateMeeting.value);
        break;
    }
  }

  /**
   * Metodo encargado de crear un assignment basado en el selector de tipo de documento escogido por el usuario
   * @param form datos del formulario introducidos por el usuario
   */
  createAssignmente(form): void {
    const assignment: Assignment = {
      title: form.title,
      content: form.descrition,
      initialDate: form.date,
      finalDate: form.date,
      grpId: this.meeting.grpId,
      usrId: form.userToAssign,
      meeId: this.meeting.id,
      status: 1
    };
    // Enviamos el objeto al backend para que nos cree el nuevo registro
    this.httpService.post(NotesConstants.CREATE_ASSIGNMENT_URI(this.httpService.userId), assignment).subscribe((res) => {
      if (res) { // En caso de ser exitosa la respuesta mandar true, en caso contrarior mandar false
        this.dataNote.emit(true); // True para actualizar la vista;
        this.httpService.postNotifier( // Una vez que se crea la asignacion se debe crear una notificacion
          MeetingAddConstants.GET_SEND_NOTIFICATION(),
          {
            type: 2, // Tipo de notificacion, 2 = A push notification
            message: `Usted ha sido asignado a: ${form.title}`, // Mensaje de la notificacion
            status: 1, // Estado de la notificacion, 1 = activa
            usrId: form.userToAssign
          }).subscribe(notificationRes => {
        });
      } // Es necesario colocar que hacer cuando sea false
    });
  }

  /**
   * Metodo encargado de crear un agreement basado en el selector de tipo de documento escogido por el usuario
   * @param form datos del formulario introducidos por el usuario
   */
  createAgreement(form): void {
    const agreement: Agreement = {
      title: form.title,
      content: form.descrition,
      oriId: this.meeting.oriId,
      status: 1,
      createDate: form.date,
      meeId: this.meeting.id,
      usrId: form.userToAssign,
      grpId: this.meeting.grpId
    };
    // Enviamos el objeto al backend para que nos cree el nuevo registro
    this.httpService.post(NotesConstants.CREATE_AGREEMENT_URI(this.httpService.userId), agreement).subscribe((res) => {
      if (res) { // En caso de ser exitosa la respuesta mandar true, en caso contrarior mandar false
        this.dataNote.emit(true); // True para actualizar la vista;
      } // Es necesario colocar que hacer cuando sea false
    });
  }

  /**
   * Metodo encargado de crear un note basado en el selector de tipo de documento escogido por el usuario
   * @param form datos del formulario introducidos por el usuario
   */
  createNote(form): void {
    const note: Note = {
      title: form.title,
      description: form.descrition,
      usrId: form.userToAssign,
      meeId: this.meeting.id,
      grpId: this.meeting.grpId,
      noeDate: form.date
    };
    // Enviamos el objeto al backend para que nos cree el nuevo registro
    this.httpService.post(NotesConstants.CREATE_NOTE_URI(), note).subscribe((res) => {
      if (res) { // En caso de ser exitosa la respuesta mandar true, en caso contrarior mandar false
        this.dataNote.emit(true); // True para actualizar la vista;
      } // Es necesario colocar que hacer cuando sea false
    });
  }

  displayWith(option) {
    return option !== null ? option.name : '';
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  removeUser(): void {
    this.selectedUser = null;
    this.formCreateMeeting.get('userToAssign').reset();
  }

  selectUser(): void {
    this.selectedUser = this.usersToAssign.find(app => app.id === this.formCreateMeeting.get('userToAssign').value.id);
    this.userInput.nativeElement.value = '';
  }

  private userFilter(value: any): User[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.usersToAssign.filter(user => user.firstName.toLowerCase().includes(filterValue)
        || user.lastName.toLowerCase().includes(filterValue));
    } else {
      return this.usersToAssign;
    }
  }

  ngAfterViewInit(): void {
    this.formCreateMeeting.get('type').valueChanges.subscribe(res => {
      this.note.emit(this.formCreateMeeting.get('type').value);
      if (this.formCreateMeeting.get('type').value === 'Asignacion' || this.formCreateMeeting.get('type').value === 'Acuerdo' ) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    });
  }

}
