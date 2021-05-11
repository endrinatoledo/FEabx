export class MeetingInformacionConstants {

  public static GET_STATUS_BY_MEETING_PRECLOSER_URI(idMee): string {
    return `meeting/precloser/${idMee}`;

  }
  public static GET_STATUS_BY_MEETING_CLOSER_URI(idMee, userId): string {
    return `meeting/closer/${idMee}/user/${userId}`;

  }
  public static GET_ASSIGNMENT_BY_MEETING_URI(idMee): string {
    return `assignments/meeting/${idMee}`;

  }

  public static GET_AGREEMENT_BY_MEETING_URI(idMee): string {
    return `agreements/meeting/${idMee}`;

  }
  public static GET_PRODUCT(): string {
    return `ABX`;
  }

  public static GET_ORIGIN(): string {
    return `etoledo@intelix.biz`;
  }

  public static GET_TYPE(): number {
    return 1;
  }

  public static GET_ACTIONS_ASSIGNMENTS_MEETING(): string {
    return `assigment_meting`;
  }

  public static GET_ACTIONS_MEETING_MINUTES(): string {
    return `meeting_minutes`;
  }

  public static GET_EMAIL_MEETING_ASSIG_URI(): string {
    return `emailMeetingAssi`;
  }
  public static GET_EMAIL_MEETING_MINUTES_URI(): string {
    return `emailMeetingMinutes`;
  }

  public static GET_USERS_BY_GROUPS_URI(idGroup): string {
    return `users/groups/${idGroup}`;
  }

  public static GET_MEETING_BY_ID(idMee): string {
    return `/meeting/${idMee}`;  }

    public static GET_ALL_USER_BY_MEETING(idMee): string {
    return `/meeting/${idMee}/users`;  }
  
    public static GET_ALL_PARTICIAPNT_BY_MEETING(idMee): string {
      return `/participant/meeting/${idMee}`;  }

    public static GET_USER_BY_ID(userId): string {
      return `/user/${userId}`;  }
      

}
