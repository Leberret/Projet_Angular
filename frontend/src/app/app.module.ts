import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientComponent } from './patient/patient.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { ModifyPatientComponent } from './modify-patient/modify-patient.component';
import { DrugComponent } from './drug/drug.component';
import { NewDrugComponent } from './new-drug/new-drug.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientsListComponent,
    PatientComponent,
    NewPatientComponent,
    ModifyPatientComponent,
    DrugComponent,
    NewDrugComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
