// Importación de módulos necesarios para realizar solicitudes HTTP en Angular.
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '@core/models/config'; // URL base de los servicios.
import { Observable } from 'rxjs'; // Manejo de respuestas asincrónicas con observables.

@Injectable({
  providedIn: 'root' // Indica que el servicio estará disponible globalmente en la aplicación.
})
export class UsersService { // Servicio para gestionar operaciones relacionadas con usuarios.

  urlBaseServices: string = URL_SERVICIOS; // Definición de la URL base para las solicitudes.

  constructor(private readonly http: HttpClient) { } // Inyección del servicio HttpClient para realizar solicitudes HTTP.

  /**
   * Crea un usuario enviando los datos al servidor.
   * @param userData Datos del usuario a crear.
   * @returns Observable con la respuesta del servidor.
   */
  createUser(userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/create`;
    return this.http.post<any>(endpoint, userData);
  }

  /**
   * Actualiza un usuario por su ID.
   * @param userId ID del usuario a actualizar.
   * @param userData Nuevos datos del usuario.
   * @returns Observable con la respuesta del servidor.
   */
  updateUser(userId: number, userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/update/${userId}`;
    return this.http.put<any>(endpoint, userData); // ⚠️ Antes estaba como "delete", ahora corregido a "put".
  }

  /**
   * Elimina un usuario por su ID.
   * @param userId ID del usuario a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  deleteUser(userId: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/delete/${userId}`; // ⚠️ Se corrigió la URL que antes usaba "create".
    return this.http.delete<any>(endpoint);
  }

  /**
   * Obtiene la lista de usuarios filtrados por administrador.
   * @param filters Opcionales para filtrar por nombre y correo electrónico.
   * @returns Observable con la lista de usuarios.
   */
  getAllUserByAdministrator(filters?: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users`;
    const params = new HttpParams({ fromObject: {
      nombre: filters?.name || '',
      email: filters?.email || ''
    } });
    return this.http.get<any>(endpoint, { params });
  }

  /**
   * Obtiene la lista de administradores.
   * @returns Observable con la lista de administradores.
   */
  getAllAdministrator(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/1`;
    return this.http.get<any>(endpoint);
  }

  /**
   * Obtiene la lista de usuarios que no son administradores.
   * @returns Observable con la lista de usuarios estándar.
   */
  getAllUsers(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/2`;
    return this.http.get<any>(endpoint);
  }
  
}

