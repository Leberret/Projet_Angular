import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientsService } from '../Services/patients.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Patient } from '../models/Patient.model';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit, OnDestroy {

  public patients: Patient[]=[];

  private patientsSub:Subscription;
  constructor(private patientsservice: PatientsService,
                 private router: Router) {}

  ngOnInit() {
    this.patientsSub = this.patientsservice.patients$.subscribe(
      (patients) => {
        this.patients = patients;
      }
    );
    this.patientsservice.getPatients();
  }

  onPatientClicked(id: string) {
    this.router.navigate(['/patient/' + id]);
  }
  onModify(id) {
    this.router.navigate(['/modify-patient/' + id]);
  }

  onDelete(id) {
    this.patientsservice.deletePatient(id).then(
      () => {
        this.router.navigate(['/all-patients']);
      }
    );
  }
  ngOnDestroy() {
    this.patientsSub.unsubscribe();
  }

}
