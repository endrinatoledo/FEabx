export class TableMeetingsConstants {

    public static get EMPTY_NOTIFICATIONS(): string {
      return 'No hay notificaciones';
    }
    
    public static GET_HISTORY_BY_ASSIGNMENT(id): string {
      return `history/assignment/${id}`;
    }
    public static GET_HISTORY_BY_AGREEMENT(id): string {
      return `history/agreement/${id}`;
    }
    public static GET_USER_BY_ID(id): string {
      return `user/${id}`;
    }
    public static get MinutesInAnHour(): number {
      return 60;
    }
    public static  GET_TITLE_MODAL_MEETING(): string {
      return 'Crear reunión';
    }
    public static get MinutesInAnDay(): number {
      return 1440;
    }
    public static get MinutesInAn3Day(): number {
      return 4320;
    }
    public static GET_ALL_MEETING(): string {
      return `meetings`;
    }
    public static GET_ACTIONS_MEETING_ATTENDANCE(): string {
      return `meeting_attendance`;
    }
    public static GET_ACTIONS_MEETING_INVITATION(): string {
      return `meeting_invitation`;
    }
    public static GET_EMAIL_MEETING_INVITATION(): string {
      return `notification/meeting`;
    }

    public static GET_EMAIL_MEETING_ATTENDANCE(): string {
      return `attendance/meeting`;
    }
    public static GET_USER_BY_EMAIL(email): string {
      return `user/email/${email}`;
    }

    public static GET_DOMAIN_BY_EMAIL(email): string {
      return `domains/email/${email}`;
    }
    
  }
  