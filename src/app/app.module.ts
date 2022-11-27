import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpClientModule} from '@angular/common/http';

import {AngularMaterialModule} from "./angular.material.module";
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {AdminPageComponent} from './pages/admin-page/admin-page.component';
import {ClientPageComponent} from './pages/client-page/client-page.component';
import {AuthInterceptorProvider} from "./interceptors/auth.interceptor";
import {DeviceDataTableComponent} from './components/device-data-table/device-data-table.component';
import {DeviceFormDialogComponent} from './components/device-form-dialog/device-form-dialog.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {AddressDataTableComponent} from "./components/address-data-table/address-data-table.component";
import {AddressFormDialogComponent} from "./components/address-form-dialog/address-form-dialog.component";
import {UserDataTableComponent} from "./components/user-data-table/user-data-table.component";
import {UserFormDialogComponent} from "./components/user-form-dialog/user-form-dialog.component";
import {ClientDataTableComponent} from "./components/client-data-table/client-data-table.component";
import {ClientFormDialogComponent} from "./components/client-form-dialog/client-form-dialog.component";
import {NgChartsModule} from 'ng2-charts';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import { RefreshButtonComponent } from './components/refresh-button/refresh-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminPageComponent,
    ClientPageComponent,
    AddressDataTableComponent,
    DeviceDataTableComponent,
    UserDataTableComponent,
    ClientDataTableComponent,
    AddressFormDialogComponent,
    DeviceFormDialogComponent,
    UserFormDialogComponent,
    ConfirmationDialogComponent,
    ClientFormDialogComponent,
    RefreshButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    NgChartsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule {
}
