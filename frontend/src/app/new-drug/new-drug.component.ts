import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../Services/patients.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Drug } from '../models/Drug.model';
import { Patient } from '../models/Patient.model';
import { NewPatientComponent } from '../new-patient/new-patient.component';
import { PatientComponent } from '../patient/patient.component';

@Component({
  selector: 'app-new-drug',
  templateUrl: './new-drug.component.html',
  styleUrls: ['./new-drug.component.scss']
})
export class NewDrugComponent implements OnInit {
  
  public drugForm: FormGroup;
  public errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private patientsservice: PatientsService,
    private router:Router) { }

    ngOnInit() {
      this.drugForm = this.formBuilder.group({
        name: [null, Validators.required],
        code: [null, Validators.required]
      });
    }
    onSubmit() {
     
      const drug = new Drug();
      drug.name = this.drugForm.get('name').value;
      drug.code = this.drugForm.get('code').value;
      
  
      this.patientsservice.createNewDrug(drug).then(
        () => {
          this.drugForm.reset();
        }
      ).catch(
        (error) => {
          this.errorMessage = error.message;
        }
      );
    }

}
