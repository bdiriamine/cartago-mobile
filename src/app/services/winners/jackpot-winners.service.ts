import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JackpotWinnersService {

  constructor(private httpClient: HttpClient) { }

  getWinners(){
    return this.httpClient.get(environment.apiUrl + 'top_winners');
  }
}
