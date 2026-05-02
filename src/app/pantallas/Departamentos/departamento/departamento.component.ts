import {Component, OnInit, ViewChild} from '@angular/core';
import {PrincipalService} from '../../../servicios/principal.service';
import {
  MatTableDataSource, MatTableModule
} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatChipsModule} from '@angular/material/chips';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Departamento, MunicipioDepartamento} from '../../../modelos/departamento';
import {HasRolesDirective} from 'keycloak-angular';
import {TieneRolDirective} from '../../../core/directive/appTieneRol';
import {Router} from '@angular/router';

@Component({
  selector: 'app-departamento',
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
    HasRolesDirective,
    TieneRolDirective,
    MatButton
  ],
  templateUrl: './departamento.component.html',
  standalone: true,
  styleUrl: './departamento.component.css'
})
export class DepartamentoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'acciones'];
  dataSource: MatTableDataSource<Departamento>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private principalService: PrincipalService,
              private route: Router,) {
    this.dataSource = new MatTableDataSource<Departamento>([]);
  }

  ngOnInit(): void {
    this.cargarDepartamentos();
  }

  cargarDepartamentos(): void {
    this.principalService.getDepartamentos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error cargando departamentos:', error);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Configurar filtro personalizado
    this.dataSource.filterPredicate = (data: Departamento, filter: string) => {
      const searchStr = (data.nombre + data.codigo).toLowerCase();
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

  getMunicipiosNombres(municipios: MunicipioDepartamento[]): string {
    return municipios.map(m => m.nombre).join(', ');
  }

  getMunicipiosCount(municipios: MunicipioDepartamento[]): number {
    return municipios.length;
  }

  verDetalles(departamento: Departamento) {
    console.log('Ver detalles:', departamento);
  }

  editarDepartamento(departamento: Departamento) {
    this.route.navigate(['/departamento/mantenimiento',departamento.id]);
  }

  eliminarDepartamento(departamento: Departamento) {
    console.log('Eliminar:', departamento);
  }

  crearDepartamento() {
    this.route.navigate(['/departamento/mantenimiento','nuevo']);
  }
}
