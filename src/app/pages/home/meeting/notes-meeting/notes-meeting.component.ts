import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ModalService} from '../../../../shared/services/modal.service';
import {Assignment} from '../../../../shared/models/assignment';
import {Agreement} from '../../../../shared/models/agreement';
import {HttpService} from '../../../../shared/services/http.service';
import {HttpAudithorService} from '../../../../shared/services/http.audithor.service';
import {NotesMeetingConstants} from './notes-meeting-constants';
import {Group} from '../../../../shared/models/group';
import {User} from '../../../../shared/models/user';
import {History} from '../../../../shared/models/history';
import {DashboardConstants} from '../../dashboard/dashboard-constants';
import {CdkDragDrop, CdkDragStart, moveItemInArray} from '@angular/cdk/drag-drop';
import {Meeting} from "../../../../shared/models/meeting";

@Component({
  selector: 'app-notes-meeting',
  templateUrl: './notes-meeting.component.html',
  styleUrls: ['./notes-meeting.component.scss']
})
export class NotesMeetingComponent implements OnInit, OnChanges {
  @Input() assigmentStatus;
  @Input() groups:Group[];
  @Input() groupId: number;
  @Input() members: User[];
  @Input() meeting: Meeting;
  @Output() noteId: EventEmitter<any> = new EventEmitter<any>();
  @Output() activeNoteEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectId: EventEmitter<any> = new EventEmitter<any>();
  @Output() salida: EventEmitter<any> = new EventEmitter<any>();
  @Input() dataEntry: boolean;
  index:number=0;
  title: string;
  rol:String="1,2";
  displayedColumns: string[] = ['title', 'group','type', 'user', 'date', 'options'];
  dataSource = new MatTableDataSource();
  selectNotesId :number=1;
  private paginator: MatPaginator;
  notes = [
    {id: DashboardConstants.ASSIGNMENT_ID, name: DashboardConstants.ASSIGNMENTS_LOWER_CASE, icon: 'list_alt'},
    {id: DashboardConstants.AGREEMENT_ID, name: DashboardConstants.AGREEMENTS_LOWER_CASE, icon: 'format_list_numbered'}
  ];
  sortOptions = [
    {id: 1, name: NotesMeetingConstants.TITLE},
    {id: 2, name: NotesMeetingConstants.GROUP},
    {id: 3, name: NotesMeetingConstants.RESPOSABLE},
    {id: 4, name: NotesMeetingConstants.FINAL_DATE}
  ];

  agreementStatus=[
    {id: 1, status:'Pendiente'},
    {id: 2,status:'Por Aprobar' },
    {id: 3,status:'Aprobado' }
  ];
  sortShape = [
    {id: 1, name: NotesMeetingConstants.ASC_SORTING},
    {id: 2, name: NotesMeetingConstants.DESC_SORTING},
  ];
  assignments: any[]=[];
  assignmentsAux: any[];
  agreements: Agreement[];
  agreementsAux: Agreement[];
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

  // @ViewChild(MatPaginator, {static: true}) set matPaginator(mp: MatPaginator) {
  //   this.paginator = mp;
  //   this.dataSource.paginator = this.paginator;
  //   this.paginator.pageIndex=1;
  // }
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
  ngOnChanges() {
    if (this.dataEntry === true) {
      this.getAssignments(this.httpService.selectMeeting.grpId, this.httpService.selectMeeting.id, this.httpService.userId);
    }
  }


  constructor(private modalService: ModalService, private httpService: HttpService,private snackBar: MatSnackBar,private httpAudithorService:HttpAudithorService) {
    this.title = NotesMeetingConstants.ASSIGNMENTS_UPPER_CASE;
    this.emptyAssignments = NotesMeetingConstants.EMPTY_ASSIGNMENTS;
    this.emptyAgreements = NotesMeetingConstants.EMPTY_AGREEMENTS;
    this.currentNoteType = DashboardConstants.ASSIGNMENT_ID;
    this.isLoadingStatusOptions = false;
    this.getAssignments(httpService.selectMeeting.grpId, httpService.selectMeeting.id, httpService.userId);
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
    // this.paginator.nextPage= () => this.NextP();
    // this.paginator.previousPage= () => this.previousP();
    // this.paginator.firstPage= () => this.firstP();
    // this.paginator.lastPage= () => this.lastP();
  }
  Resizepage()
  {
    this.pageSize=this.paginator.pageSize;
    if( this.selectNotesId==1){
      if(this.assignments.length > this.pageSize){
        this.getAssignments(this.httpService.selectMeeting.grpId, this.httpService.selectMeeting.id, this.httpService.userId);

      }
    }else
    {
      if(this.agreements.length > this.pageSize){

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

  getAddAssignments(Assignment:Assignment){
    this.assignments.push(Assignment)
  }
  getAssignments(groupId: number, meeId: number, userId: number) {
    this.httpService.get(NotesMeetingConstants.GET_ONE_MEETING_ORDERED(groupId, meeId, userId)).subscribe(res => {
      this.assignments = res.ordered;
      this.assignmentsAux = res.ordered; /* Guardo una lista auxiliar con todas las Asignaciones */
      // this.activeRowId = this.assignments.length > 0 ? this.assignments[0].id : null;
      this.dataSource = new MatTableDataSource<any>(this.assignments);
      this.sortedArray = Object.assign([], this.assignments);
      this.filteredArray = Object.assign([], this.assignments);
      // this.showPaginator = this.dataSource.data.length >= this.pageSize;
      // this.paginator.length=this.assignments.length;
      // this.paginator.pageIndex=0;
      this.emitNoteChangeEvent();
    });
  }

  getOrigins() {
    this.httpService.get(NotesMeetingConstants.GET_ORIGINS_URI()).subscribe(res => {
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
        this.getAssignments(this.httpService.selectMeeting.grpId, this.httpService.selectMeeting.id, this.httpService.userId);
        break;
      case 2:
        this.selectNotesId=2;
        this.title = DashboardConstants.AGREEMENTS_UPPER_CASE;
        break;
    }
    this.filterFormGroup.get('group').setValue(this.groupId);
  }
  getRol(idUser,IdGroup){
    return this.httpService.get(NotesMeetingConstants.GET_ROL_BY_USER(idUser,IdGroup));
  }

  onCheckNextStatus(id: number, menuTrigger,element) {
    this.isLoadingStatusOptions = true;
    menuTrigger.closeMenu();

    if(element.status!=3)
    {
      const editOption={cod:'',description:'Editar',id:0,value:0,}
      const deleteOption={cod:'',description:'Eliminar',id:0,value:0,}
      if(this.statusMenuOptions.length < 1){
        this.statusMenuOptions.push(editOption);
        this.statusMenuOptions.push(deleteOption);
      }

      if (this.statusMenuOptions.length > 0) {
        menuTrigger.openMenu();
      }
      this.isLoadingStatusOptions = false;
    }else
    {
      this.statusMenuOptions =[];
    }
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
    this.dataSource.data = Object.assign([], this.sortedArray);
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
      this.dataSource.data = Object.assign([], this.filteredArray);
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
      this.dataSource.data = Object.assign([], this.filteredArray);
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
      this.dataSource.data = Object.assign([], this.filteredArray);
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
      this.dataSource.data = Object.assign([], this.filteredArray);
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
      this.dataSource.data = Object.assign([], this.filteredArray);
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
    if(option === "Precerrar")
    {
      this.preClose(element);
    }else
    {
      if(option === "Editar")
      {

      }else
      {
       // this.closeAssignments(element);
      }
    }
  }

// Cambia el status de una nota a Precerar
  preClose(element)
  {
    element.status=4; //Se cambia el atributo status a Precerrar
    this.httpService.put(NotesMeetingConstants.GET_STATUS_BY_ASSIGNMENT_URI(this.httpService.userId),element).subscribe(res=>{
      this.snackBar.open(`Se ha Preccerado la asignación ${res['assignments'].title}`, null, {duration: 4000});
      this.getAssignments(this.httpService.selectMeeting.grpId, this.httpService.selectMeeting.id, this.httpService.userId);// Se actualiza la lista de las Asignaciones
    })
  }

  getSelectAssig(assignment:Assignment){ this.httpService.selectAssig=assignment;}

  closeAssignments(assignment:Assignment)
  {
    assignment.status=3; //Se cambia el atributo status a cerrar
    this.httpService.put(NotesMeetingConstants.GET_STATUS_BY_ASSIGNMENT_URI(this.httpService.userId),assignment).subscribe(res=>{
      this.snackBar.open(`Se ha cerrado la asignación ${res['assignments'].title}`, null, {duration: 4000});
      this.getAssignments(this.httpService.selectMeeting.grpId, this.httpService.selectMeeting.id, this.httpService.userId);// Se actualiza la lista de las Asignaciones
    })
  }

  /**
   * Ejecuta el movimiento de los elementos en la tabla basado en el indice inicial y final del elementos
   * cuando su ubicacion cambia
   * @param event elemento el cual es manipulado en pantalla
   */
  drop(event: CdkDragDrop<any[]>) {
    const index = this.assignments.findIndex((value) => value === event.item.data);
    const currentIndex = event.currentIndex;

    const initialPosition = this.assignments[index].position;
    const destinationPosition = this.assignments[currentIndex].position;

    // Movemos el elemento y actualizamos la pantalla
    moveItemInArray(this.assignments, index, currentIndex);
    this.updateTable(index, currentIndex, initialPosition, destinationPosition);
  }

  /**
   * Toma los indicines de posiciones para actualizar la pantalla con la informacion modificada y actulizada
   * @param index indice en donde se encontraba el elemento
   * @param currentIndex indice en donde ahora se encuentra el elemento
   * @param initialPosition valor del objeto position viejo
   * @param destinationPosition nuevo valor del objeto position
   */
  updateTable(index: number, currentIndex: number, initialPosition: number, destinationPosition: number): void {

    // Creamos un objeto para enviarlo al BackEnd
    const obj = {
      meeId: this.meeting.id,
      older_pos: initialPosition,
      new_pos: destinationPosition
    };
    this.httpService.put(NotesMeetingConstants.PUT_ONE_MEETING_ORDERED(), obj).subscribe(() => {
      // Actulizamos la vista
      this.getAssignments(this.httpService.selectMeeting.grpId, this.httpService.selectMeeting.id, this.httpService.userId);
    }, (error) => { // En caso de error se revierte el cambio de posicion y se muestra un mensaje en pantalla
      this.snackBar.open(`Ha ocurrido un error con la actualizacion de la posicion`, null, {
        duration: 4000
      });
      console.error(error.message);
      // Regresamos el elemento a como estaba antes de ocurrir el error
      moveItemInArray(this.assignments, currentIndex, index);
      this.dataSource = new MatTableDataSource(this.assignments);
    });
  }

}
