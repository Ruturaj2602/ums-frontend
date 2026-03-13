import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password';
import { UnlockComponent } from './features/auth/unlock/unlock';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
   { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'unlock', component: UnlockComponent }
];