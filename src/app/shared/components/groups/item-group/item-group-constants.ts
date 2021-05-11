export class ItemGroupConstants {
  public static GET_LEADER_BY_GROUP(idGroup): string {
    return `group/leader/${idGroup}`;
  }
  public static GET_ASSIGNMENTS_BY_GROUP_URI(groupId:number): string {
    return `assignments/group/${groupId}`;
  }
  public static GET_AGREEMENT_BY_GROUP_URI(groupId:number): string {
    return `agreement/group/${groupId}`;
  }
  public static GET_OPEN_MEETINGS_BY_GROUP_URI(groupId:number): string {
    return `meeting/group/${groupId}`;
  }
}
