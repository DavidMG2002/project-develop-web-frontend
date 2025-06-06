//importa modulos necesarios de angular y librerias externas
import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators, ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

//importa servicio de proyectos
import { ProjectService } from '../../services/projects/projects.service';

//importa libreria sweetalert para alertas visuales
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-create-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-create-project.component.html',
  styleUrls: ['./modal-create-project.component.scss']
})
export class ModalCreateProjectComponent implements OnInit {
  formCreateProject!: FormGroup;
  administrador_idList: any[] = []; // <-- Add this

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, //datos inyectados al abrir el modal
    private readonly _formBuilder: FormBuilder, //constructor de formularios
    private readonly _projectService: ProjectService, //servicio para gestionar proyectos
    private readonly dialogRef: MatDialogRef<ModalCreateProjectComponent>, //referencia al modal
    private readonly _snackBar: MatSnackBar, //componente para mostrar mensajes
  ) {}

  ngOnInit(): void {
    this.createFormProject();
    this.getAllAdministrator(); 
  }

  getAllAdministrator() {
    this._projectService.getAllAdministrator().subscribe({
      next: (res) => {
        // Filter users with administrator role (adjust 'rol_id' as needed)
        this.administrador_idList = (res.users || res.data || res).filter((user: any) => user.rol_id === 1);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  createFormProject(): void {
    this.formCreateProject = this._formBuilder.group({
      // Validaciones comentadas para pruebas
      nombre: [''], // [Validators.required]
      descripcion: [''], // [Validators.required]
      administrador_id: [null] // [Validators.required]
    });
  }

  onSubmit() {
    // Validación comentada para pruebas
    // if (this.formCreateProject.invalid) {
    //   Swal.fire('Error', 'Por favor completa todos los campos', 'error');
    //   return;
    // }

    //estructura los datos del formulario
    const projectDataInformation = {
      nombre: this.formCreateProject.get('nombre')?.value,
      descripcion: this.formCreateProject.get('descripcion')?.value,
      administrador_id: this.formCreateProject.get('administrador_id')?.value
    };

    //envia los datos al backend para crear el proyecto
    this._projectService.createProject(projectDataInformation).subscribe({
      next: (response) => {
        //muestra un mensaje de exito con el nombre del administrador
        const admin = this.administrador_idList.find(admin => admin.id === projectDataInformation.administrador_id);
        if (admin) {
          response.message = `Proyecto creado exitosamente para ${admin.nombre}`;
        } else {
          response.message = 'Proyecto creado exitosamente';
        }
        console.log('Datos enviados:', projectDataInformation);
        this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.formCreateProject.reset();
        this.dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error.error?.result || 'Ocurrio un error inesperado. Por favor, intenta nuevamente.';
        this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }

  validateDates() {
    //valida que la fecha de inicio no sea posterior a la fecha fin
    const fechaInicio = new Date(this.formCreateProject.get('fecha_inicio')?.value);
    const fechaFin = new Date(this.formCreateProject.get('fecha_fin')?.value);
    
    if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
      this.formCreateProject.get('fecha_fin')?.setErrors({ invalidDateRange: true });
    } else {
      // Si no hay error en las fechas, verificamos si hay otros errores
      const currentErrors = this.formCreateProject.get('fecha_fin')?.errors;
      if (currentErrors) {
        delete currentErrors['invalidDateRange'];
        // Si no quedan errores, establecemos null
        this.formCreateProject.get('fecha_fin')?.setErrors(
          Object.keys(currentErrors).length ? currentErrors : null
        );
      }
    }
  }
}