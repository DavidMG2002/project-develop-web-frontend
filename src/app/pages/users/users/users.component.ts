import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { matDatepickerAnimations, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource,  MatTableModule } from '@angular/material/table';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersService } from 'app/services/users/users.service';
// import { ModalCreateUserComponent } from 'app/pages/modal-create-user/modal-create-user.component';
import { MatDialog } from '@angular/material/dialog';
// import { ModalEditUsersComponent } from 'app/pages/moda-edit-users/modal-edit-users.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Title } from 'chart.js';
import { ModalCreateUserComponent } from 'app/pages/modal-create-user/modal-create-user/modal-create-user.component';
import { ModalEditUsersComponent } from 'app/pages/modal-edit-users/modal-edit-users/modal-edit-users.component';

export interface User {
  name: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  displayedColumns: string[] = [
    'name',
    'email',
    'role',
    'action'
  ];

  breadscrums = [
    {
      title: 'Gestión de usuarios',
      item: [],
      active: 'Datos básicos',
    },
  ];

  breadscrumsDetails = [
    { 
      title: '',
    },
  ];

  // Table
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  // Search
  userFormSearchFilter!: FormGroup;
  usersList: any[] = [];

  isLoading = false;

  userDefaultFilterSearch: any = {
    name: undefined,
    email: undefined,
  }

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly userService: UsersService,
    private readonly dialogModel: MatDialog,
    private readonly _sanckBar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
    this.createUserFormSearchFilter();
    this.getAllUserByAdministrator();
    this.handleUserFilterChance('name', 'email');
    this.handleUserFilterChance('name', 'email');
  }

 createUserFormSearchFilter() {
    this.userFormSearchFilter = this._formBuilder.group({
      name: [''],
      email: ['']
    });
  }

  // Conversor de los roles 1 y 2 a administrador y usuarios
  getRoleName(rol_id: number): string {
    switch (rol_id) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Usuarios';
      default:
        return 'Desconocido';
    }
  }

  // escucha cambios utiliza dos operadores para hacer la peticion y Actualiza los filtros con lo que esta buscando el usuario
  handleUserFilterChance(controlName: string, filterKey: string) {
    this.userFormSearchFilter.controls[controlName].valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((value: any) => {
      this.userDefaultFilterSearch[filterKey] = value;
      console.log(this.userDefaultFilterSearch);
      this.getAllUserByAdministrator({ ...this.userDefaultFilterSearch, [filterKey]: value });
    });
  }

  getAllUserByAdministrator(filters?: any): void {
    this.isLoading = true;
    this.userService.getAllUserByAdministrator(filters).subscribe({
      next: (response) => {
        this.usersList = response.users;
        this.dataSource.data = response.users;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }
    });
  }

  openModalCreateUser(): void {
    const dialogRef = this.dialogModel.open(ModalCreateUserComponent, {
      minWidth: '300px',
      maxWidth: '1000px',
      width: '820px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllUserByAdministrator();
      }
    })
  }

  openModalUpdateUsers(userIformation: any): void {
    const dialogRef = this.dialogModel.open(ModalEditUsersComponent, {
      minWidth: '300px',
      maxWidth: '1000px',
      width: '820px',
      disableClose: true,
      data: {user: userIformation}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllUserByAdministrator();
      }
    }) 
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        this._sanckBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.getAllUserByAdministrator();
      },
      error: (error) => {
        const errorMessage = error.error?.message || 'Error al eliminar el usuario';
        this._sanckBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }

}
