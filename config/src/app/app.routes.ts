import { Routes } from '@angular/router';
import { Dashboard } from './components/core/dashboard/dashboard';

export const routes: Routes = [

    { path:'dashboard/:id?', component:Dashboard},
    { path:'', redirectTo:'dashboard/:id?', pathMatch:'full'},
    { path:'**', redirectTo:'dashboard', pathMatch:'full'}
];
