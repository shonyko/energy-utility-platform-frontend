import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {IsAuthenticatedGuard} from "./guards/is-authenticated.guard";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {ClientPageComponent} from "./pages/client-page/client-page.component";
import {UserRole} from "./enums/user-role";
import {HasRoleGuard} from "./guards/has-role.guard";
import {IsNotAuthenticatedGuard} from "./guards/is-not-authenticated.guard";

const routes: Routes = [
  {
    path: '', redirectTo: "/login", pathMatch: 'full'
  },
  {
    path: 'login', component: LoginPageComponent,
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: 'register', component: RegisterPageComponent,
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: 'admin', component: AdminPageComponent,
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      role: UserRole.Admin
    }
  },
  {
    path: 'client', component: ClientPageComponent,
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      role: UserRole.Client
    }
  },
  {
    path: '404', component: NotFoundPageComponent
  },
  {
    path: '**', redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
