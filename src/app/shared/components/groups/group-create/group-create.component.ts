import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRouteSnapshot} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Group} from '../../../models/group'
import {User} from '../../../models/user'
import {Usersrolatr} from '../../../models/usersrolatr'
import {HttpService} from '../../../../shared/services/http.service';
import{GroupCreateConstants} from './group-create-constants'


@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent implements OnInit {

  formCreateGroup: FormGroup = new FormGroup({
    grpName:new FormControl(null, [Validators.required]),
    grpDescription:new FormControl(null, [Validators.required]),
    grpSelectGrupo:new FormControl({value: null}, [Validators.required]),
    selectPart:new FormControl(),
    invitation:new FormControl(null, [Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')])
  });

  @Output() salida=new EventEmitter<any>();
  @Input() user;
  groups:Group[]=new Array();
  group:Group[];
  idOrg:number=0;
  users:User[]
  participants:User[]=new Array()
  auxParticipants:User[]=new Array()
  listInvitations:string[]=new Array()
  numlistInvitations=0;
  imagen:any=null;

  constructor(private router: Router, private httpService:HttpService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.idOrg=0;
    this.getGroupsByOrg(this.httpService.userId);
    this.formCreateGroup.get('selectPart').valueChanges.subscribe(part => {
      this.participants.push(part);
      this.users = this.users.filter((i) => i !== part);
    })

  }

  hasError(controlName: string, errorName: string) {
    return this.formCreateGroup.controls[controlName].hasError(errorName);
  }

  onSaveGroup()
  {
    const group: Group = {
      name:this.formCreateGroup.get('grpName').value ,
      parentId: this.formCreateGroup.get('grpSelectGrupo').value.id,
      description:this.formCreateGroup.get('grpDescription').value ,
      acronym: GroupCreateConstants.GET_USER_ACRONYM(),
      img:this.imagen,
      orgId:this.formCreateGroup.get('grpSelectGrupo').value['organizations']['orgId'],
      userId:this.httpService.userId
    }

    if(this.httpService.updateGroup == undefined)
    {
      this.httpService.post(GroupCreateConstants.GET_CREATE_GROUP_URI(this.httpService.userId),group).subscribe(res=>{
        this.insertParticipants(res['groups'].id)
        this.saveAndSubmitInvitacion(this.listInvitations,res['groups'].id,this.httpService.userId,res['groups'].name,this.participants)
        this.updateGroups();
        this.snackBar.open('El grupo se a creado con exito', null, {duration: 10000}).afterOpened().subscribe(res=>{
        this.router.navigate(['/home/group/my-group']);
        });
      })

    }else{
        group.id=this.httpService.updateGroup.id;
        this.httpService.put(GroupCreateConstants.GET_GROUPS_URI(),group).subscribe(res=>{
          this.DeletePartGroup(this.auxParticipants);
          this.insertParticipants(res['groups'].id)
          this.httpService.selectGroup=res['groups'];
          this.updateGroups();
          this.snackBar.open('El grupo se a modificado con exito', null, {duration: 4000});
          this.router.navigate(['/home/group/my-group']);
        })
    }

  }
  getOrg(id:number)
  {
    this.httpService.get(GroupCreateConstants.GET_ORG_BY_USER_URI(id)).subscribe(res=>{
      this.idOrg=(res['employee'] == null ? 0 : res['employee'] .orgId );
    })

  }
  getGroupsByOrg(id:number)
  {
    this.httpService.get(GroupCreateConstants.GET_ORG_BY_USER_URI(id)).subscribe(res=>{
      this.httpService.get(GroupCreateConstants.GET_GROUPS_BY_ORG_URI( (res['employee'] == null ? 0 : res['employee'] .orgId ))).subscribe(res2=>{
        this.groups=res2['groups'];
        this.getUserByOrg((res['employee'] == null ? 0 : res['employee'] .orgId ));
        this.initForms(this.formCreateGroup);
      })
    })
  }

 getUserByOrg(idOrg:number){
  this.httpService.get(GroupCreateConstants.GET_USER_BY_ORG_URI(idOrg)).subscribe(res=>{
    this.users=res['users'];
    this.users = this.users.filter((user) => user.id !== this.httpService.userId);
  })

 }

insertParticipants(idGroup)
{
  this.participants.forEach(participant => {
    const usersrolatr: Usersrolatr = {
      userid:participant.id,
      groupid:idGroup,
      rolid:GroupCreateConstants.GET_USER_ROL_ID_PART(),
      urgstatus:GroupCreateConstants.GET_USER_STATUS()
    }
    this.httpService.post(GroupCreateConstants.GET_GROUP_PARTICIPANT(),usersrolatr).subscribe( () =>{})
  });
}
// llena el forms con los datos iniciales si se edita un grupo
initForms(formGroup:FormGroup){

  if(this.httpService.updateGroup==undefined)
  {
    formGroup.get('grpName').setValue('');
    formGroup.get('grpDescription').setValue('');
    formGroup.get('grpSelectGrupo').setValue('');
  }else
  {
    this.getUserByGroup(this.httpService.updateGroup.id);
    this.group=this.groups.filter((g) => g.id == this.httpService.updateGroup.parentId);
    formGroup.get('grpName').setValue(this.httpService.updateGroup.name);
    formGroup.get('grpDescription').setValue(this.httpService.updateGroup.description);
    formGroup.get('grpSelectGrupo').setValue(this.group[0]);
  }
}
// dado el id del grupo Obtiene todos los participantes
getUserByGroup(idGroup:number){
this.httpService.get(GroupCreateConstants.GET_USERS_BY_GROUPS_URI(idGroup)).subscribe(res=>{
  this.participants=res['users'];
  this.participants=this.participants.filter((p)=> p.id != this.httpService.userId)
  this.filterSelectPart(this.participants);
})
}
// quita de select los usuarios que ya son participantes
filterSelectPart(part:User[])
{
    part.forEach(part=>{
      this.users=this.users.filter((u)=> u.id != part.id);
    })
}
updateGroups(){ this.salida.emit()}

getImagen(imagen:any){this.imagen=imagen;}

DeletePartList(user:User){
  this.participants=this.participants.filter( (p)=> p.id != user.id );
  this.users.push(user);
  this.auxParticipants.push(user);
}

DeletePartGroup(part:User[]){
  part.forEach(part => {
    this.httpService.delete(GroupCreateConstants.GET_DELETE_PART_GROUP(part.id,this.httpService.updateGroup.id)).subscribe(()=>{})
  });
}

addInvitation(controlName: string, errorName: string){
  const inv=this.formCreateGroup.get('invitation').value;
  if(!this.hasError(controlName, errorName) && !this.listInvitations.includes(inv)){
    this.listInvitations.unshift(inv);
    this.formCreateGroup.get('invitation').setValue('');
  }else
  {
    this.snackBar.open('Ya invito a este participante', null, {duration: 4000});
  }
}
enlace_externo(){
  //funciona window.open:
  /*window.open("https://www.google.com", "_blank");*/
  /*let urlToOpen = 'http://www.google.com'
  let url: string = '';
  if (!/^http[s]?:\/\//.test(urlToOpen)) {
    url += 'http://';
  }

url += urlToOpen;
window.open(url, '_blank');*/

const link = document.createElement('a');
link.target = '_blank';
link.href = 'https://www.google.es';
link.setAttribute('visibility', 'hidden');
link.click();


  /*window.location.href = ActivatedRouteSnapshot.data['externalUrl'];
  return true; */
}

deleteInvitation(item){
  this.listInvitations=this.listInvitations.filter( (i)=>  i !== item)
}
saveAndSubmitInvitacion(listInvitations,groupId,userId,groupName,participants){
  const invitation={
    status:GroupCreateConstants.GET_INV_STATUS_URI(),
    grpId:groupId,
    usrId: userId,
    email: ""
  }
  const configuration={
    product:GroupCreateConstants.GET_PRODUCT(),
    origin:GroupCreateConstants.GET_ORIGIN(),
    to: "",
    type:GroupCreateConstants.GET_TYPE(),
    actions:GroupCreateConstants.GET_ACTIONS_INVITATION_USER(),
    var:[
      {
        name:'leader',
        value:this.httpService.name
      },
      {
        name:'groupName',
        value:groupName
      }
    ]
  }
  //se envia la invitacio al usuario externo
  listInvitations.forEach(element=>{
    invitation.email=element;
    configuration.to=element;
    this.httpService.post(GroupCreateConstants.GET_INVITATION_URI(),invitation).subscribe(res=>{})
    this.httpService.postNotifier(GroupCreateConstants.GET_EMAIL_URI(),configuration).subscribe(res=>{})
  })
  // se le envia la notificacion al los usuarios que van a participar en el grupo
  participants.forEach(element=>{
      configuration.to=element.email;
      this.httpService.postNotifier(GroupCreateConstants.GET_EMAIL_URI(),configuration).subscribe(res=>{})
  })
}

}
