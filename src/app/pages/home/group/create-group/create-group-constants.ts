export class CreateGroupConstants {
    public static GET_GROUPS_BY_USER_URI(id): string {
      return `users/${id}/groups`;
    }
  
    public static GET_USERS_BY_ALL_GROUPS_URI(id): string {
      return `users/${id}`;
    }
  
  }
  