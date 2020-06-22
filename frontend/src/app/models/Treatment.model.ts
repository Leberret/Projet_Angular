import { Doctor } from './Doctor.model';

export class Treatment {
    start: Date;
    end: Date;
    text: string;
    doctor: Doctor;
  }