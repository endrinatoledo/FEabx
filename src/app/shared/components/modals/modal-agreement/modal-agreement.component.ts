import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatDialogRef
} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Group} from '../../../models/group';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {User} from '../../../models/user';
import {USERS} from '../../../data';
import {Agreement} from '../../../models/agreement';
import {Meeting} from '../../../models/meeting';
import {HttpService} from '../../../services/http.service';
import {NotesConstants} from '../../../../pages/home/dashboard/notes/notes-constants';

@Component({
  selector: 'app-modal-agreement',
  templateUrl: './modal-agreement.component.html',
  styleUrls: ['./modal-agreement.component.scss']
})
export class ModalAgreementComponent implements OnInit {
  public title: string;
  formGroup: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    meeting: new FormControl(null, [Validators.required]),
    group: new FormControl(null, [Validators.required]),
    origin: new FormControl(null, [Validators.required]),
    tag: new FormControl(null, []),
    summary: new FormControl(null, [Validators.required])
  });
  tags: string[] = [];
  approvers: User[] = [];
  selectedApprovers: User[] = [];
  groups: Group[] = [];
  groupId:number;
  groupFilteredOptions: Observable<Group[]>;
  approversFilteredOptions: Observable<User[]>;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('approverInput', {static: false}) approverInput: ElementRef<HTMLInputElement>;
  @ViewChild('ApproverAutoComplete', {static: false}) matAutocomplete: MatAutocomplete;
  agreement: Agreement;
  origins = [];
  meeting : Meeting;
  meetings : Meeting[] = [];

  constructor(public dialogRef: MatDialogRef<ModalAgreementComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private httpService: HttpService) {
    this.groups = data.groups;
    this.origins = data.origins;
    this.meeting = data.meeting;
    this.meetings = data.Meetings;
    this.groupId = data.groupId;
    if(this.meeting) this.formGroup.get('meeting').setValue(this.meeting.title)
    if( this.groupId ){
      this.formGroup.get('group').setValue( this.groups.filter(g => g.id == this.groupId )[0])
      this.httpService.get(NotesConstants.GET_MEETINGS_BY_GROUP_URI(this.groupId)).subscribe(res=>{
        this.meetings = res.meeting
      })
    }
    this.groupFilteredOptions = this.formGroup.get('group').valueChanges
      .pipe(
        startWith(''),
        map(value => this.groupFilter(value)
        ));
    }

  ngOnInit() {

    this.formGroup.get('group').valueChanges.subscribe(value => {
      this.approvers = Object.assign([], USERS);
    });

    this.formGroup.get('group').valueChanges.subscribe(group => {
      this.httpService.get(NotesConstants.GET_MEETINGS_BY_GROUP_URI(group.id)).subscribe(res => {
        this.meetings = res.meeting;
      });
    });
  }

  groupDisplayWith(option) {
    return  option.name
  }

  private groupFilter(value: any): Group[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.groups.filter(group => group.name.toLowerCase().includes(filterValue));
    } else {
      return this.groups;
    }
  }

  private approverFilter(value: any): User[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.approvers.filter(user => user.firstName.toLowerCase().includes(filterValue)
        || user.lastName.toLowerCase().includes(filterValue));
    } else {
      return this.approvers;
    }
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

  removeApprover(approver: User): void {
    const index = this.selectedApprovers.indexOf(approver);
    if (index >= 0) {
      this.selectedApprovers.splice(index, 1);
      this.approvers.push(approver);
    }
  }

  selectApprover(event: MatAutocompleteSelectedEvent): void {
    const approver = this.approvers.find(app => app.id === this.formGroup.get('approver').value.id);
    this.selectedApprovers.push(approver);
    const index = this.approvers.indexOf(approver);
    if (index >= 0) {
      this.approvers.splice(index, 1);
    }
    this.approverInput.nativeElement.value = '';
    this.formGroup.get('approver').reset();
  }

  onSave() {
    const agreement: Agreement = {
      title: this.formGroup.get('title').value,
      content: this.formGroup.get('summary').value,
      createDate: new Date(),
      updateDate:new Date(),
      oriId: this.formGroup.get('origin').value,
      grpId: this.formGroup.get('group').value.id,
      meeId:this.formGroup.get('meeting').value.id
    };
    this.dialogRef.close({
      agreement
    });
  }
}
