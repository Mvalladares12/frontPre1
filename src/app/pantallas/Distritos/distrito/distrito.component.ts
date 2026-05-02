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
import {Distrito} from '../../../modelos/distrito';
import {HasRolesDirective} from 'keycloak-angular';
import {TieneRolDirective} from "../../../core/directive/appTieneRol";
import {Router} from '@angular/router';

@Component({
  selector: 'app-distrito',
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
  templateUrl: './distrito.component.html',
  standalone: true,
  styleUrl: './distrito.component.css'
})
export class DistritoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codigo', 'nombre', 'idMunicipio', 'acciones'];
  dataSource: MatTableDataSource<Distrito>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private principalService: PrincipalService,
              private route: Router,) {
    this.dataSource = new MatTableDataSource<Distrito>([]);
  }

  ngOnInit(): void {
    this.cargarDistritos();
  }

  cargarDistritos(): void {
    this.principalService.getDistritos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error cargando distritos:', error);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: Distrito, filter: string) => {
      const searchStr = (data.nombre + data.codigo + data.idMunicipio).toLowerCase();
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

  verDetalles(distrito: Distrito) {
    console.log('Ver detalles:', distrito);
  }

  editarDistrito(distrito: Distrito) {
    this.route.navigate(['/distrito/mantenimiento',distrito.id]);
  }

  eliminarDistrito(distrito: Distrito) {
    console.log('Eliminar:', distrito);
  }

  crearDistrito() {
    this.route.navigate(['/distrito/mantenimiento','nuevo']);
  }
}
