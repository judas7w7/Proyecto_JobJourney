import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExcelService } from '../../service/excel.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  registros: any[] = [];
  registrosFiltrados: any[] = [];

  filtros = {
    experiencia: null,
    cargo: '',
    genero: '',
    nivelEducativo: '',
    ciudad: '',
    edad: null,
  };

  nivelesEducativos = ['Bachillerato', 'Técnico', 'Tecnólogo', 'Profesional', 'Posgrado'];
  generos = ['Masculino', 'Femenino', 'Otro'];

  private excelService = inject(ExcelService);

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  obtenerRegistros(): void {
    this.excelService.obtenerDatos().subscribe({
      next: (data) => {
        this.registros = data;
        this.registrosFiltrados = data;
      },
      error: (err) => {
        console.error('Error al obtener los registros:', err);
        this.registros = [];
        this.registrosFiltrados = [];
      }
    });
  }

  aplicarFiltros(): void {
    const noHayFiltrosActivos = Object.values(this.filtros).every((valor) => !valor);

    if (noHayFiltrosActivos) {
      this.registrosFiltrados = this.registros;
      return;
    }

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
