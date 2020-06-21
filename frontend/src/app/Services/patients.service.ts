import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Patient } from '../models/Patient.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

  export class PatientsService {

    constructor(private http: HttpClient) {}
  
    private patients: Patient[] = [
      {
        _id: '324sdfmoih3',
        lastName: 'LE BERRE',
        firstName: 'Thomas',
        age: 22,
        sex: 'M',
        drugs:['doliprane'],
        treatments: ['gg']
      },
      {
        _id: '324sdfmoih4',
        lastName: 'LE BERRE',
        firstName: 'Guy',
        age: 55,
        sex: 'M',
        drugs:['eferalgent'],
        treatments: ['ZZ']
      },
    ];
    public patients$ = new Subject<Patient[]>();
  
    getPatients() {
      this.http.get('http://localhost:3000/api/patients').subscribe(
        (patients: Patient[]) => {
          if (patients) {
            this.patients = patients;
            this.emitPatients();
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  
    emitPatients() {
      this.patients$.next(this.patients);
    }
  
    getPatientById(id: string) {
      return new Promise((resolve, reject) => {
        this.http.get('http://localhost:3000/api/patients/' + id).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
  
    createNewPatient(patient: Patient) {
      return new Promise((resolve, reject) => {
        this.http.post('http://localhost:3000/api/patients', patient).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
  
    
  
    modifyPatient(id: string, patient: Patient) {
      return new Promise((resolve, reject) => {
        this.http.put('http://localhost:3000/api/patients/' + id, patient).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
  
  
    deletePatient(id: string) {
      return new Promise((resolve, reject) => {
        this.http.delete('http://localhost:3000/api/patients/' + id).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }
  }
  