export class CardMyGroupConstants {
  public static GET_TITLE_MODAL(): string {
    return `Eliminar Grupo`;
  }
  public static GET_GROUP_LEARDE_URL(idGroup:number): string {
    return `group/leader/${idGroup}`;
  }
  public static GET_ASSIGNMENTS_BY_GROUP_URI(groupId:number): string {
    return `assignments/group/${groupId}`;
  }

  public static GET_AGREEMENT_BY_GROUP_URI(groupId:number): string {
    return `agreement/group/${groupId}`;
  }
  public static GET_ROL_BY_USER(id,idGroup): string {
    return `user/rol/${id}/${idGroup}`;
  }
  

}
