import {Submenu} from './submenu.model';

export class Menu {
  constructor(public id: number,
              public name: string,
              public routerLink: string = '',
              public submenus: Submenu[],
              public icon: string = '') {
  }
}
