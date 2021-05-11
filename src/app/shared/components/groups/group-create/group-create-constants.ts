export class GroupCreateConstants {
  public static GET_CREATE_GROUP_URI(idUser): string {
    return `group/${idUser}`;
  }

  public static GET_GROUP_URI(): string {
    return `group`;
  }

  public static GET_GROUPS_URI(): string {
    return `groups`;
  }

  public static GET_USER_BY_ORG_URI(idorg): string {
    return `users/org/${idorg}`;
  }

  public static GET_USER_ROL_ID_PART(): string {
    return `2`;
  }

  public static GET_USER_ACRONYM(): string {
    return `INTX`;
  }

  public static GET_USER_STATUS(): number {
    return 1;
  }

  public static GET_GROUPS_BY_USER_URI(id): string {
    return `users/${id}/groups`;
  }

  public static GET_GROUPS_BY_ORG_URI(id): string {
    return `users/${id}/groups/org`;
  }

  public static GET_ORG_BY_USER_URI(id): string {
    return `/users/${id}/org`;
  }

  public static GET_GROUP_PARTICIPANT(): string {
    return `/groups/participant`;
  }

  public static GET_USERS_BY_GROUPS_URI(idGroup): string {
    return `users/groups/${idGroup}`;
  }

  public static GET_DELETE_PART_GROUP(idPart, idGroup): string {
    return `group/delete/${idPart}/${idGroup}`;
  }

  public static GET_INVITATION_URI(): string {
    return `invitation`;
  }

  public static GET_PRODUCT(): string {
    return `ABX`;
  }

  public static GET_ORIGIN(): string {
    return `mgoncalvez@intelix.biz`;
  }

  public static GET_SUJECT_PARTI_USER(): string {
    return `Ha sido invitado a participar en ABX`;
  }

  public static GET_ACTIONS_RESET_PASSWORD(): string {
    return `olvido_password`;
  }

  public static GET_ACTIONS_INVITATION_USER(): string {
    return `invitation_group`;
  }

  public static GET_TYPE(): number {
    return 1;
  }

  public static GET_EMAIL_URI(): string {
    return `email`;
  }

  public static GET_INV_STATUS_URI(): number {
    return 1;
  }

  public static GET_GROUPS_AND_USERS_BY_ORG_URI(id): string {
    return `users/${id}/groups/org/info`;
  }

  public static GET_AFILIACION_REQUEST_URI(email): string {
    return `invitation/${email}`
  }

  public static POST_MEMBERSHIP_REQUEST_URI(): string {
    return `group/add/membershipGroup`;
  }

}
