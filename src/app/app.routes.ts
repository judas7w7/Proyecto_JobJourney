import { RouterModule, Routes } from '@angular/router';
import { SectionRegisterComponent } from './components/section-register/section-register.component';
import { SectionSearchComponent } from './components/section-search/section-search.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'register', component: SectionRegisterComponent },
  { path: 'search', component: SectionSearchComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' }, // Redirección por defecto
  { path: '**', redirectTo: '/search' } // Redirección para rutas no válidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
