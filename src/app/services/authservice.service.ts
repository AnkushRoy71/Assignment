import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterRequestModel, RegisterResponseModel } from '../models/auth.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  httpClient = inject(HttpClient);
  constructor() {}
    
    
  registerUser(
    userData: RegisterRequestModel,
  ): Observable<RegisterResponseModel> {
    return this.httpClient.post<RegisterResponseModel>(
      `${environment.API_URL}/registrations?key=${userData.email}`,
      userData,
    );
  }
}
