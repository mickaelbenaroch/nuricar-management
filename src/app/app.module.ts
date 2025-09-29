import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CarsComponent } from './components/cars/cars.component';
import { MenuComponent } from './components/menu/menu.component';
import { IconsComponent } from './components/icons/icons.component';
import { MissingIconsComponent } from './components/missing-icons/missing-icons.component';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';


const appRoutes: Routes = [
  { path: '' , component: MenuComponent},
  { path: 'cars', component: CarsComponent},
  { path: 'icons' , component: IconsComponent},
  { path: 'missing' , component: MissingIconsComponent},
];

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
