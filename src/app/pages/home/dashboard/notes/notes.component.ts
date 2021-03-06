import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ModalService} from '../../../../shared/services/modal.service';
import {Assignment} from '../../../../shared/models/assignment';
import {Meeting} from '../../../../shared/models/meeting';
import {Agreement} from '../../../../shared/models/agreement';
import {HttpService} from '../../../../shared/services/http.service';
import {HttpAudithorService} from '../../../../shared/services/http.audithor.service';
import {NotesConstants} from './notes-constants';
import {Group} from '../../../../shared/models/group';
import {User} from '../../../../shared/models/user';
import {History} from '../../../../shared/models/history';
import {DashboardConstants} from '../dashboard-constants';

@Component({
  selector: 'app-home-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() assigmentStatus;
  @Input() groups:Group[];
  @Input() groupId: number;
  @Input() members: User[];
  @Input() rolInGroup: string;
  @Input() sightview: boolean;
  @Output() noteId: EventEmitter<any> = new EventEmitter<any>();
  @Output() activeNoteEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectId: EventEmitter<any> = new EventEmitter<any>();
  @Output() salida: EventEmitter<any> = new EventEmitter<any>();
  @Output() assignmentsList: EventEmitter<any> = new EventEmitter<any>();
  @Output() agreementsList: EventEmitter<any> = new EventEmitter<any>();
  index:number=0;
  title: string;
  rol:String="1,2";
  displayedColumns: string[] = ['title', 'group', 'user', 'date', 'options'];
  dataSource = new MatTableDataSource();
  selectNotesId :number=1;
  private paginator: MatPaginator;
  notes = [
    {id: DashboardConstants.ASSIGNMENT_ID, name: DashboardConstants.ASSIGNMENTS_LOWER_CASE, icon: 'list_alt'},
    {id: DashboardConstants.AGREEMENT_ID, name: DashboardConstants.AGREEMENTS_LOWER_CASE, icon: 'format_list_numbered'}
  ];
  sortOptions = [
    {id: 1, name: NotesConstants.TITLE},
    {id: 2, name: NotesConstants.GROUP},
    {id: 3, name: NotesConstants.RESPOSABLE},
    {id: 4, name: NotesConstants.FINAL_DATE}
  ];

  agreementStatus=[
    {id: 1, status:'Pendiente'},
    {id: 2,status:'Por Aprobar' },
    {id: 3,status:'Aprobado' }
  ];
  sortShape = [
    {id: 1, name: NotesConstants.ASC_SORTING},
    {id: 2, name: NotesConstants.DESC_SORTING},
  ];
  assignments: Assignment[];
  assignmentsAux: Assignment[];
  agreements: Agreement[];
  agreementsAux: Agreement[];
  meetings: Meeting[];
  meetingsAux: Meeting[];
  origins = [];
  sortedArray = [];
  filteredArray = [];

  filterFormGroup: FormGroup = new FormGroup({
    assigmentStatus: new FormControl(null, []),
    agreementStatus: new FormControl(null, []),
    group: new FormControl(null, []),
    member: new FormControl(null, []),
    word: new FormControl(null, [])
  });

  sortingFormGroup: FormGroup = new FormGroup({
    by: new FormControl(null, []),
    shape: new FormControl({value: null, disabled: true}, [])
  });

  showPaginator: boolean;
  pageSize: number;
  currentNoteType: number;
  activeRowId: number;
  emptyAssignments: string;
  emptyAgreements: string;
  isLoadingStatusOptions: boolean;
  statusMenuOptions = [];
  @ViewChild(MatPaginator, {static: true}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
    this.paginator.pageIndex=1;
  }
  updateSelectId(id){
    this.selectId.emit(id)
  }
  sendData(element){
    let  dataToBeIssued = {
      noteId:element.id,
      noteTypeId:this.selectNotesId,
      title:element.title
    }
    this.noteId.emit(dataToBeIssued);
  }
  ngOnChanges(){
    //Este metodo se ejecuta cada vez que se seleccione  un grupo en el componente 'group-container'
    if(this.filteredArray.length<5){
      this.showPaginator=false;
    }
    if(!this.rolInGroup && this.groupId && this.groupId!=0){
      if( this.selectNotesId==1){this.getAssignmentsGroup(this.groupId)}
      else {this.getAgreementGroup(this.groupId);}
    }

    if(this.rolInGroup && this.rolInGroup === 'Leader' ){
          if(this.groupId==0){
            if( this.selectNotesId==1){this.getAssignmentsAsLeader(this.rolInGroup)}
            else {this.getAgreementsByRol(this.httpService.userId,this.rolInGroup);}
          }
          if(this.groupId!=0){
            if( this.selectNotesId==1){this.getAssignmentsGroup(this.groupId)}
            else {this.getAgreementGroup(this.groupId);}
          }
          if(!this.groupId){
            if( this.selectNotesId==1){this.getAssignmentsAsLeader(this.rolInGroup)}
            else {this.getAgreementsByRol(this.httpService.userId,this.rolInGroup);}
          }
    }

    if(this.rolInGroup==='Participant'){
      if(this.groupId && this.groupId!=0) {
        if(this.sightview){
          if( this.selectNotesId==1){this.getAssignmentsGroup(this.groupId)}
          else {this.getAgreementGroup(this.groupId)}
        }else {
          if( this.selectNotesId==1){this.getAssignmentsByGroupAndUser(this.httpService.userId,this.groupId)}
          else {this.getAgreementGroup(this.groupId);}
        }
      }
      if(this.groupId===0 || !this.groupId) {
        if( this.selectNotesId==1){this.getAssignmentsByUser(this.httpService.userId)}
        else {this.getAgreements(this.httpService.userId);}
      }
    }

    if(this.rolInGroup && this.rolInGroup === 'Suplente' ){
      this.getAssignmentsAsLeader(this.rolInGroup)
    }

  }


  constructor(private modalService: ModalService, private httpService: HttpService,private snackBar: MatSnackBar,private httpAudithorService:HttpAudithorService) {
    this.title = DashboardConstants.ASSIGNMENTS_UPPER_CASE;
    this.emptyAssignments = NotesConstants.EMPTY_ASSIGNMENTS;
    this.emptyAgreements = NotesConstants.EMPTY_AGREEMENTS;
    this.currentNoteType = DashboardConstants.ASSIGNMENT_ID;
    this.isLoadingStatusOptions = false;
    // this.getAssignments(httpService.userId);
    this.getAssignmentsByUser(this.httpService.userId)
    this.getOrigins();
  }

  ngOnInit() {
    this.pageSize = 5;
  }

  ngAfterViewInit(): void {
    this.filterByAssigmentStatus();
    this.filterByagreementStatus();
    if(this.groupId!=0) this.filterByGroup();
    this.filterByMember();
    this.filterByWord();
    this.sort()
    this.paginator.nextPage= () => this.NextP();
    this.paginator.previousPage= () => this.previousP();
    this.paginator.firstPage= () => this.firstP();
    this.paginator.lastPage= () => this.lastP();
  }
  Resizepage()
  {
    this.pageSize=this.paginator.pageSize;
    if( this.selectNotesId==1){
      if(this.assignments.length > this.pageSize){
        this.getAssignments(this.httpService.userId);
        this.getAssignmentsGroup(this.groupId);

      }
    }else
    {
      if(this.agreements.length > this.pageSize){
        this.getAgreements(this.httpService.userId);
        this.getAgreementGroup(this.groupId);
    }
    }
  }
  lastP(){
    let list;
    list=(this.selectNotesId==1? this.assignments:this.agreements);
    let size=list.length%this.paginator.pageSize;
    let index=list.length/this.paginator.pageSize;
    if(list.length%this.paginator.pageSize===0) size=this.paginator.pageSize;
    if(list.length%this.paginator.pageSize===0) index--;
    this.dataSource = new MatTableDataSource<Assignment>(list.slice((this.assignments.length - (size) ),list.length));
    this.paginator.pageIndex+= index;
  }
  firstP(){
    let list;
    list=(this.selectNotesId==1? this.assignments:this.agreements);
    this.dataSource = new MatTableDataSource<Assignment>(list.slice(0,this.paginator.pageSize));
    this.paginator.pageIndex=0;
  }
  NextP(){
    this.index+=this.paginator.pageSize;
    if(this.selectNotesId==1){
      this.dataSource = new MatTableDataSource<Assignment>(this.assignments.slice(this.index,this.index+this.paginator.pageSize));
    }else
    {
      this.dataSource = new MatTableDataSource<Agreement>(this.agreements.slice(this.index,this.index+this.paginator.pageSize));
    }

    this.paginator.pageIndex+=1;

    }
  previousP(){
    if(this.index!=0) this.index-=this.paginator.pageSize;
      if(this.selectNotesId==1){
        this.dataSource = new MatTableDataSource<Assignment>(this.assignments.slice(this.index,this.index+this.paginator.pageSize));
      }else{
        this.dataSource = new MatTableDataSource<Agreement>(this.agreements.slice(this.index,this.index+this.paginator.pageSize));
      }
      this.paginator.pageIndex-=1;
}

  ngOnDestroy(): void {}

  emitNoteChangeEvent = () => this.activeNoteEvent.emit({id: this.activeRowId, type: this.currentNoteType});
  emitAssignmentChangeEvent = () => this.assignmentsList.emit(this.assignments);
  emitAgreementChangeEvent = () => this.agreementsList.emit(this.agreements);

  getAssignments(id: number) {
    this.httpService.get(NotesConstants.GET_ASSIGNMENTS_BY_USER_URI(id)).subscribe(res => {
      this.assignments = res.assignments;
      this.assignmentsAux=res.assignments; /* Guardo una lista auxiliar con todas las Asignaciones */
      this.assignments=this.assignments.filter( (a) => a.status < 3 ); /* filtro para obtener las Asignaciones con status pendiente o activo */
      this.activeRowId = this.assignments.length > 0 ? this.assignments[0].id : null;
      this.dataSource = new MatTableDataSource<Assignment>(this.assignments.slice(0,this.pageSize));
      this.sortedArray = Object.assign([], this.assignments);
      this.filteredArray = Object.assign([], this.assignments);
      this.showPaginator = this.dataSource.data.length >= this.pageSize;
      this.paginator.length=this.assignments.length;
      this.paginator.pageIndex=0;
      this.emitNoteChangeEvent();
      this.emitAssignmentChangeEvent()
    });
  }

  getMeetings(id: number) {
    this.httpService.get(NotesConstants.GET_MEETINGS_BY_USER_URI(id)).subscribe(res => {
      this.meetings = res.meetings;
      this.meetingsAux=res.meetings; /* Guardo una lista auxiliar con todas las Asignaciones */
      this.activeRowId = this.assignments.length > 0 ? this.assignments[0].id : null;
      this.dataSource = new MatTableDataSource<Assignment>(this.assignments.slice(0,this.pageSize));
      this.sortedArray = Object.assign([], this.assignments);
      this.filteredArray = Object.assign([], this.assignments);
      this.showPaginator = this.dataSource.data.length >= this.pageSize;
      this.paginator.length=this.assignments.length;
      this.paginator.pageIndex=0;
      this.emitNoteChangeEvent();
    });
  }


  getAgreements(id: number) {
    this.httpService.get(NotesConstants.GET_AGREEMENTS_BY_USER_URI(id)).subscribe(res => {
      this.agreements = res.agreements;
      this.agreementsAux = res.agreements;
      this.agreements=this.agreements.filter( (a) => a.status < 2 );
      this.activeRowId = this.agreements.length > 0 ? this.agreements[0].id : null;
      this.dataSource = new MatTableDataSource<Agreement>(this.agreements.slice(0,this.pageSize));
      this.sortedArray = Object.assign([], this.agreements);
      this.filteredArray = Object.assign([], this.agreements);
      this.showPaginator = this.dataSource.data.length >= this.pageSize;
      this.paginator.length=this.agreements.length;
      this.paginator.pageIndex=0;
      this.emitNoteChangeEvent();
      this.emitAgreementChangeEvent();
    });
  }

  getAssignmentsAsLeader(rol){
    this.httpService.get(NotesConstants.GET_ASSIGNMENTS_BY_ROL(this.httpService.userId,rol)).subscribe(res => {
      this.assignments = res.assignments;
      this.assignmentsAux=res.assignments; /* Guardo una lista auxiliar con todas las Asignaciones */
      this.assignments=this.assignments.filter( (a) => a.status < 3 || a.status ===4 ); /* filtro para obtener las Asignaciones con status pendiente o activo */
      this.activeRowId = this.assignments.length > 0 ? this.assignments[0].id : null;
      this.dataSource = new MatTableDataSource<Assignment>(this.assignments.slice(0,this.pageSize));
      this.sortedArray = Object.assign([], this.assignments);
      this.filteredArray = Object.assign([], this.assignments);
      this.showPaginator = this.dataSource.data.length >= this.pageSize;
      this.paginator.length=this.assignments.length;
      this.paginator.pageIndex=0;
      this.emitNoteChangeEvent();
      this.emitAssignmentChangeEvent()
    });
  }

  //Obtiene la lista de asignaciones por grupo seleccionado
  getAssignmentsGroup(idGroup: number) {
    if(idGroup!=undefined)
    {
     this.httpService.get(NotesConstants.GET_ASSIGNMENTS_BY_GROUP_URI(idGroup)).subscribe(res=>{
       this.assignments=res['assignments'];
       this.assignmentsAux=res['assignments'];//Esto hace que el fitrado funcione
       this.assignments=this.assignments.filter( (a) => a.status < 3 ); /* filtro para obtener las Asignaciones con status pendiente o activo */
       this.activeRowId = this.assignments.length > 0 ? this.assignments[0].id : null;
       this.dataSource = new MatTableDataSource<Assignment>(this.assignments.slice(0,this.pageSize));
       this.sortedArray = Object.assign([], this.assignments);
       this.filteredArray = Object.assign([], this.assignments);
       this.showPaginator = this.dataSource.data.length >= this.pageSize;
       this.paginator.length=this.assignments.length;
       this.paginator.pageIndex=0;
       this.index=0;
       this.filterByAssigmentStatus()
       this.emitNoteChangeEvent();
       this.emitAssignmentChangeEvent()
     })
    }
  }
  getAgreementGroup(idGroup: number) {
    if(idGroup!=undefined)
    {
     this.httpService.get(NotesConstants.GET_AGREEMENT_BY_GROUP_URI(idGroup)).subscribe(res=>{
      this.agreements = res['agreements'];
       this.agreements=this.agreements.filter( (a) => a.status < 2 );
      this.activeRowId = this.agreements.length > 0 ? this.agreements[0].id : null;
      this.dataSource = new MatTableDataSource<Agreement>(this.agreements.slice(0,this.pageSize));
      this.sortedArray = Object.assign([], this.agreements);
      this.filteredArray = Object.assign([], this.agreements);
      this.showPaginator = this.dataSource.data.length >= this.pageSize;
      this.paginator.length=this.agreements.length;
      this.paginator.pageIndex=0;
      this.index=0;
      this.emitNoteChangeEvent();
       this.emitAgreementChangeEvent()
     })
    }
  }
  getOrigins() {
    this.httpService.get(NotesConstants.GET_ORIGINS_URI()).subscribe(res => {
      this.origins = res.origin;
    });
  }

  getNotifications(row) {
    this.activeRowId = row.id;
    this.emitNoteChangeEvent();
  }

  onNoteTypeChange(id: number) {
    this.sortingFormGroup.reset();
    this.filterFormGroup.reset();
    this.currentNoteType = id;
    switch (id) {
      case 1:
        this.selectNotesId=1;
        this.title = DashboardConstants.ASSIGNMENTS_UPPER_CASE;
        if(!this.rolInGroup && !this.groupId) this.getAssignments(this.httpService.userId);
        if(this.rolInGroup==='Leader'){
          if(this.groupId && this.groupId!=0) this.getAssignmentsGroup(this.groupId);
          if(this.groupId===0 || !this.groupId) this.getAssignmentsAsLeader(this.rolInGroup)
        }
        if(this.rolInGroup==='Participant'){
          if(this.groupId && this.groupId!=0) {
            if(this.sightview) this.getAssignmentsGroup(this.groupId)
            else this.getAssignmentsByGroupAndUser(this.httpService.userId,this.groupId);
          }

          if(this.groupId===0 || !this.groupId) this.getAssignmentsByUser(this.httpService.userId)
        }
        break;
      case 2:
        this.selectNotesId=2;
        this.title = DashboardConstants.AGREEMENTS_UPPER_CASE;
        if(!this.rolInGroup && !this.groupId) this.getAgreements(this.httpService.userId);
        if(this.rolInGroup==='Leader'){
          if(this.groupId && this.groupId!=0) this.getAgreementGroup(this.groupId);
          if(this.groupId===0 || !this.groupId) this.getAgreementsByRol(this.httpService.userId,this.rolInGroup)
        }
        if(this.rolInGroup==='Participant'){
          if(this.groupId && this.groupId!=0) this.getAgreementGroup(this.groupId);
          if(this.groupId===0 || !this.groupId) this.getAgreements(this.httpService.userId);
        }
        break;
    }
    this.filterFormGroup.get('group').setValue(this.groupId);
  }
  getRol(idUser,IdGroup){
    return this.httpService.get(NotesConstants.GET_ROL_BY_USER(idUser,IdGroup));
  }

  onCheckNextStatus(id: number, menuTrigger,element) {
    this.isLoadingStatusOptions = true;
    menuTrigger.closeMenu();
    if(element.status!=3)
    {
      const URI = this.currentNoteType === DashboardConstants.ASSIGNMENT_ID ?
      NotesConstants.GET_NEXT_STATUS_BY_ASSIGNMENT_URI(id) :
      NotesConstants.GET_NEXT_STATUS_BY_AGREEMENT_URI(id);
        this.httpService.get(URI).subscribe(res => {
        this.statusMenuOptions = res.variableValue;
        this.getRol(this.httpService.userId,element.grpId).subscribe(res=>{
          this.rol=res.rol.rolId;
          const editOption={cod:'',description:'Editar',id:0,value:0,}
          this.statusMenuOptions=this.statusMenuOptions.filter( (s)=> (s.id) != (element.status+1) );
           //Se agrega la opcion de editar
          if(this.selectNotesId != 2 && (this.rol=== "1,2" || element.usrId === this.httpService.userId) && element.status === 2) this.statusMenuOptions.push(editOption);
          if(this.rol!=="1,2") {
            this.statusMenuOptions=this.statusMenuOptions.filter( (s)=> (s.description) != "Cerrar" )
          }
          if(element.status === 2)
            {this.statusMenuOptions=this.statusMenuOptions.filter( (s)=> (s.description) != "Cerrar" )}
          if(this.httpService.userId !== element.usrId) {
            if(this.rol !== "1,2"){
              this.statusMenuOptions=this.statusMenuOptions.filter( (s)=> (s.description) != "Precerrar" )
            }else {
              if(element.status !== 2) {
                this.statusMenuOptions=this.statusMenuOptions.filter( (s)=> (s.description) != "Precerrar" )
              }
            }
          }
          if(this.sightview && this.rolInGroup==='Participant'){
            if(this.rol!='1,2'&& element.usrId !== this.httpService.userId){
              this.statusMenuOptions =[];
            }
          }
          if (this.statusMenuOptions.length > 0) {
            menuTrigger.openMenu();
          }
          this.isLoadingStatusOptions = false;
        })
    });
    }else
    {
      this.statusMenuOptions =[];
    }
  }

  openCreateModal() {
    this.httpService.selectAssig=undefined;
    if (this.currentNoteType === DashboardConstants.ASSIGNMENT_ID) {
      this.modalService.modalAssignment(NotesConstants.CREATE_ASSIGNMENT, {groupId: this.groupId,groups: this.groups}).subscribe(modal => {
        if (modal.assignment) {
          this.createAssignment(modal.assignment);
        }
      });
    } else if (this.currentNoteType === DashboardConstants.AGREEMENT_ID) {
      this.modalService.modalAgreement(NotesConstants.CREATE_AGREEMENT, {
        groups: this.groups,
        origins: this.origins,
        groupId: this.groupId
      }).subscribe(modal => {
        if (modal.agreement) {
          this.createAgreement(modal.agreement);
        }
      });
    }
  }

  createAssignment(assignment: Assignment) {
    this.httpService.post(
      NotesConstants.CREATE_ASSIGNMENT_URI(this.httpService.userId),assignment).subscribe(res => {
          const history:History = {
            his_user:this.httpService.userId,
            his_products: 'ABX',
            his_field: '',
            his_action:'creando',
            his_date: new Date(),
            his_entity: 'assignment',
            his_identity: res.assignments.id,
          }
        this.httpAudithorService.post(NotesConstants.GET_HISTORY(),history).subscribe(res2=>{
        })
        if(this.rolInGroup==='Leader') this.getAssignmentsAsLeader(this.rolInGroup)
        if(this.rolInGroup==='Participant') this.getAssignmentsGroup(this.groupId)
        if(!this.rolInGroup) this.getAssignmentsGroup(this.groupId);
    });
  }

  createMeeting(meeting: Meeting) {
    this.httpService.post(
      NotesConstants.CREATE_MEETING_URI(this.httpService.userId),meeting).subscribe(res => {
          const history:History = {
            his_user:this.httpService.userId,
            his_products: 'ABX',
            his_field: '',
            his_action:'creando',
            his_date: new Date(),
            his_entity: 'ameeting',
            his_identity: res.meeting.id,
          }
        this.httpAudithorService.post(NotesConstants.GET_HISTORY(),history).subscribe(res2=>{
        })
        this.getMeetings(this.httpService.userId);

    });
  }

  createAgreement(agreement: Agreement) {
    this.httpService.post(
      NotesConstants.CREATE_AGREEMENT_URI(this.httpService.userId), agreement).subscribe(res =>  {
          const history:History = {
            his_user:this.httpService.userId,
            his_products: 'ABX',
            his_field: '',
            his_action:'creando',
            his_date: new Date(),
            his_entity: 'agreement',
            his_identity: res.agreements.id,
          }
          this.httpAudithorService.post(NotesConstants.GET_HISTORY(),history).subscribe(res2=>{
          })
           this.getAgreements(this.httpService.userId);
    });
  }

  onClickRemoveFilter() {
    this.filterFormGroup.reset();
    this.sortingFormGroup.reset();
    this.dataSource.data = this.currentNoteType === DashboardConstants.ASSIGNMENT_ID ?
      Object.assign([], this.assignments) : Object.assign([], this.agreements);
    this.sortedArray = this.currentNoteType === DashboardConstants.AGREEMENT_ID ?
      Object.assign([], this.assignments) : Object.assign([], this.agreements);
  }

  onClickRemoveSort() {
    this.sortingFormGroup.reset();
    this.dataSource.data = Object.assign([], this.filteredArray);
    this.sortedArray = Object.assign([], this.filteredArray);
    this.sortingFormGroup.get('shape').disable();
  }

  onOptionSortChange() {
    this.sortingFormGroup.get('shape').enable();
    this.sortingFormGroup.get('shape').reset();
  }

  sort() {
    switch (this.sortingFormGroup.get('by').value) {
      case 1:
        if (this.sortingFormGroup.get('shape').value === 1) {
          this.sortedArray.sort((a, b): number => {
            if (a.title > b.title) {
              return 1;
            } else if (a.title < b.title) {
              return -1;
            }
            return 0;
          });
        } else {
          this.sortedArray.sort((a, b): number => {
            if (a.title > b.title) {
              return -1;
            } else if (a.title < b.title) {
              return 1;
            }
            return 0;
          });
        }
        break;
      case 2:
        if (this.sortingFormGroup.get('shape').value === 1) {
          this.sortedArray.sort((a, b): number => {
            if (a.group.name > b.group.name) {
              return 1;
            } else if (a.group.name < b.group.name) {
              return -1;
            }
            return 0;
          });
        } else {
          this.sortedArray.sort((a, b): number => {
            if (a.group.name > b.group.name) {
              return -1;
            } else if (a.group.name < b.group.name) {
              return 1;
            }
            return 0;
          });
        }
        break;
      case 3:
        if (this.sortingFormGroup.get('shape').value === 1) {
          this.sortedArray.sort((a, b): number => {
            if (a.user.firstName > b.user.firstName) {
              return 1;
            } else if (a.user.firstName < b.user.firstName) {
              return -1;
            }
            return 0;
          });
        } else {
          this.sortedArray.sort((a, b): number => {
            if (a.user.firstName > b.user.firstName) {
              return -1;
            } else if (a.user.firstName < b.user.firstName) {
              return 1;
            }
            return 0;
          });
        }
        break;
      case 4:
        if (this.sortingFormGroup.get('shape').value === 1) {
          this.sortedArray.sort((a, b): number => {
            if (a.finfinalDate > b.finalDate) {
              return 1;
            } else if (a.finalDate < b.finalDate) {
              return -1;
            }
            return 0;
          });
        } else {
          this.sortedArray.sort((a, b): number => {
            if (a.finalDate > b.finalDate) {
              return -1;
            } else if (a.finalDate < b.finalDate) {
              return 1;
            }
            return 0;
          });
        }
        break;
    }
    if(this.selectNotesId==1)
    {
      this.assignments=this.sortedArray;
    }else
    {
      this.agreements=this.sortedArray;
    }
    this.dataSource.data = Object.assign([], this.sortedArray.slice(0,this.pageSize));
  }
filterByagreementStatus() {

  this.filterFormGroup.get('agreementStatus').valueChanges.subscribe(value => {
    if(this.agreementsAux)
    {
      this.filteredArray=[];
      this.filteredArray =  this.agreements;
      this.filteredArray=this.filteredArray.filter( (a) => a.status===this.filterFormGroup.get('agreementStatus').value );
      this.sortedArray = Object.assign([], this.filteredArray);
      this.assignments=this.filteredArray;
      this.paginator.length=this.filteredArray.length;
      this.dataSource.data = Object.assign([], this.filteredArray.slice(0,this.pageSize));
      this.showPaginator = this.dataSource.data.length >= this.pageSize;
    }
  });
  }

  filterByAssigmentStatus() {
    this.filterFormGroup.get('assigmentStatus').valueChanges.subscribe(value => {
      this.filteredArray = this.currentNoteType === DashboardConstants.ASSIGNMENT_ID ?
        Object.assign([], this.assignmentsAux) : Object.assign([], this.agreementsAux);

      if (this.filterFormGroup.get('group').value) {
        this.filteredArray = this.filterByOption(this.filteredArray, 2);
      }

      if (this.filterFormGroup.get('member').value) {
        this.filteredArray = this.filterByOption(this.filteredArray, 3);
      }

      if (this.filterFormGroup.get('word').value) {
        this.filteredArray = this.filterByOption(this.filteredArray, 4);
      }

      this.filteredArray = this.filterByOption(this.filteredArray, 1);
      this.sortedArray = Object.assign([], this.filteredArray);
      this.assignments=this.filteredArray;
      this.paginator.length=this.filteredArray.length;
      this.dataSource.data = Object.assign([], this.filteredArray.slice(0,this.pageSize));
      this.showPaginator = this.dataSource.data.length >= this.pageSize;

    });
  }

  filterByGroup() {
    this.filterFormGroup.get('group').valueChanges.subscribe(value => {
     if(this.groupId){
      this.filteredArray = this.currentNoteType === DashboardConstants.ASSIGNMENT_ID ?
      Object.assign([], this.assignmentsAux) : Object.assign([], this.agreementsAux);
      if (this.filterFormGroup.get('assigmentStatus').value) {
        this.filteredArray = this.filterByOption(this.filteredArray, 1);
      }

      if (this.filterFormGroup.get('member').value) {
        this.filteredArray = this.filterByOption(this.filteredArray, 3);
      }

      if (this.filterFormGroup.get('word').value) {
        this.filteredArray = this.filterByOption(this.filteredArray, 4);
      }

      this.filteredArray = this.filterByOption(this.filteredArray, 2);
      this.sortedArray = Object.assign([], this.filteredArray);
      if(this.selectNotesId==1)this.assignments=this.filteredArray;
      if(this.selectNotesId==2)this.agreements=this.filteredArray;
      this.paginator.length=this.filteredArray.length;
      this.dataSource.data = Object.assign([], this.filteredArray.slice(0,this.pageSize));
     }
    });
  }

  filterByMember() {
    this.filterFormGroup.get('member').valueChanges.subscribe(value => {
      this.filteredArray = this.currentNoteType === DashboardConstants.ASSIGNMENT_ID ?
        Object.assign([], this.assignmentsAux) : Object.assign([], this.agreementsAux);

      if (this.filterFormGroup.get('assigmentStatus').value) {
        this.filteredArray = this.filterByOption(this.filteredArray, 1);
      }

      if (this.filterFormGroup.get('group').value) {
        this.filteredArray = this.filterByOption(this.filteredArray, 2);
      }

      if (this.filterFormGroup.get('word').value) {
        this.filteredArray = this.filterByOption(this.filteredArray, 4);
      }

      this.filteredArray = this.filterByOption(this.filteredArray, 3);
      this.sortedArray = Object.assign([], this.filteredArray);
      if(this.selectNotesId==1)this.assignments=this.filteredArray;
      if(this.selectNotesId==2)this.agreements=this.filteredArray;
      this.paginator.length=this.filteredArray.length;
      this.dataSource.data = Object.assign([], this.filteredArray.slice(0,this.pageSize));
    });
  }

  filterByWord() {
    this.filterFormGroup.get('word').valueChanges.subscribe(value => {
      this.filteredArray = this.currentNoteType === DashboardConstants.ASSIGNMENT_ID ?
        Object.assign([], this.assignments) : Object.assign([], this.agreements);

      if (this.filterFormGroup.get('assigmentStatus').value) {
        this.filteredArray = this.filterByOption(this.filteredArray, 1);
      }

      if (this.filterFormGroup.get('group').value) {
        this.filteredArray = this.filterByOption(this.filteredArray, 2);
      }

      if (this.filterFormGroup.get('member').value) {
        this.filteredArray = this.filterByOption(this.filteredArray, 3);
      }

      this.filteredArray = this.filterByOption(this.filteredArray, 4);
      this.sortedArray = Object.assign([], this.filteredArray);
      if(this.selectNotesId==1)this.assignments=this.filteredArray;
      if(this.selectNotesId==2)this.agreements=this.filteredArray;
      this.paginator.length=this.filteredArray.length;
      this.dataSource.data = Object.assign([], this.filteredArray.slice(0,this.pageSize));
    });
  }

  exitOption(){

    return(this.filterFormGroup.get('assigmentStatus').value !=null ||  this.filterFormGroup.get('group').value != null  ||  this.filterFormGroup.get('member').value!=null  ||  this.filterFormGroup.get('word').value!=null )
  }
  filterByOption(array: Assignment[], by: number): Assignment[] {
    this.filteredArray = [];
   if(this.exitOption()){
      switch (by) {
        case 1:
          this.filteredArray = array.filter((element) => {

            return (element.status === this.filterFormGroup.get('assigmentStatus').value);
          });
          break;
        case 2:
          this.filteredArray = array.filter((element) => {
            return (element.grpId === this.filterFormGroup.get('group').value);
          });
          break;
        case 3:
          this.filteredArray = array.filter((element) => {
            return (element.usrId === this.filterFormGroup.get('member').value);
          });
          break;
        case 4:
          if (this.filterFormGroup.get('word').value) {
            const auxGroupFilterArray = array.filter((element) => {
              return (element.group.name.toLowerCase().includes(this.filterFormGroup.get('word').value.toLowerCase()));
            });
            const auxFirstNameFilterArray = array.filter((element) => {
              return (element.user.firstName.toLowerCase().includes(this.filterFormGroup.get('word').value.toLowerCase()));
            });
            const auxLastNameFilterArray = array.filter((element) => {
              return (element.user.lastName.toLowerCase().includes(this.filterFormGroup.get('word').value.toLowerCase()));
            });
            const auxArray = auxGroupFilterArray.concat(auxFirstNameFilterArray.concat(auxLastNameFilterArray));
            this.filteredArray = auxArray.filter((element, index, arr) => {
              return (index === arr.indexOf(element));
            });
          } else {
            this.filteredArray = Object.assign([], array);
          }
          break;
      }
    }
    return this.filteredArray;
  }

//Se verifica que opcion selecciona el usuario
  nextStatus(element, option)
  {
    if(option === "Precerrar") {this.preClose(element);}
    if(option === "Editar")
      {
        this.modalService.modalAssignment(NotesConstants.CREATE_ASSIGNMENT, {meeting: element.meeId,groups: this.groups, groupId: element.grpId}).subscribe(modal => {
          if (modal.assignment) {
            modal.assignment.id=this.httpService.selectAssig.id;
            this.httpService.put(NotesConstants.CREATE_ASSIGNMENT_URI(this.httpService.userId),modal.assignment).subscribe(res=>{
                this.getAssignments(this.httpService.userId);
                const history:History = {
                  his_user:this.httpService.userId,
                  his_products: 'ABX',
                  his_field: '',
                  his_action:'agregado una actualizacion',
                  his_date: new Date(),
                  his_entity: 'assignment',
                  his_identity: this.httpService.selectAssig.id,
                }
               this.httpAudithorService.post(NotesConstants.GET_HISTORY(),history).subscribe(res2=>{
                this.sendData(res.assignments);
               })
            })
          }
        });
      }
      if(option === 'Cerrar') {this.closeAssignments(element);}
    if(option === 'Aprobar' || option === 'No Aprobar'){
      this.approveAgreement(element,option);
    }
  }

  //Cambio status de un acuerdo
  approveAgreement(element,option){
    element.status= option==='Aprobar' ? 2 : 3; //Se cambia el atributo status a Precerrar
    this.httpService.put(NotesConstants.GET_STATUS_BY_AGREEMENT_URI(this.httpService.userId),element).subscribe(res=>{
      let message = option === 'Aprobar'
        ? `Se ha Aprobado el acuerdo ${res['agremeents'].title}`
        : `No se ha Aprobado el acuerdo ${res['agremeents'].title}`
      this.snackBar.open(message, null, {duration: 4000});
      this.getAgreements(this.httpService.userId);
    })
  }

// Cambia el status de una nota a Precerar
  preClose(element)
  {
    element.status=4; //Se cambia el atributo status a Precerrar
    this.httpService.put(NotesConstants.GET_STATUS_BY_ASSIGNMENT_URI(this.httpService.userId),element).subscribe(res=>{
      this.snackBar.open(`Se ha Preccerado la asignaci??n ${res['assignments'].title}`, null, {duration: 4000});
      this.getAssignments(this.httpService.userId);// Se actualiza la lista de las Asignaciones
    })
  }

  getSelectAssig(assignment:Assignment){ this.httpService.selectAssig=assignment;}

  closeAssignments(assignment:Assignment)
  {
    assignment.status=3; //Se cambia el atributo status a cerrar
    this.httpService.put(NotesConstants.GET_STATUS_BY_ASSIGNMENT_URI(this.httpService.userId),assignment).subscribe(res=>{
      this.snackBar.open(`Se ha cerrado la asignaci??n ${res['assignments'].title}`, null, {duration: 4000});
      this.getAssignments(this.httpService.userId);// Se actualiza la lista de las Asignaciones
    })
  }

  getAssignmentsByGroupAndUser(idUser: number,idGroup:number) {
      this.httpService.get(NotesConstants.GET_ASSIGNMENTS_BY_GROUP_URI(idGroup)).subscribe(res=>{
        this.assignments=res['assignments'];
        this.assignmentsAux=res['assignments'];//Esto hace que el fitrado funcione
        this.assignments=this.assignments.filter( (a) => a.status < 3 && a.usrId === idUser ); /* filtro para obtener las Asignaciones con status pendiente o activo */
        this.activeRowId = this.assignments.length > 0 ? this.assignments[0].id : null;
        this.dataSource = new MatTableDataSource<Assignment>(this.assignments.slice(0,this.pageSize));
        this.sortedArray = Object.assign([], this.assignments);
        this.filteredArray = Object.assign([], this.assignments);
        this.showPaginator = this.dataSource.data.length >= this.pageSize;
        this.paginator.length=this.assignments.length;
        this.paginator.pageIndex=0;
        this.index=0;
        this.filterByAssigmentStatus()
        this.emitNoteChangeEvent();
        this.emitAssignmentChangeEvent()
      })
  }

  getAssignmentsByUser(idUser: number) {
    this.httpService.get(NotesConstants.GET_ASSIGNMENTS_BY_USER(idUser)).subscribe(res=>{
      this.assignments=res['assignments'];
      this.assignmentsAux=res['assignments'];//Esto hace que el fitrado funcione
      this.assignments=this.assignments.filter( (a) => a.status < 3 && a.usrId === idUser ); /* filtro para obtener las Asignaciones con status pendiente o activo */
      this.activeRowId = this.assignments.length > 0 ? this.assignments[0].id : null;
      this.dataSource = new MatTableDataSource<Assignment>(this.assignments.slice(0,this.pageSize));
      this.sortedArray = Object.assign([], this.assignments);
      this.filteredArray = Object.assign([], this.assignments);
      this.showPaginator = this.dataSource.data.length >= this.pageSize;
      this.paginator.length=this.assignments.length;
      this.paginator.pageIndex=0;
      this.index=0;
      this.filterByAssigmentStatus()
      this.emitNoteChangeEvent();
      this.emitAssignmentChangeEvent()
    })
  }


  getAgreementsByRol(idUser: number,rolIngroup:string) {
    this.httpService.get(NotesConstants.GET_AGREEMENTS_BY_USER_ROL(idUser,rolIngroup)).subscribe(res=>{
      this.agreements = res.agreements;
      this.agreementsAux = res.agreements;
      this.agreements=this.agreements.filter( (a) => a.status < 2 );
      this.activeRowId = this.agreements.length > 0 ? this.agreements[0].id : null;
      this.dataSource = new MatTableDataSource<Agreement>(this.agreements.slice(0,this.pageSize));
      this.sortedArray = Object.assign([], this.agreements);
      this.filteredArray = Object.assign([], this.agreements);
      this.showPaginator = this.dataSource.data.length >= this.pageSize;
      this.paginator.length=this.agreements.length;
      this.paginator.pageIndex=0;
      this.emitNoteChangeEvent();
      this.emitAgreementChangeEvent()
    })
  }

}
