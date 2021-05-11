export class Submenu {
  constructor(public id: number,
              public name: string,
              public routerLink: string = '',
              public parentId: number,
              public icon: string = '') {
  }
}
