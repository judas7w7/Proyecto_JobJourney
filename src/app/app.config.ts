import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para formularios
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule para solicitudes HTTP

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(FormsModule), // Habilita el soporte para FormsModule
    importProvidersFrom(HttpClientModule) // Habilita el soporte para HttpClientModule
  ]
};
