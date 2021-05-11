export class GroupConstants {
  public static GET_GROUPS_BY_USER_URI(id): string {
    return `users/${id}/groups`;
  }
  public static GET_ROL_BY_USER(id,idGroup): string {
    return `user/rol/${id}/${idGroup}`;
  }

  public static GET_PARTICIPANTS_BY_GROUP(idGroup): string {
    return `participant/group/${idGroup}`;
  }

  public static GET_STATISTICS_GROUP(idGroup): string {
    return `group/${idGroup}/statistics`;
  }

}
