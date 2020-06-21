import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from '../Services/patients.service';
import { Router } from '@angular/router';
import { Patient } from '../models/Patient.model';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {

  public patientForm: FormGroup;
  public errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private patientsservice: PatientsService,
              private router:Router) { }

  ngOnInit() {
    this.patientForm = this.formBuilder.group({
      lastName: [null, Validators.required],
      firstName: [null, Validators.required],
      age: [0, Validators.required],
      sex: [null, Validators.required],
      drugs: [null, Validators.required],
      treatments: [null,Validators.required]
    });
  }
  onSubmit() {
    const patient = new Patient();
    patient._id = new Date().getTime().toString();
    patient.lastName = this.patientForm.get('lastName').value;
    patient.firstName = this.patientForm.get('firstName').value;
    patient.age = this.patientForm.get('age').value;
    patient.sex = this.patientForm.get('sex').value;
    patient.drugs = this.patientForm.get('drugs').value;
    patient.treatments = this.patientForm.get('treatments').value;
    this.patientsservice.createNewPatient(patient).then(
      () => {
        this.patientForm.reset();
        this.router.navigate(['/all-patients']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
}
