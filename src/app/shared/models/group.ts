import {Organization} from './organization';

export interface Group {
  id?: number;
  name: string;
  parentId: number;
  parent?: Group;
  description: string;
  img?: string;
  acronym: string;
  orgId?: number;
  organization?: Organization;
  userId?: number;
  leaderId?:number;
}
