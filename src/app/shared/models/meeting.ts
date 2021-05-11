import {Group} from './group';
import {User} from './user';

export interface Meeting {
  id?: number;
  title: string;
  date: Date;
  grpId: number;
  group?: Group;
  oriId:number;
  status:number;
  usrId?:number;
  participants?:{};
}
