import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import { CreateUserComponent } from './create-user.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {UpdateImagenUserComponent} from '../../../shared/components/update-imagen-user/update-imagen-user.component' 
describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserComponent,UpdateImagenUserComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        AvatarModule,
        BrowserModule,
        BrowserAnimationsModule
      ]
     
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('unit test create createUserFormGroup', () => {
    expect(Object.keys(component.createUserFormGroup.controls)).toEqual(['email', 'name','lastName','password','comfirmPassword']);
  });
  it('unit test valid createUserFormGroup', () => {
    component.createUserFormGroup.get('name').setValue('Richard');
    component.createUserFormGroup.get('lastName').setValue('Ortega');
    component.createUserFormGroup.get('email').setValue('rortega@intelix.biz');
    component.createUserFormGroup.get('password').setValue('rortega@intelix.biz');
    component.createUserFormGroup.get('comfirmPassword').setValue('rortega@intelix.biz');
    expect(component.createUserFormGroup.get('name').value).toBe('Richard');
    expect(component.createUserFormGroup.get('lastName').value).toBe('Ortega');
    expect(component.createUserFormGroup.get('email').value).toBe('rortega@intelix.biz');
    expect(component.createUserFormGroup.get('password').value).toBe('rortega@intelix.biz');
    expect(component.createUserFormGroup.get('comfirmPassword').value).toBe('rortega@intelix.biz');
  });
  it('should create CreateUserComponent', () => {
    expect(component).toBeTruthy();
  });
  it('can instantiate the CreateUserComponent', () => {
    expect(component).not.toBeNull();
  });
});

