import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Departamento} from '../../../modelos/departamento';
import {PrincipalService} from '../../../servicios/principal.service';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-municipio-mantenimiento',
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule, MatTooltip],
  templateUrl: './municipio-mantenimiento.component.html',
  styleUrl: './municipio-mantenimiento.component.css'
})
export class MunicipioMantenimientoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private principalService = inject(PrincipalService);

  municipioForm!: FormGroup;
  isEditMode = false;
  municipioId: number | null = null;
  isLoading = false;

  departamentos: Departamento[] = [];

  ngOnInit(): void {
    this.initForm();
    this.cargarDepartamentos();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam!='nuevo') {
      this.isEditMode = true;
      this.municipioId = Number(idParam);
      this.cargarMunicipio(this.municipioId);
    }else {
    }
  }

  private initForm(): void {
    this.municipioForm = this.fb.group({
      idDepartam: [null, [Validators.required]],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  private cargarDepartamentos(): void {
    this.principalService.getDepartamentos().subscribe({
      next: (data) => {
        this.departamentos = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando departamentos:', error);
        this.isLoading = false;
      }
    });
  }

  private cargarMunicipio(id:number): void {
    this.isLoading = true;
    this.principalService.getMunicipio(id).subscribe({
      next: (data) => {
        this.municipioForm.patchValue(data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando departamentos:', error);
        this.isLoading = false;
      }
    });
  }

  guardar(): void {
    if (this.municipioForm.invalid) {
      this.municipioForm.markAllAsTouched();
      return;
    }

    let payload = this.municipioForm.value;
    this.isLoading = true;

    if (this.isEditMode) {
      payload={
        ...this.municipioForm.value,
        id: this.municipioId
      }
      this.principalService.actualizarMunicipio(payload).subscribe({
        next: () => {
          this.volver();
        },
        error: () => {}
      });
    } else {
      this.principalService.crearMunicipio(payload).subscribe({
        next: () => {
          this.volver();
        },
        error: () => {}
      });
    }
  }

  volver(): void {
    this.router.navigate(['/municipio']);
  }
}
