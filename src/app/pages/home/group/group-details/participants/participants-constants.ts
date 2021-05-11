export class ParticipantsConstants {

  public static GET_PARTICIPANTS_BY_GROUP(idGroup): string {

    return `users/groups/${idGroup}`;

  }

  public static GET_TITLE_MODAL_PARTICIPANTS(): string {
    return 'Agregar Participante';
  }

  public static GET_ADD_PARTICIPANT(): string {
    return `participant`;
  }

  public static GET_USER_STATUS(): number {
    return 1;
  }

  public static GET_USER_ROL_ID_PART(): string {
    return `2`;
  }

  public static GET_CREATE_INVITED_URI(idGroup, idUser, invited): string {
    return `domains/email/${invited}/group/${idGroup}/user/${idUser}`;
  }

  public static GET_GROUP_PARTICIPANT(): string {
    return `groups/participant`;
  }

  public static DELETE_PARTICIPANT_GROUP(idGroup, idPart): string {
    return `group/delete/${idPart}/${idGroup}`;
  }

}
