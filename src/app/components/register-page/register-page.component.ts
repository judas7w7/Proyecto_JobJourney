import { Component } from '@angular/core';
import { ExcelService } from '../../service/excel.service'; // Ajustar la ruta del servicio
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  formData: any = {
    nombre: '',
    edad: null,
    fechaNacimiento: '',
    genero: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    redes: '',
    nivelEducativo: '',
    institucion: '',
    titulo: '',
    anioGraduacion: null,
    empresa: '',
    cargo: '',
    fechaInicio: '',
    fechaFin: '',
    experiencia: '',
    responsabilidades: ''
  };

  constructor(private excelService: ExcelService) { }

  onSubmit(): void {
    // Validar formulario
    if (!this.validateForm()) {
      return; // Detener envío si hay errores de validación
    }

    // Enviar datos al servicio
    this.excelService.guardarDatos(this.formData).subscribe({
      next: (response) => {
        alert('Datos enviados correctamente');
        this.resetForm(); // Opcional: limpiar el formulario después del envío
      },
      error: (error) => {
        console.error('Error al enviar los datos:', error);
        alert('Ocurrió un error al enviar los datos');
      }
    });
  }

  validateForm(): boolean {
    let isFormValid = true;
    let missingFields: string[] = [];

    // Validar que todos los campos requeridos estén completos
    for (const key in this.formData) {
      if (this.formData.hasOwnProperty(key)) {
        const value = this.formData[key];
        if (
          (value === null || value === '') &&
          key !== 'redes' // Redes sociales es opcional
        ) {
          missingFields.push(key);
          isFormValid = false;
        }
      }
    }

    // Mostrar alerta de los campos faltantes
    if (!isFormValid) {
      const missingFieldsString = missingFields.join(', ');
      alert(`Por favor, complete los siguientes campos requeridos: ${missingFieldsString}`);
    }

    return isFormValid;
  }

  resetForm(): void {
    // Resetea los campos del formulario
    this.formData = {
      nombre: '',
      edad: null,
      fechaNacimiento: '',
      genero: '',
      correo: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      redes: '',
      nivelEducativo: '',
      institucion: '',
      titulo: '',
      anioGraduacion: null,
      empresa: '',
      cargo: '',
      fechaInicio: '',
      fechaFin: '',
      experiencia: '',
      responsabilidades: ''
    };
  }
}
