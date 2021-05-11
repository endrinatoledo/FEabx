import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es';
import {ModalAssignmentComponent} from './shared/components/modals/modal-assignment/modal-assignment.component';
import {ModalAgreementComponent} from './shared/components/modals/modal-agreement/modal-agreement.component';
import {ModalDeleteGroupComponent} from './shared/components/modals/modal-delete-group/modal-delete-group.component'
import {ReactiveFormsModule} from '@angular/forms';
// import {AvatarModule} from 'ngx-avatar';
import {ModalMeetingComponent} from './shared/components/modals/modal-meeting/modal-meeting.component';
import {HttpRequestsResponseInterceptor} from './core/utils/http-requests-response.interceptor';
import {ModalParticipantComponent} from './shared/components/modals/modal-participant/modal-participant.component';
import { MatButtonModule } from '@angular/material';
registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ModalAssignmentComponent,
    ModalAgreementComponent,
    ModalDeleteGroupComponent,
    ModalParticipantComponent
  ],
  entryComponents: [
    ModalAssignmentComponent,
    ModalAgreementComponent,
    ModalDeleteGroupComponent,
    ModalMeetingComponent,
    ModalParticipantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    // ReactiveFormsModule,
    // AvatarModule

  ],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: HttpRequestsResponseInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
