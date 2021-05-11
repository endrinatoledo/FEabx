export interface User {
  id?: number;
  idOrg?: number;
  login: string;
  firstName: string;
  secondName: string;
  lastName: string;
  email: string;
  img?: string;
  birthdate: Date;
  password?:string;
  grpId?:number;
  status?: number;
}
