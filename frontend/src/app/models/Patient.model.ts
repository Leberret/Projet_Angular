import { Drug } from './Drug.model';
import { Treatment } from './Treatment.model';

export class Patient {
  
  _id: string;
  lastName: string;
  firstName: string;
  age: number;
  sex: string;
  drugs?: Drug[];
  treatments?: Treatment[];

}