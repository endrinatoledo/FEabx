import {Submenu} from './submenu.model';

export const submenus: Submenu[] = [
  new Submenu(1, 'Mis Grupos', 'group/my-group', 2, ''),
  new Submenu(2, 'Crear Grupo', 'group/create-group', 2, ''),
  new Submenu(3, 'Afiliación a Grupo', 'group/group-affiliation', 2, ''),

  new Submenu(3, 'Asignaciones', '', 3, ''),
  new Submenu(4, 'Acuerdos', '', 3, ''),
  new Submenu(5, 'Puntos Sugeridos', '', 3, ''),
  new Submenu(6, 'Puntos de Agenda', '', 3, ''),
];
