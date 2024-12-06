import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TermsService {

  constructor(private http: HttpClient) { }

  getTerms(){
    return this.http.get(environment.apiUrl + 'terms');
  }
}
