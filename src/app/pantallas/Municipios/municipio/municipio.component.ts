import {Component, OnInit, ViewChild} from '@angular/core';
import {PrincipalService} from '../../../servicios/principal.service';
import { MatTableDataSource, MatTableModule
} from '@angular/material/table';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatFormField, MatInputModule, MatLabel} from '@angular/material/input';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatChip, MatChipSet, MatChipsModule} from '@angular/material/chips';
import {CommonModule, NgForOf} from '@angular/common';
import {MatTooltip, MatTooltipModule} from '@angular/material/tooltip';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Distrito, Municipio} from '../../../modelos/principal';
import {TieneRolDirective} from '../../../core/directive/appTieneRol';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-municipio',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatIconButton,
    TieneRolDirective,
    MatButton
  ],
  templateUrl: './municipio.component.html',
  standalone: true,
  styleUrl: './municipio.component.css'
})

export class MunicipioComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'idDepartamento', 'distritos', 'acciones'];
  dataSource: MatTableDataSource<Municipio>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: any;

  constructor(private principalService: PrincipalService,
              private route: Router,) {
    this.dataSource = new MatTableDataSource<Municipio>([]);
  }
  ngOnInit(): void {
    this.cargarMunicipios();
  }

  cargarMunicipios(): void {
    this.principalService.getMunicipios().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error cargando municipios:', error);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Configurar filtro personalizado
    this.dataSource.filterPredicate = (data: Municipio, filter: string) => {
      const searchStr = (data.nombre + data.codigo + data.idDepartam).toLowerCase();
      return searchStr.includes(filter.toLowerCase());
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Método para obtener el nombre de los distritos como string
  getDistritosNombres(distritos: Distrito[]): string {
    return distritos.map(d => d.nombre).join(', ');
  }

  // Método para contar distritos
  getDistritosCount(distritos: Distrito[]): number {
    return distritos.length;
  }

  // Métodos de acción
  verDetalles(municipio: Municipio) {
    console.log('Ver detalles:', municipio);
    // Aquí puedes implementar la lógica para ver detalles
  }

  editarMunicipio(municipio: Municipio) {
    localStorage.setItem('accion','actualizar');
    this.route.navigate(['/municipio/mantenimiento/'+municipio.id]);
  }

  eliminarMunicipio(municipio: Municipio) {
  }

  crearMunicipio() {
    this.route.navigate(['/municipio/mantenimiento','nuevo']);
  }
}
