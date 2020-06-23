import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientComponent } from './patient/patient.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { ModifyPatientComponent } from './modify-patient/modify-patient.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';


const routes: Routes = [
  { path: 'new-patient', component: NewPatientComponent },
  { path: 'all-patients', component: PatientsListComponent },
  { path: 'patient/:id', component: PatientComponent },
  { path: 'modify-patient/:id', component: ModifyPatientComponent },
  { path: 'doctors', component: DoctorsListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'all-patients' },
  { path: '**', redirectTo: 'all-patients' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
