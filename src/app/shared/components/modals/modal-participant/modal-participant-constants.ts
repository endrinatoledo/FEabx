export class ModalParticipantsConstants {

  public static GET_USER_BY_EMAIL_URI(email):string {
    return `user/email/${email}`
  }

  public static GET_ROL_BY_USER_GROUP_URI(idUser,idGroup):string {
    return `/user/rol/${idUser}/${idGroup}`
    
  }



}
