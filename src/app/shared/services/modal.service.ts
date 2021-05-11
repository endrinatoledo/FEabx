import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ModalAssignmentComponent} from '../components/modals/modal-assignment/modal-assignment.component';
import {Observable} from 'rxjs';
import {ModalAgreementComponent} from '../components/modals/modal-agreement/modal-agreement.component';
import {ModalDeleteGroupComponent} from '../components/modals/modal-delete-group/modal-delete-group.component'
import {ModalMeetingComponent} from '../components/modals/modal-meeting/modal-meeting.component'
import {ModalParticipantComponent} from '../components/modals/modal-participant/modal-participant.component'

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) {
  }

  public modalMeeting(title: string, data?): Observable<any> {
    let dialogRef: MatDialogRef<ModalMeetingComponent>;
    dialogRef = this.dialog.open(ModalMeetingComponent, {
      disableClose: false,
      width: '850px',
      height: '420px',
      data,
      panelClass: 'custom-dialog-container',
      autoFocus: false
    });
    dialogRef.componentInstance.title = title;
    return dialogRef.afterClosed();
  }

  public modalAssignment(title: string, data?): Observable<any> {
    let dialogRef: MatDialogRef<ModalAssignmentComponent>;
    dialogRef = this.dialog.open(ModalAssignmentComponent, {
      disableClose: false,
      width: '550px',
      height: '640px',
      data,
      panelClass: 'custom-dialog-container',
      autoFocus: false
    });
    dialogRef.componentInstance.title = title;
    return dialogRef.afterClosed();
  }

  public modalAgreement(title: string, data?): Observable<any> {
    let dialogRef: MatDialogRef<ModalAgreementComponent>;
    dialogRef = this.dialog.open(ModalAgreementComponent, {
      disableClose: false,
      width: '550px',
      height: '570px',
      data,
      panelClass: 'custom-dialog-container',
      autoFocus: false
    });
    dialogRef.componentInstance.title = title;
    return dialogRef.afterClosed();
  }

  public modalDeleteGroup(title: string, data?): Observable<any> {
    let dialogRef: MatDialogRef<ModalDeleteGroupComponent>;
    dialogRef = this.dialog.open(ModalDeleteGroupComponent, {
      disableClose: false,
      width: '550px',
      height: '250px',
      data,
      panelClass: 'custom-dialog-container',
      autoFocus: false
    });
    dialogRef.componentInstance.title = title;
    return dialogRef.afterClosed();
  }

  public modalParticipant(title: string, data?): Observable<any> {
    let dialogRef: MatDialogRef<ModalParticipantComponent>;
    dialogRef = this.dialog.open(ModalParticipantComponent, {
      disableClose: false,
      width: '750px',
      height: '375px',
      data,
      panelClass: 'custom-dialog-container',
      autoFocus: false
    });
    dialogRef.componentInstance.title = title;
    return dialogRef.afterClosed();
  }
}
