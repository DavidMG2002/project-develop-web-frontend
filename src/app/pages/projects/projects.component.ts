// Importación de módulos y librerías necesarias de Angular y Angular Material
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ModalAssignUsersProjectsComponent } from '../modal-assign-users-projects/modal-assign-users-projects.component';
import { ModalCreateProjectComponent } from '../modal-create-project/modal-create-project.component';
//import { ModalDeleteProjectComponent } from '../modal-delete-project/modal-delete-project.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProjectService } from 'app/services/projects/projects.service';
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core'; 

// Definición de la interfaz para representar un proyecto
interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  totalUsers: number;
  admin: string;
}

// Declaración del componente Angular
@Component({
  selector: 'app-projects', // Identificador del componente
  standalone: true, // Indica que el componente no depende de un módulo global
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatTableModule, 
    BreadcrumbComponent, 
    MatProgressSpinnerModule, 
    MatPaginatorModule
  ],
  templateUrl: './projects.component.html', // Ruta de la plantilla HTML del componente
  styleUrl: './projects.component.scss' // Ruta de los estilos CSS del componente
})
export class ProjectsComponent implements OnInit {
  // Declaración de variables para almacenar proyectos y filtros
  projects: Project[] = []; // Lista de proyectos
  filteredProjects: Project[] = []; // Lista de proyectos filtrados
  searchName: string = ''; // Término de búsqueda para proyectos
  selectedProject: Project | null = null; // Proyecto seleccionado
  isLoading = false; // Estado de carga

  // Definición de las columnas que se mostrarán en la tabla
  displayedColumns: string[] = [
    'name',
    'description',
    'createdAt',
    'totalUsers',
    'admin',
    'actions'
  ];

  // Configuración de la tabla
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  usersList: any[] = []; // Lista de usuarios disponibles para asignar
  adminList: any[] = []; // Lista de administradores disponibles

  breadscrums = [
    {
      title: 'Gestión de proyectos',
      items: [],
      active: 'Datos básicos'
    },
  ];

  // Formulario para filtrar proyectos
  projectFilterForm!: FormGroup;

  // Función para manejar identificadores de elementos en listas
  trackByFn(index: number, item: any): any {
    return item?.id || index;
  }

  breadcrumsDetails = [
    {
      title: '',
    },
  ];

  // Constructor con inyección de dependencias
  constructor(
    private readonly _formBuilder: FormBuilder, // Constructor de formularios
    private readonly projectService: ProjectService, // Servicio para gestión de proyectos
    private readonly dialogModel: MatDialog, // Servicio de Angular Material para modales
    private readonly _snackBar: MatSnackBar // Servicio de Angular Material para notificaciones
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.getAllAdministrators();
    this.getProjectsByUser();
    this.projectFilterForm = this._formBuilder.group({
      name: ['']
    });

    // Escucha cambios en el campo de búsqueda y filtra los proyectos en tiempo real
    this.projectFilterForm.get('name')?.valueChanges.subscribe(value => {
      this.searchName = value;
      this.filterProjects();
    });
  }

  // Método para filtrar proyectos según el término de búsqueda
  filterProjects(): void {
    const term = this.searchName.trim().toLowerCase();
    this.filteredProjects = this.projects.filter(project =>
      project.name.toLowerCase().includes(term)
    );
    this.dataSource.data = this.filteredProjects;
  }

  // Método para obtener la lista de proyectos del usuario
  getProjectsByUser(filters?: any): void {
    this.isLoading = true;
    this.projectService.getProjectsByUser(filters).subscribe({
      next: (response) => {
        // Mapea los datos para estructurarlos en la tabla
        this.projects = (response.projects || []).map((p: any) => {
          const admin = this.adminList.find(a => a.id === p.administrador_id);
          return {
            id: p.id,
            name: p.nombre,
            description: p.descripcion,
            createdAt: p.fecha_creacion,
            totalUsers: p.totalUsers ?? 0,
            admin: admin ? admin.nombre : 'Sin asignar'
          };
        });

        this.filteredProjects = [...this.projects];
        this.dataSource.data = this.filteredProjects;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this._snackBar.open('Error al cargar los proyectos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  // Método para obtener todos los administradores disponibles
  getAllAdministrators(): void {
    this.projectService.getAllAdministrator().subscribe({
      next: (res) => {
        this.adminList = res.users || res.data || res; // Ajusta según la respuesta recibida
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Método para abrir el modal de creación de proyectos
  openModalCreateProject(): void {
    const dialogRef = this.dialogModel.open(ModalCreateProjectComponent, {
      minWidth: '300px', // Ancho mínimo del modal
      maxWidth: '1000px', // Ancho máximo del modal
      width: '840px', // Ancho inicial del modal
      disableClose: true // Evita que el usuario cierre el modal sin completar la acción
    });

    // Se ejecuta cuando el modal se cierra
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProjectsByUser();
      }
    });
  }

  // Método para ver los detalles de un proyecto seleccionado
  viewProjectDetails(project: Project): void {
    this.selectedProject = project;
  }
  
  // Método para añadir un nuevo proyecto a la lista
  addProject(project: Project): void {
    this.projects.push(project);
  }

  // Método para actualizar un proyecto existente
  updateProject(updated: Project): void {
    const idx = this.projects.findIndex(p => p.id === updated.id);
    if (idx > -1) this.projects[idx] = updated;
  }

  // Método para eliminar un proyecto de la lista
  deleteProject(id: number): void {
    this.projects = this.projects.filter(p => p.id !== id);
    if (this.selectedProject?.id === id) this.selectedProject = null;
  }
}
