export class NotesMeetingConstants {

  public static GET_ONE_MEETING_ORDERED(grpId, meeId, usrId): string {
    return `onemeeting/ordered/${grpId}/${meeId}/${usrId}`;
  }

  public static PUT_ONE_MEETING_ORDERED(): string {
    return `onemeeting/ordered/`;
  }

  public static GET_ASSIGNMENTS_BY_USER_URI(id): string {
    return `users/${id}/assignments`;
  }

  public static GET_AGREEMENTS_BY_USER_URI(id): string {
    return `users/${id}/agreements`;
  }
  public static GET_HISTORY(): string {
    return `history`;
  }
  public static GET_USERS_BY_GROUP_URI(id): string {
    return `users/groups/${id}`;
  }
  public static GET_STATUS_BY_ASSIGNMENT_URI(id): string {
    return `/users/${id}/assignments/status`;

  }
  public static get ASSIGNMENTS_LOWER_CASE(): string {
    return 'Asignaciones';
  }


  public static get AGREEMENTS_LOWER_CASE(): string {
    return 'Acuerdos';
  }

  public static get AGREEMENTS_UPPER_CASE(): string {
    return 'ACUERDOS';
  }
  public static get ASSIGNMENT_ID(): number {
    return 1;
  }
  public static get AGREEMENT_ID(): number {
    return 2;
  }
  public static get ASSIGNMENTS_UPPER_CASE(): string {
    return 'ASIGNACIONES / ACUERDOS';
  }
  public static GET_NEXT_STATUS_BY_ASSIGNMENT_URI(asmId): string {
    return `assignments/nextStatus/${asmId}`;
  }


  public static GET_NEXT_STATUS_BY_AGREEMENT_URI(agrId): string {
    return `agreements/nextStatus/${agrId}`;
  }

  public static CREATE_ASSIGNMENT_URI(id): string {
    return `users/${id}/assignments`;
  }
  public static CREATE_COMMENT_ASSIGNMENT_URI(id): string {
    return `users/${id}/assignments/comment`;
  }
  public static CREATE_AGREEMENT_URI(id): string {
    return `users/${id}/agreements`;
  }

  public static GET_ORIGINS_URI(): string {
    return `origins`;
  }

  public static get EMPTY_ASSIGNMENTS(): string {
    return 'No hay asignaciones pendientes';
  }

  public static get EMPTY_AGREEMENTS(): string {
    return 'No hay acuerdos';
  }

  public static get TITLE(): string {
    return 'Titulo';
  }

  public static get GROUP(): string {
    return 'Grupo';
  }

  public static get RESPOSABLE(): string {
    return 'Responsable';
  }
  public static GET_ROL_BY_USER(id,idGroup): string {
    return `user/rol/${id}/${idGroup}`;
  }

  public static get FINAL_DATE(): string {
    return 'Fecha de entrega';
  }

  public static get ASC_SORTING(): string {
    return 'Ascendente';
  }

  public static get DESC_SORTING(): string {
    return 'Descendente';
  }

  public static get CREATE_ASSIGNMENT(): string {
    return 'Crear Asignación';
  }

  public static get CREATE_AGREEMENT(): string {
    return 'Crear Acuerdo';
  }
  public static GET_ASSIGNMENTS_BY_GROUP_URI(groupId:number): string {
    return `assignments/group/${groupId}`;
  }

  public static GET_AGREEMENT_BY_GROUP_URI(groupId:number): string {
    return `agreement/group/${groupId}`;
  }


}
