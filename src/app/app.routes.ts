import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'register', component: RegisterPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'home', component: HomeComponent },
  { path: '',  component: HomeComponent}, // Redirección por defecto
  { path: '**', component: HomeComponent} // Redirección para rutas no válidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
