export class DashboardConstants {
  public static GET_GROUPS_BY_USER_URI(id): string {
    return `users/${id}/groups`;
  }
  public static GET_USERS_BY_ALL_GROUPS_URI(id): string {
    return `users/${id}`;
  }

  public static get ASSIGNMENTS_LOWER_CASE(): string {
    return 'Asignaciones';
  }

  public static get ASSIGNMENTS_UPPER_CASE(): string {
    return 'ASIGNACIONES';
  }

  public static get AGREEMENTS_LOWER_CASE(): string {
    return 'Acuerdos';
  }

  public static get AGREEMENTS_UPPER_CASE(): string {
    return 'ACUERDOS';
  }
  public static  GET_TITLE_MODAL_MEETING(): string {
    return 'Crear reunión';
  }

  public static get ASSIGNMENT_ID(): number {
    return 1;
  }

  public static get AGREEMENT_ID(): number {
    return 2;
  }
  public static GET_ROL_BY_USER_URI(id): string {
    return `user/rol/${id}`;
  }
}
