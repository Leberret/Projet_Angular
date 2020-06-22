import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PatientsService } from '../Services/patients.service';
import { Router } from '@angular/router';
import { Patient } from '../models/Patient.model';
import { Drug } from '../models/Drug.model';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent {

  patientForm: FormGroup;
  public errorMessage: string;
  constructor(private formBuilder: FormBuilder,
              private patientsservice: PatientsService,
              private router:Router) {
          
    this.patientForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      age: [0, Validators.required],
      sex: ['', Validators.required],
      drugs: this.formBuilder.array([]),
      treatments: this.formBuilder.array([]),
    }); 
  }
  
  get drugs() : FormArray {
    return this.patientForm.get('drugs') as FormArray;
  }
  newDrug(): FormGroup{
    return this.formBuilder.group({
      drug:'',
      code:'',
    })
  }
  addDrugs() {
    this.drugs.push(this.newDrug());
  }

  removeDrug(i:number){
    this.drugs.removeAt(i);
  }

  onSubmit() {
    //const drug =new Drug();
    const patient = new Patient();
    patient._id = new Date().getTime().toString();
    patient.lastName = this.patientForm.get('lastName').value;
    patient.firstName = this.patientForm.get('firstName').value;
    patient.age = this.patientForm.get('age').value;
    patient.sex = this.patientForm.get('sex').value;
    patient.drugs = this.patientForm.get('drugs').value ? this.patientForm.get('drugs').value: [] ;
    //drug.name = this.drugForm.get('name').value;
    //drug.code = this.drugForm.get('code').value;
    patient.treatments = this.patientForm.get('treatments').value ? this.patientForm.get('treatments').value:[];
    

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

  /*
  getTreatments(): FormArray {
    return this.patientForm.get('treatments') as FormArray;
  }
  onAddTreatments() {
    const newTreatmentsControl = this.formBuilder.control(null, Validators.required);
    this.getTreatments().push(newTreatmentsControl);
  }*/
  
}
