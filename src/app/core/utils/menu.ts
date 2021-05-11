import {Menu} from './menu.model';
import {submenus} from './submenu';

export const menus: Menu[] = [
  new Menu(1, 'Inicio', '/home', null, 'home'),
  new Menu(2, 'Grupos', '', submenus.filter(sub => sub.parentId === 2), 'group'),
  new Menu(3, 'Notas', '', submenus.filter(sub => sub.parentId === 3), 'assignment'),
  new Menu(4, 'Mantenimiento', '', null, 'settings_applications')
];
