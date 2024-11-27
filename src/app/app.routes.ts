import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'register', component: RegisterPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirección por defecto
  { path: '**', redirectTo: '/home' } // Redirección para rutas no válidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
