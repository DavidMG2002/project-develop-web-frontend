import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '@core/models/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  //almacena la url base de los servicios
  urlBaseServices: string = URL_SERVICIOS;

  constructor(private readonly http: HttpClient) {}

  createProject(projectData: any): Observable<any> {
    //crea un nuevo proyecto con los datos proporcionados
    const endpoint = `${this.urlBaseServices}/api/v1/projects/create`;
    return this.http.post<any>(endpoint, projectData);
  }

  updateProject(projectId: number, projectData: any): Observable<any> {
    //actualiza un proyecto existente segun su id
    const endpoint = `${this.urlBaseServices}/api/v1/projects/update/${projectId}`;
    return this.http.put<any>(endpoint, projectData);
  }

  deleteProject(projectId: number): Observable<any> {
    //elimina un proyecto segun su id
    const endpoint = `${this.urlBaseServices}/api/v1/projects/delete/${projectId}`;
    return this.http.delete<any>(endpoint);
  }

  getAllAdministrator(): Observable<any> {
    //obtiene todos los usuarios con rol de administrador
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/1`;
    return this.http.get<any>(endpoint);
  }

  getAllProjects(filters?: any): Observable<any> {
    //obtiene todos los proyectos aplicando filtros opcionales
    const endpoint = `${this.urlBaseServices}/api/v1/projects`;
    const params = new HttpParams({ fromObject: {
      nombre: filters?.nombre || '',
      descripcion: filters?.descripcion || '',
      administrador_id: filters?.administrador_id || '',
      fecha_creacion: filters?.fecha_creacion || ''
    }});
    return this.http.get<any>(endpoint, { params });
  }

  getProjectById(projectId: number): Observable<any> {
    //obtiene un proyecto especifico por su id
    const endpoint = `${this.urlBaseServices}/api/v1/projects/${projectId}`;
    return this.http.get<any>(endpoint);
  }

  getProjectsByUser(userId: number): Observable<any> {
    // Returns projects where the user is the administrator
    const endpoint = `${this.urlBaseServices}/api/v1/projects?administrador_id=${userId}`;
    return this.http.get<any>(endpoint);
  }

  getAssignedUsers(projectId: number): Observable<any> {
    // Obtiene todos los usuarios asignados a un proyecto específico
    const endpoint = `${this.urlBaseServices}/projects/${projectId}/users`;
    return this.http.get<any>(endpoint);
  }

  removeUserFromProject(projectId: number, userId: number): Observable<any> {
  // Remueve un usuario específico de un proyecto
  const endpoint = `${this.urlBaseServices}/projects/${projectId}/users/${userId}`;
  return this.http.delete<any>(endpoint);
}
}