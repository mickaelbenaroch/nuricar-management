import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YearPipePipe } from './pipes/year-pipe.pipe';
import { CarsComponent } from './components/cars/cars.component';
import { IconsComponent } from './components/icons/icons.component';
import { MenuComponent } from './components/menu/menu.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

const appRoutes: Routes = [
  { path: '' , component: MenuComponent},
  { path: 'cars', component: CarsComponent},
  { path: 'icons' , component: IconsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    YearPipePipe,
    CarsComponent,
    IconsComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
