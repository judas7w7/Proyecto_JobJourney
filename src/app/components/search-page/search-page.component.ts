import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FormsModule, CommonModule], // No HttpClientModule aquí
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  registros: any[] = []; // Lista completa de registros
  registrosFiltrados: any[] = []; // Lista filtrada para mostrar en la vista

  // Filtros para los datos
  filtros: {
    experiencia: number | null;
    cargo: string;
    genero: string;
    nivelEducativo: string;
    ciudad: string;
    edad: number | null;
  } = {
    experiencia: null,
    cargo: '',
    genero: '',
    nivelEducativo: '',
    ciudad: '',
    edad: null,
  };

  // Opciones de selección
  nivelesEducativos: string[] = [
    'Bachillerato',
    'Técnico',
    'Tecnólogo',
    'Profesional',
    'Posgrado',
  ];
  generos: string[] = ['Masculino', 'Femenino', 'Otro'];

  private http = inject(HttpClient);

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  obtenerRegistros(): void {
    this.http.get<any[]>('/api/excel/data').subscribe({
      next: (data) => {
        this.registros = data;
        this.registrosFiltrados = data; // Inicializa los registros filtrados con todos los datos
      },
      error: (err) => {
        console.error('Error al obtener los registros:', err);
      },
    });
  }

  aplicarFiltros(): void {
    this.registrosFiltrados = this.registros.filter((registro) => {
      return (
        (!this.filtros.experiencia || registro.experiencia >= this.filtros.experiencia) &&
        (!this.filtros.cargo || registro.cargo.toLowerCase().includes(this.filtros.cargo.toLowerCase())) &&
        (!this.filtros.genero || registro.genero === this.filtros.genero) &&
        (!this.filtros.nivelEducativo || registro.nivelEducativo === this.filtros.nivelEducativo) &&
        (!this.filtros.ciudad || registro.ciudad.toLowerCase().includes(this.filtros.ciudad.toLowerCase())) &&
        (!this.filtros.edad || registro.edad >= this.filtros.edad)
      );
    });
  }

  limpiarFiltros(): void {
    this.filtros = {
      experiencia: null,
      cargo: '',
      genero: '',
      nivelEducativo: '',
      ciudad: '',
      edad: null,
    };
    this.aplicarFiltros();
  }
}
