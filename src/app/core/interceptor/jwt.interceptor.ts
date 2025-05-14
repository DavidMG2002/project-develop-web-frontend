import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly authenticationService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    const token = sessionStorage.getItem('accessToken');

    if (token) { // validacion donde se clona la solicituda para colocarle un encabezado con el token a cada petición, se debe clonar para poderla modificar ya que el token es inmutable
      req = req.clone({ 
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}

// Garantiza que se agregue el token JWT a todas las peticiones, continua la peticion si todo esta bien