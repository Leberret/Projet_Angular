import { Drug } from './Drug.model';

export class Patient {
  
  _id: string;
  lastName: string;
  firstName: string;
  age: number;
  sex: string;
  drugs?: Drug[];
  treatments?:string[];

}