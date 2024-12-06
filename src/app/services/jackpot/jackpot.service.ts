import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JackpotService {

  constructor(private http: HttpClient) { }
  
  getJackpots(){
    return this.http.get("https://admin.gapi.lol/api/get/global/jackpot?api_id=mo9TroBDUKFqkrPvfu2zRGx5JuOJf1Ae&api_key=gHoYN4LEomGO5IZdcBFfqj71ugWnjy4R&hash=0005a270-7fd0-45ca-a6c8-0b754028d565");
  }

  getJackpotWinner(){
    return this.http.get(environment.apiUrl + 'jackpot_winners');
  }
}
