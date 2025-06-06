// Importación de módulos de Angular y librerías externas necesarias
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

// Importación del servicio de proyectos para gestionar operaciones relacionadas
import { ProjectService } from '../../services/projects/projects.service';

// Importación de SweetAlert para mostrar alertas visuales interactivas
import Swal from 'sweetalert2';

// Declaración del componente Angular
@Component({
  selector: 'app-modal-create-project', // Identificador del componente
  standalone: true, // Indica que el componente no depende de un módulo
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
  templateUrl: './modal-create-project.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./modal-create-project.component.scss'] // Archivo de estilos del componente
})
export class ModalCreateProjectComponent implements OnInit {
  formCreateProject!: FormGroup; // Declaración del formulario reactivo
  administrador_idList: any[] = []; // Lista de administradores disponibles

  // Constructor con inyección de dependencias
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos inyectados al abrir el modal
    private readonly _formBuilder: FormBuilder, // Constructor de formularios
    private readonly _projectService: ProjectService, // Servicio para gestión de proyectos
    private readonly dialogRef: MatDialogRef<ModalCreateProjectComponent>, // Referencia al modal
    private readonly _snackBar: MatSnackBar, // Servicio para mostrar mensajes emergentes
  ) {}

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.createFormProject(); // Inicializa el formulario
    this.getAllAdministrator(); // Obtiene la lista de administradores disponibles
  }

  // Método para obtener la lista de administradores disponibles
  getAllAdministrator() {
    this._projectService.getAllAdministrator().subscribe({
      next: (res) => {
        // Filtra los usuarios con rol de administrador
        this.administrador_idList = (res.users || res.data || res).filter((user: any) => user.rol_id === 1);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Método para crear y configurar el formulario
  createFormProject(): void {
    this.formCreateProject = this._formBuilder.group({
      nombre: [''], // Campo para el nombre del proyecto
      descripcion: [''], // Campo para la descripción del proyecto
      administrador_id: [null] // Campo para el administrador (opcional)
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    // Estructura los datos del formulario para enviarlos al backend
    const projectDataInformation = {
      nombre: this.formCreateProject.get('nombre')?.value,
      descripcion: this.formCreateProject.get('descripcion')?.value,
      administrador_id: this.formCreateProject.get('administrador_id')?.value
    };

    // Envía los datos al backend para la creación del proyecto
    this._projectService.createProject(projectDataInformation).subscribe({
      next: (response) => {
        // Muestra un mensaje de éxito con el nombre del administrador asignado
        const admin = this.administrador_idList.find(admin => admin.id === projectDataInformation.administrador_id);
        if (admin) {
          response.message = `Proyecto creado exitosamente para ${admin.nombre}`;
        } else {
          response.message = 'Proyecto creado exitosamente';
        }
        console.log('Datos enviados:', projectDataInformation);
        this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.formCreateProject.reset(); // Limpia el formulario
        this.dialogRef.close(true); // Cierra el modal y devuelve un resultado positivo
      },
      error: (error) => {
        // Muestra un mensaje de error en caso de fallo
        const errorMessage = error.error?.result || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
        this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }

  // Método para validar la coherencia de fechas en el formulario
  validateDates() {
    const fechaInicio = new Date(this.formCreateProject.get('fecha_inicio')?.value);
    const fechaFin = new Date(this.formCreateProject.get('fecha_fin')?.value);
    
    if (fechaInicio && fechaFin && fechaInicio > fechaFin) {
      // Si la fecha de inicio es posterior a la fecha de fin, se establece un error
      this.formCreateProject.get('fecha_fin')?.setErrors({ invalidDateRange: true });
    } else {
      // Si no hay error en fechas, verifica otros errores y los limpia si es necesario
      const currentErrors = this.formCreateProject.get('fecha_fin')?.errors;
      if (currentErrors) {
        delete currentErrors['invalidDateRange'];
        this.formCreateProject.get('fecha_fin')?.setErrors(
          Object.keys(currentErrors).length ? currentErrors : null
        );
      }
    }
  }
}
