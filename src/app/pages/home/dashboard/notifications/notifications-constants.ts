export class NotificationsConstants {

  public static get EMPTY_NOTIFICATIONS(): string {
    return 'No hay notificaciones';
  }
  public static GET_HISTORY_BY_ASSIGNMENT(id): string {
    return `history/assignment/${id}`;
  }

  public static GET_ALL_HISTORY(): string {
    return `history`;
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
  public static get MinutesInAnDay(): number {
    return 1440;
  }
  public static get MinutesInAn3Day(): number {
    return 4320;
  }
  public static GET_NOTIFICATIONS_BY_USER(): string {
    return `notificationUser`;
  }

}
