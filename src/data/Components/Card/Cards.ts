import { faAddressBook, faCalendarDay, faSackDollar, IconDefinition } from '@fortawesome/free-solid-svg-icons';

/* eslint-disable no-unused-vars */
export enum Card {
  Clients = 'clients',
  Income = 'income',
  Appointments = 'appointments',
}

export interface ICard {
  name?: string;
  id?: Card;
  icon?: IconDefinition;
  count?: number;
  color?: string;
}

export const Cards: ICard[] = [
  {
    name: 'Clientes',
    id: Card.Clients,
    icon: faAddressBook,
    color: 'rgb(33 97 164)',
    count: 100,
  },
  {
    name: 'Ganancias',
    id: Card.Income,
    icon: faSackDollar,
    color: 'rgb(38 161 12)',
    count: 10000,
  },
  {
    name: 'Reservas',
    id: Card.Clients,
    icon: faCalendarDay,
    color: 'rgb(183 101 1)',
    count: 100,
  },
];
