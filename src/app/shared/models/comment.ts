import {User} from './user';
export interface Comment {
  id?: number;
  description: string;
  updatedAt: Date;
  agrId?: number;
  asmId?: number;
  usrId: number;
  user?:User;
  
}
