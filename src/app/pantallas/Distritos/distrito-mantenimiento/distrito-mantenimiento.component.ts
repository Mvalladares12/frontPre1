import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {PrincipalService} from '../../../servicios/principal.service';

@Component({
  selector: 'app-distrito-mantenimiento',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './distrito-mantenimiento.component.html',
  styleUrl: './distrito-mantenimiento.component.css'
})
export class DistritoMantenimientoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private principalService = inject(PrincipalService);

  distritoForm!: FormGroup;
  isEditMode = false;
  distritoId: number | null = null;
  isLoading = false;

  // Lista para el select de municipios
  municipios: any[] = [];

  ngOnInit(): void {
    this.initForm();
    this.cargarMunicipios();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && idParam !== 'nuevo') {
      this.isEditMode = true;
      this.distritoId = Number(idParam);
      this.cargarDistrito(this.distritoId);
    }
  }

  private initForm(): void {
    this.distritoForm = this.fb.group({
      idMunicipio: [null, [Validators.required]],
      codigo: ['', [Validators.required, Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.maxLength(150)]]
    });
  }

  private cargarMunicipios(): void {
    this.principalService.getMunicipios().subscribe(response => {
      this.municipios = response;
    })
  }

  private cargarDistrito(id: number): void {
    this.isLoading = true;
    this.principalService.getDistrito(id).subscribe(distrito => {
      this.distritoForm.patchValue(distrito);
      this.isLoading = false;
    })
  }

  guardar(): void {
    if (this.distritoForm.invalid) {
      this.distritoForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const payload = {
      ...this.distritoForm.value,
      ...(this.isEditMode && { id: this.distritoId })
    };

    const request$ = this.isEditMode
      ? this.principalService.actualizarDistrito( payload)
      : this.principalService.crearDistrito(payload);

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
    this.router.navigate(['/distrito']);
  }
}
