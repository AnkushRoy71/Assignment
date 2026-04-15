import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';


export const routes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)},
    {path: '', redirectTo: 'register', pathMatch: 'full'},
];
