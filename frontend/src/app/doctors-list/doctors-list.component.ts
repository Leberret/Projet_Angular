import { Component, OnInit, OnDestroy } from '@angular/core';
import { Patient } from '../models/Patient.model';
import { Subscription } from 'rxjs';
import { PatientsService } from '../Services/patients.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit, OnDestroy {

  public patients: Patient[]=[];

  private patientsSub:Subscription;
  constructor(private patientsservice: PatientsService) {}

  ngOnInit() {
    this.patientsSub = this.patientsservice.patients$.subscribe(
      (patients) => {
        this.patients = patients;
      }
    );
    this.patientsservice.getPatients();
  }
  ngOnDestroy() {
    this.patientsSub.unsubscribe();
  }

}
