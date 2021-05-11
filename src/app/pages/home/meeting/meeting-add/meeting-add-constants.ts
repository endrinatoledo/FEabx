export class MeetingAddConstants {

  public static GET_ALL_USER(): string {
    return `user`;
  }
  public static GET_ALL_USER_BY_MEETING(id): string {
    return `meeting/${id}/users`;
  }

  public static GET_SEND_NOTIFICATION(): string {
    return `notifications`;
  }
}
