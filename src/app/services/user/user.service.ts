import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(id) {
    return this.http.get(environment.apiUrl + 'user/' + id);
  }

  editProfile(id, object) {
    return this.http.put(environment.apiUrl + 'user/' + id, object);
  }

  changePassword(id, object) {
    return this.http.put(environment.apiUrl + 'user/change_password/' + id, object);
  }

  baseUrl = ""
  upload(images: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}users/verif_id`, { images }, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  termsAcceptance(username, resp) {
    return this.http.post(environment.apiUrl + 'accept_decline_terms?username=' + username + '&accepted=' + resp, {});
  }
  drhistory(username) {
    return this.http.get(environment.apiUrl + 'depot_retrait?username=' + username);
  }
}
