export class GroupContainerConstants {
  public static GET_ASSIGNMENTS_BY_GROUP_URI(groupId:number): string {
    return `assignments/group/${groupId}`;
  }

  public static GET_AGREEMENT_BY_GROUP_URI(groupId:number): string {
    return `agreement/group/${groupId}`;
  }

  public static GET_USERS_BY_GROUPS_URI(idGroup): string {
    return `users/groups/${idGroup}`;
  }


}
