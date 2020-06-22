import { Component, OnInit, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PatientsService } from '../Services/patients.service';
import { Drug } from '../models/Drug.model';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.scss']
})
export class DrugComponent implements OnInit {
  drug: Drug;
  drugForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientsservice: PatientsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.patientsservice.getPatientById(params.id).then(
          (drug: Drug) => {
            this.drug = drug;
          }
        );
      }
    );

    /*this.route.params.subscribe(
      (params) => {
        this.patientsservice.getPatientById(params.id).then(
          (drug: Drug) => {
            this.drug = drug;
            this.drugForm.get('drugName').setValue(this.drug.drugName);
            this.drugForm.get('code').setValue(this.drug.code);
          }
        );
      }
    );*/
  }
  onCreate() {
    //this.patientsservice.creatNewDrug(this.drug);
  }
  /*onSubmit() {

    const drug = new Drug();
    
    drug.drugName = this.drugForm.get('drugName').value;
    drug.code = this.drugForm.get('code').value;

   
  }*/

}
