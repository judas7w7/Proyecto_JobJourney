import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Servicio para interactuar con la API de Excel.
 *
 * Este servicio proporciona métodos para obtener y guardar datos en un archivo Excel
 * a través de una API REST. Utiliza HttpClient para realizar solicitudes HTTP y maneja
 * errores de manera adecuada.
 */
@Injectable({
  providedIn: 'root' // Indica que el servicio está disponible en toda la aplicación
})
export class ExcelService {
  // URL base de la API para acceder a los datos de Excel
  private apiUrl = 'http://localhost:8080/api/excel';

  /**
   * Constructor del servicio ExcelService.
   *
   * @param http - Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Obtiene los datos del archivo Excel desde el servidor.
   *
   * Realiza una solicitud GET a la API y devuelve un Observable que emite un array de datos.
   * En caso de error, se maneja el error y se lanza un nuevo error con un mensaje adecuado.
   *
   * @returns Observable<any[]> - Un Observable que emite un array de datos del Excel.
   */
  obtenerDatos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/data`).pipe(
      catchError((error) => {
        console.error('Error al obtener datos del Excel:', error);
        return throwError(() => new Error('Error al obtener los datos del servidor.'));
      })
    );
  }

  /**
   * Guarda los datos en el archivo Excel en el servidor.
   *
   * Realiza una solicitud POST a la API con los datos proporcionados.
   * En caso de error, se maneja el error y se lanza un nuevo error con un mensaje adecuado.
   *
   * @param datos - Los datos a guardar en el archivo Excel.
   * @returns Observable<any> - Un Observable que emite la respuesta del servidor.
   */
  guardarDatos(datos: any): Observable<any> {
    console.log('Datos a guardar:', datos); // Agrega esta línea
    return this.http.post(`${this.apiUrl}/save`, datos).pipe(
      catchError((error) => {
        console.error('Error al guardar datos en el Excel:', error);
        const errorMessage = error.error?.message || 'Error al guardar los datos.';
        return throwError(() => new Error(`Error al guardar los datos: ${errorMessage}`));
      })
    );
  }
}
