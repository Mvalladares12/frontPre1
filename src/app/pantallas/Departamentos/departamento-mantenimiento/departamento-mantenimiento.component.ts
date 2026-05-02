import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PrincipalService} from '../../../servicios/principal.service';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-departamento-mantenimiento',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './departamento-mantenimiento.component.html',
  styleUrl: './departamento-mantenimiento.component.css'
})
export class DepartamentoMantenimientoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private principalService = inject(PrincipalService);

  departamentoForm!: FormGroup;
  isEditMode = false;
  departamentoId: number | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.initForm();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && idParam !== 'nuevo') {
      this.isEditMode = true;
      this.departamentoId = Number(idParam);
      this.cargarDepartamento(this.departamentoId);
    }
  }

  private initForm(): void {
    this.departamentoForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(5)]],
      nombre: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  private cargarDepartamento(id: number): void {
    this.isLoading = true;
    // Simulación de carga:
    this.principalService.getDepartamento(id).subscribe({
      next: (data) => {
        this.departamentoForm.patchValue(data);
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  guardar(): void {
    if (this.departamentoForm.invalid) {
      this.departamentoForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    // Agregamos el ID al payload solo si es edición
    const payload = {
      ...this.departamentoForm.value,
      ...(this.isEditMode && { id: this.departamentoId })
    };

    const request$ = this.isEditMode
      ? this.principalService.actualizarDepartamento(payload)
      : this.principalService.crearDepartamento(payload);

    request$.subscribe({
      next: () => {
        this.isLoading = false;
        this.volver();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  volver(): void {
    this.router.navigate(['/departamento']);
  }
}
