export class LandingConstants {
  public static GET_CREATE_USER_URI(): string {
    return `user`;
  }

  public static GET_USER_BY_EMAIL_URI(email): string {
    return `user/email/${email}`;
  }

  public static GET_USER_BY_EMAIL_URI_LOGIN(): string {
    return `user/email`;
  }

  public static GET_USER_DATA(): string {
    return `user/token`;
  }

  public static GET_EMAIL_URI(): string {
    return `email`;
  }
  public static GET_GROUP_PARTICIPANT(): string {
    return `/groups/participant`;
  }
  public static GET_USER_BY_ID_URI(id): string {
    return `user/${id}`;
  }

  public static UPDATE_USER_BY_ID_URI(id): string {
    return `user/${id}`;
  }
  public static GET_DOMAINS_URI(): string {
    return `domains`;
  }
  public static GET_STATUS_BY_USER_URI(id): string {
    return `user/status/${id}`;
  }

  public static GET_UPDATE_PASSWORD_USER_URI(email): string {
    return `user/password/${email}`;
  }

  public static GET_RESET_PASSWORD_USER_URI(id): string {
    return `user/restPassword/${id}`;
  }
  public static GET_PRODUCT(): string {
    return `ABX`;
  }
  public static GET_ORIGIN(): string {
    return `mariajsc.95@gmail.com`;
  }
  public static GET_SUJECT_RESET_PASSWORD(): string {
    return `Recuperacion de contaseña ABX`;
  }

  public static GET_SUJECT_CREATE_USER(): string {
    return `Registro exitoso a ABX`;
  }
  public static GET_ACTIONS_RESET_PASSWORD(): string {
    return `olvido_password`;
  }

  public static GET_ACTIONS_CREATE_USER(): string {
    return `crete_user`;
  }

  public static GET_ACTIONS_REQ_AFILIATION(): string {
    return `afiliacion_group`;
  }

  public static GET_TYPE(): number {
    return 1;
  }

  public static GET_TYPE_CREATE_USER(): number {
    return 4;
  }

  public static GET_TYPE_AFILIATION(): number {
    return 5;
  }

  public static GET_INCITATIONS_BY_EMAIL_URI(email): string {
    return  `invitation/${email}`;
  }



}
