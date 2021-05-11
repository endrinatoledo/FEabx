import {Group} from './group';
import {User} from './user';

export interface Agreement {
  id?: number;
  title: string;
  content: string;
  oriId: number;
  origin?: any;
  meeId?:number;
  createDate?: Date;
  updateDate?: Date;
  finalDate?:Date;
  status?: number;
  grpId: number;
  group?: Group;
  usrId?: number;
  user?: User;
  usrCreator?: number;
  type?:string;
  date?:Date
}
