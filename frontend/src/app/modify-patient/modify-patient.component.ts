import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/Patient.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PatientsService } from '../Services/patients.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-patient',
  templateUrl: './modify-patient.component.html',
  styleUrls: ['./modify-patient.component.scss']
})
export class ModifyPatientComponent implements OnInit {
  patient: Patient;
  patientForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private patientsservice: PatientsService) { }

  ngOnInit(): void {

    this.patientForm = this.formBuilder.group({
      lastName: [null, Validators.required],
      firstName: [null, Validators.required],
      age: [0, Validators.required],
      sex: [null, Validators.required],
      drugs: this.formBuilder.array([]),
      treatments: this.formBuilder.array([])
    });

    this.route.params.subscribe(
      (params) => {
        this.patientsservice.getPatientById(params.id).then(
          (patient: Patient) => {
            this.patient = patient;
            this.patientForm.get('lastName').setValue(this.patient.lastName);
            this.patientForm.get('firstName').setValue(this.patient.firstName);
            this.patientForm.get('age').setValue(this.patient.age);
            this.patientForm.get('sex').setValue(this.patient.sex);
            this.patientForm.get('drugs').setValue(this.patient.drugs);
            this.patientForm.get('treatments').setValue(this.patient.treatments);
          }
        );
      }
    );
  }

  onSubmit() {

    const patient = new Patient();
    patient._id = new Date().getTime().toString();
    patient.lastName = this.patientForm.get('lastName').value;
    patient.firstName = this.patientForm.get('firstName').value;
    patient.age = this.patientForm.get('age').value;
    patient.sex = this.patientForm.get('sex').value;
    patient.drugs = this.patientForm.get('drugs').value ? this.patientForm.get('drugs').value: [] ;
    patient.treatments = this.patientForm.get('treatments').value ? this.patientForm.get('treatments').value:[];

    this.patientsservice.modifyPatient(this.patient._id, patient).then(
      () => {
        this.patientForm.reset();
        this.router.navigate(['/all-patients']);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
  getDrugs(): FormArray {
    return this.patientForm.get('drugs') as FormArray;
  }
  onAddDrugs() {
    const newDrugsControl = this.formBuilder.control(null, Validators.required);
    this.getDrugs().push(newDrugsControl);
  }
  getTreatments(): FormArray {
    return this.patientForm.get('treatments') as FormArray;
  }
  onAddTreatments() {
    const newTreatmentsControl = this.formBuilder.control(null, Validators.required);
    this.getTreatments().push(newTreatmentsControl);
  }
  
}
