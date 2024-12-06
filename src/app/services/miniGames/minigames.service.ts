import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MinigamesService {
  url=environment.apiUrl+"mini_games"
  constructor(private http: HttpClient) { }
  getfbgames(){
    return this.http.get(this.url);
  }
  openGamefiable(urlGame) {
    return this.http.post(environment.apiUrl + 'game/open', {
      'game_url': urlGame,
      'type': 5,
      "device": "mobile"
    });
  }
}
