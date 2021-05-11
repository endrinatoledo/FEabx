export class ModalConstants {

  public static CREATE_COMMENT_ASSIGNMENT_URI(id): string {
    return `users/${id}/assignments/comment`;
  }
  public static GET_COMMENT_ASSIGNMENT_URI(id,idAssig): string {
    return `users/${id}/assignments/${idAssig}/comment`;
  }
  public static GET_USER_BY_ID_URI(id): string {
    return `user/${id}`;
  }
  public static GET_STATUS_BY_ASSIGNMENT_URI(id): string {
    return `/users/${id}/assignments/status`;
  }
  public static GET_USERS_BY_GROUPS_URI(idGroup): string {
    return `users/groups/${idGroup}`;
  }

  public static GET_USERS_ACT_ORG(idOrg): string {
    return `users/act/org/${idOrg}`;
  }

  public static GET_ORIGIN_URI(): string {
    return `origins`;
  }
  public static GET_USERS_BY_ORG_AND_LOGIN_URI(OrgAndUser): string {
    return `users/${OrgAndUser}`;
  }
  public static GET_GROUP_BY_ID(id): string {
    return `group/${id}`;
  }
  public static GET_USERS_BY_EMAIL(email): string {
    return `user/email/${email}`;
  }

  public static GET_USERS_BY_EMAIL_MEETING_ASSITENCE(email): string {
    return `meetingAssistance/${email}`;
  }

  public static GET_USER_ROL_GROUP(id,groupId): string {
    return `user/rol/${id}/${groupId}`;
  }

}
