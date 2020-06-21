import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/Patient.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PatientsService } from '../Services/patients.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit{
  public patient: Patient;
  constructor(private router:Router,
              private route: ActivatedRoute,
              private patientsservice: PatientsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.patientsservice.getPatientById(params.id).then(
          (patient: Patient) => {
            this.patient = patient;
          }
        );
      }
    );
  }
  onGoBack() {
    this.router.navigate(['/all-patients']);
  }

  onModify() {
    this.router.navigate(['/modify-patient/' + this.patient._id]);
  }

  onDelete() {
    this.patientsservice.deletePatient(this.patient._id).then(
      () => {
        this.router.navigate(['/all-patients']);
      }
    );
  }


}
