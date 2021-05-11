import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatAutocomplete, MatChipInputEvent, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {HttpService} from '../../../services/http.service';
import {Group} from '../../../models/group';
import {User} from '../../../models/user';
import {Meeting} from '../../../models/meeting';
import {ModalConstants} from '../modal-constants'

@Component({
  selector: 'app-modal-meeting',
  templateUrl: './modal-meeting.component.html',
  styleUrls: ['./modal-meeting.component.scss']
})
export class ModalMeetingComponent implements OnInit {
  public title: string;
  formGroup: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    group: new FormControl(null,[Validators.required]),
    userInv: new FormControl(null, [Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')]),
    userInv2: new FormControl(false, []),
    date: new FormControl({value: null, disabled: true}, [Validators.required]),
    Location: new FormControl(null, [Validators.required])
  });
  selectedOptions = [];
  listInvitations=[] = [];
  groupFilteredOptions: Group[] = [];
  userByGroup:User [] = [];
  idGroup:number=0;
  updatedIdGroup: number
  origins:any;
  @ViewChild('userInput', {static: false}) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('userAutoComplete', {static: false}) matAutocomplete: MatAutocomplete;


  constructor(public dialogRef: MatDialogRef<ModalMeetingComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private httpService: HttpService,private snackBar: MatSnackBar) {
                this.groupFilteredOptions = data.groups;
                this.idGroup=data.groupId;
                this.formGroup.get('date').setValue(new Date());

  }

  ngOnInit() {
    this.getUserByGroup(this.idGroup);
    this.getGroupById(this.idGroup);
    this.getOrigin();

  }
  onNgModelChange(user, $event){
    if($event === true){
      this.selectedOptions.push(user);
    }else{
      this.selectedOptions = this.selectedOptions.filter(s => s !== user);
    }
  }
  getGroupById(id:number){
    this.httpService.get(ModalConstants.GET_GROUP_BY_ID(id)).subscribe(res=>{
      this.formGroup.get('group').setValue(res.groups.name);
    })
  }
  getOrigin(){
    this.httpService.get(ModalConstants.GET_ORIGIN_URI()).subscribe(res=>{
      this.origins = res.origin;
    })
  }
  onSave() {
    const groupSelect : Group = this.groupFilteredOptions.filter((i) => i.name === this.formGroup.get('group').value)[0]
    this.formGroup.get('userInv').value
    
    this.httpService.get(ModalConstants.GET_USER_BY_ID_URI(this.httpService.userId)).subscribe(res=>{
      
      for(var k in this.selectedOptions) {
        if(this.selectedOptions[k].id !== res.user.id){
          this.listInvitations.push(this.selectedOptions[k])
        }
      }
      this.listInvitations.push(res.user);
    })
    const meeting: Meeting = {
      title:this.formGroup.get('title').value,
      date:this.formGroup.get('date').value,
      oriId:this.formGroup.get('Location').value,
      grpId:groupSelect.id,
      usrId:this.httpService.userId,
      status:2,
      participants: this.listInvitations
    }

    this.dialogRef.close({
      meeting
    });
  }


  hasError(controlName: string, errorName: string) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  getUserByGroup(idGroup:number){
    this.httpService.get(ModalConstants.GET_USERS_BY_GROUPS_URI(idGroup)).subscribe(res=>{
      this.userByGroup=res['users'];
      this.updatedIdGroup = idGroup
    })
    }
  deleteInvList(user:User){
      this.listInvitations=this.listInvitations.filter( (p)=> p.id != user.id );
  }

    getUserByOrgName(controlName: string, errorName: string){
      const inv=this.formGroup.get('userInv').value;
      let registeredEmail: boolean
      
      if(!inv){
        this.snackBar.open('Debe agregar un correo electrónico', null, {duration: 4000});
      }else if(!this.updatedIdGroup){
        this.snackBar.open('Debe primero seleccionar un grupo', null, {duration: 4000});
      }else{

        this.httpService.get(ModalConstants.GET_USERS_BY_EMAIL(inv)).subscribe(res=>{
          
          if(res.user){
            let user = res.user
            this.httpService.get(ModalConstants.GET_USER_ROL_GROUP(res.user.id, this.updatedIdGroup)).subscribe(res=>{
              
              if(res.rol){
                this.snackBar.open('Este invitado ya es miembro del grupo', null, {duration: 4000});
              }else{

                registeredEmail = this.registeredEmail(this.listInvitations,user.email)                
                if(!this.hasError(controlName, errorName) && registeredEmail === false){
                  this.listInvitations.unshift(user)
                  this.formGroup.get('userInv').setValue('');
                }else{
                  this.snackBar.open('Ya invito a este participante', null, {duration: 4000});
                } 
              }
            })            
          }else{
            registeredEmail = this.registeredEmail(this.listInvitations,inv)
                    if(!this.hasError(controlName, errorName) && registeredEmail === false){
                      this.listInvitations.unshift(inv)
                      this.formGroup.get('userInv').setValue('');
                    }else{
                      this.snackBar.open('Ya invito a este participante', null, {duration: 4000});
                    } 
          }
        })

      }    
  }

  //valida si el invitado se ha agregado en el listado
  registeredEmail(list_Invitations : any[], email: string){
    let registeredEmail: boolean = false

    for(var k in list_Invitations) {
      if(list_Invitations[k].email){
        if(list_Invitations[k].email === email) return registeredEmail = true
      }else{
        if(this.listInvitations[k] === email) return registeredEmail = true 
      }      
    }
    return registeredEmail
  }

}

