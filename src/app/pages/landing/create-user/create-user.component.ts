import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {User} from '../../../shared/models/user'
import {Router} from '@angular/router';
import{LandingConstants} from '../landing-constants'
import {HttpService} from '../../../shared/services/http.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnInit {
  createUserFormGroup = new FormGroup({
    email: new FormControl(null, [Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'), Validators.required]),
    name:new FormControl(null, [Validators.required]),
    lastName:new FormControl(null, [Validators.required]),
    password:new FormControl(null, [Validators.minLength(5), Validators.required]),
    comfirmPassword:new FormControl(null, [Validators.minLength(5),Validators.required])
  });
  validateDomain:boolean=false;
  listDomins:any=[];
  imagen:any;
  validateInvitation:boolean=false;
  idOrg:number=1;

  constructor(private snackBar: MatSnackBar,private httpService: HttpService,private router: Router) { }

  ngOnInit() {
    this.getListDomains();
  }

  hasError(controlName: string, errorName: string) {
    return this.createUserFormGroup.controls[controlName].hasError(errorName);
  }
  onSave()
  {
    if(!(this.createUserFormGroup.get('password').value ===this.createUserFormGroup.get('comfirmPassword').value))
    {
      this.snackBar.open('Las contaseñas no coiciden', null, {
        duration: 4000
      });
    }else
    {
        this.httpService.get(LandingConstants.GET_USER_BY_EMAIL_URI(this.createUserFormGroup.get("email").value)).subscribe(res=>{
        // Se validad si el usario ya existe en la base de datos
        if (res[ ' user ' ])
        {
          this.snackBar.open('El Usuario ya existe', null, {
            duration: 4000
          });

        }else
        {
        // obtenemos la dominio del correo
         const stringAux=this.createUserFormGroup.get("email").value.split('@');
         // Se valida si el correo tiene un dominio valido
          if(this.listDomins.find( element => element.domExtension===stringAux[1] ))
          {
            this.httpService.get(LandingConstants.GET_INCITATIONS_BY_EMAIL_URI(this.createUserFormGroup.get("email").value)).subscribe(res=>{
              if(res['invitation']){
                  let names=this.createUserFormGroup.get("name").value.split(" ");//Se separa los nombres en dos
                  const user: User = {
                    login: this.createUserFormGroup.get("name").value[0]+this.createUserFormGroup.get("lastName").value,
                    firstName: names[0],
                    secondName: (names[1] == undefined ? '' : names[1]  ) ,
                    lastName: this.createUserFormGroup.get("lastName").value,
                    email: this.createUserFormGroup.get("email").value,
                    img: this.imagen,
                    birthdate: new Date(2018, 11, 24),
                    password:this.createUserFormGroup.get("password").value,
                    idOrg:this.listDomins.filter(l => l.domExtension===stringAux[1])[0].orgId,
                    grpId: res['invitation'].grpId
                };
                this.httpService.post(LandingConstants.GET_CREATE_USER_URI(),user).subscribe(res=>
                {
                  const configuration={
                    product:LandingConstants.GET_PRODUCT(),
                    origin:LandingConstants.GET_ORIGIN(),
                    to: this.createUserFormGroup.get("email").value,
                    type:LandingConstants.GET_TYPE_CREATE_USER(),
                    actions:LandingConstants.GET_ACTIONS_CREATE_USER()
                  }
                  this.httpService.postNotifier(LandingConstants.GET_EMAIL_URI(),configuration).subscribe(res=>{
                    this.router.navigate(['/agreement-box-email-confirm']);
                  })
                });

              }else{
                this.snackBar.open('Usted no tiene una invitacion para unirse a ABX', null, {
                  duration: 5000
                });
              }
            })
          }else
          {
            this.snackBar.open('El dominio del correo no correponde a niguna empresa', null, {
              duration: 4000
            });
          }
        }
      })
    }
  }
  getImagen(imagen:any){this.imagen=imagen}
  getListDomains(){
    this.httpService.get(LandingConstants.GET_DOMAINS_URI()).subscribe(res=>{
      this.listDomins=res['domains'];
    });
  }
}
