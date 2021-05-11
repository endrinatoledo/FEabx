import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatAutocomplete, MatChipInputEvent, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Group} from '../../../models/group';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {User} from '../../../models/user';
import {HttpService} from '../../../services/http.service';
import {NotesConstants} from '../../../../pages/home/dashboard/notes/notes-constants';
import {Assignment} from '../../../models/assignment';
import {Comment} from '../../../models/comment';
import {Meeting} from '../../../models/meeting';
import {ModalConstants} from '../modal-constants';


@Component({
  selector: 'app-modal-assignment',
  templateUrl: './modal-assignment.component.html',
  styleUrls: ['./modal-assignment.component.scss']
})
export class ModalAssignmentComponent implements OnInit {
  public title: string;
  formGroup: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    group: new FormControl(null, [Validators.required]),
    meeting: new FormControl(null, [Validators.required]),
    userToAssign: new FormControl(null, []),
    deliveryDate: new FormControl(null, [Validators.required]),
    notification: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    tag: new FormControl(null, []),
    commet: new FormControl(null, [])
  });
  tags: string[] = [];
  groups: Group[] = [];
  groupId:number;
  usersToAssign: User[] = [];
  selectedMeet:Meeting;
  userList: User[] = [];
  selectedUser: User;
  meeting:Meeting;
  meetings:Meeting[];
  Comments:Comment[]=[];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  groupFilteredOptions: Observable<Group[]>;
  usersFilteredOptions: Observable<User[]>;
  @ViewChild('userInput', {static: false}) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('userAutoComplete', {static: false}) matAutocomplete: MatAutocomplete;



  constructor(public dialogRef: MatDialogRef<ModalAssignmentComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private httpService: HttpService,private snackBar: MatSnackBar) {
    this.groups = data.groups;
    this.meeting = data.meeting;
    this.meetings = data.Meetings;
    this.groupId = data.groupId;
    // if( this.meeting ) this.formGroup.get('meeting').setValue(this.meeting.title)
    if( this.groupId ){
      this.formGroup.get('group').setValue( this.groups.filter(g => g.id == this.groupId )[0])
      this.httpService.get(NotesConstants.GET_MEETINGS_BY_GROUP_URI(this.groupId)).subscribe(res=>{
        this.meetings = res.meeting
        if(this.httpService.selectAssig){
          this.formGroup.get('meeting').setValue( this.meetings.filter(g => g.id == this.httpService.selectAssig.meeId )[0])
        }
      })

    /*  this.httpService.get(NotesConstants.GET_USERS_BY_GROUP_URI(this.groupId)).subscribe(res => {
        this.usersToAssign = res.users;
        this.usersFilteredOptions = this.formGroup.get('userToAssign').valueChanges
          .pipe(
            startWith(''),
            map(value => this.userFilter(value)
            ));
      });*/
    }
    this.groupFilteredOptions = this.formGroup.get('group').valueChanges
      .pipe(
        startWith(''),
        map(value => this.groupFilter(value)
        ));

  }
  groupDisplayWith(option) {
    return option !== null ? option.name : '';
  }

  ngOnInit() {
    // this.getGroupById(this.groupId);
    this.formGroup.get('group').valueChanges.subscribe(group=>{
      if(!this.httpService.selectAssig){
        this.httpService.get(NotesConstants.GET_MEETINGS_BY_GROUP_URI(group.id)).subscribe(res=>{
          this.meetings = res.meeting
        })
      }
    })

    this.formGroup.get('meeting').valueChanges.subscribe(meet=>{
      this.selectedMeet = meet
      this.httpService.get(NotesConstants.GET_PARTICIPANTS_BY_MEETING(meet.id)).subscribe(res=>{
        this.usersToAssign = res.users;
        this.usersFilteredOptions = this.formGroup.get('userToAssign').valueChanges
          .pipe(
            startWith(''),
            map(value => this.userFilter(value)
            ));
      })
    })


    if(this.httpService.selectAssig!=undefined)
    {
      this.formGroup.get('title').setValue(this.httpService.selectAssig.title);
      this.formGroup.get('description').setValue(this.httpService.selectAssig.content),
      this.formGroup.get('deliveryDate').setValue(this.httpService.selectAssig.finalDate),
      this.formGroup.get('group').setValue(this.httpService.selectAssig.group),
      this.formGroup.get('notification').setValue(this.httpService.selectAssig.notification)
      this.selectedUser=this.httpService.selectAssig.user;
      this.getCommentByAssignment(this.httpService.userId,this.httpService.selectAssig.id);
    }

  }

  getGroupById(id:number){
    this.httpService.get(ModalConstants.GET_GROUP_BY_ID(id)).subscribe(res=>{
      this.formGroup.get('group').setValue(res.groups.name);
    })
  }

  displayWith(option) {
    return option !== null ? '' : '';
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
    this.formGroup.get('userToAssign').reset();
  }

  selectUser(): void {
    this.selectedUser = this.usersToAssign.find(app => app.id === this.formGroup.get('userToAssign').value.id);
    this.userInput.nativeElement.value = '';
  }

  private groupFilter(value: any): Group[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.groups.filter(group => group.name.toLowerCase().includes(filterValue));
    } else {
      return this.groups;
    }
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

  onSave() {
    const assignment: Assignment = {
      title: this.formGroup.get('title').value,
      content: this.formGroup.get('description').value,
      initialDate: new Date(),
      finalDate: this.formGroup.get('deliveryDate').value,
      grpId: this.formGroup.get('group').value.id,
      notification:this.formGroup.get('notification').value,
      meeId: this.selectedMeet.id
    };

    if (this.formGroup.get('userToAssign').value !== null) {
      assignment.usrId = this.formGroup.get('userToAssign').value.id;
    }

    if(this.httpService.selectAssig)
    {
      const comment: Comment = {
        description:this.formGroup.get('commet').value,
        updatedAt:new Date(),
        asmId:this.httpService.selectAssig.id,
        usrId:this.httpService.userId,
      };

      this.httpService.post(ModalConstants.CREATE_COMMENT_ASSIGNMENT_URI(this.httpService.userId),comment).subscribe(res=>{

      })
    }
    this.dialogRef.close({
      assignment
    });

  }


  getCommentByAssignment(idUser,idAssig){
    this.httpService.get(ModalConstants.GET_COMMENT_ASSIGNMENT_URI(idUser,idAssig)).subscribe(res=>{
      this.Comments=res;
      this.getUserListBycComment(this.Comments);
    })
  }

 getUserListBycComment(comments:Comment[])
 {
    comments.forEach((c)=>{
      this.getUserById(c.usrId);
    })
 }

 getUserById(id){
  this.httpService.get(ModalConstants.GET_USER_BY_ID_URI(id)).subscribe(res=>{
    this.userList.push(res['user']);
  })
 }
 preClose()
 {
   this.httpService.selectAssig.status=4; //Se cambia el atributo status a Precerrar
   this.httpService.put(ModalConstants.GET_STATUS_BY_ASSIGNMENT_URI(this.httpService.userId),this.httpService.selectAssig).subscribe(res=>{
     this.snackBar.open(`Se ha Preccerado la asignación ${res['assignments'].title}`, null, {
       duration: 4000
     });
   })
 }

}
