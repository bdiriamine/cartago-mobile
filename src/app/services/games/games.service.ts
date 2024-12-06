import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  getCasiinoGames(page, pageSize, name, category, provider) {
    if ((name != '') || (category != '') || (provider != '')) {
      return this.http.get(environment.apiUrl + 'games?' + '&page=' + page + '&name=' + name + '&category=' + category + '&provider=' + provider + '&live=0');
    } else {
      return this.http.get(environment.apiUrl + 'games?&size=' + pageSize + '&page=' + page + '&live=0');
    }
  }

  getProvider(live) {
    return this.http.get(environment.apiUrl + 'game/providers?live=' + live);
  }

  openGame(id, game) {
    return this.http.post(environment.apiUrl + 'game/open', {
      "type": 2,
      "game": game,
      "client_type": "mobile",
      "user_id": id
    });
  }

  openGapiGame(id, menuTitle) {
    return this.http.post(environment.apiUrl + 'game/open', {
      "type": 1,
      "game": menuTitle,
      "login": id
    });
  }

  openSmartSoftGame(category, game) {
    return this.http.post(environment.apiUrl + 'game/open', {
      "type": 4,
      "game": game,
      "category": category
    });
  }

  getAllCategory() {
    return this.http.get(environment.apiUrl + 'game/categorys');
  }

  getJackpotGames() {
    return this.http.get(environment.apiUrl + 'jackpot_games');
  }

  getTopGames() {
    return this.http.get(environment.apiUrl + 'top_games');
  }

  getLiveCasinoGames(page, pageSize, name, category, provider) {
    if ((name != '') || (category != '') || (provider != '')) {
      return this.http.get(environment.apiUrl + 'games?size=' + pageSize + '&live=1' + '&page=' + page + '&name=' + name + '&category=' + category + '&provider=' + provider);
    } else {
      return this.http.get(environment.apiUrl + 'games?size=' + pageSize + '&live=1' + '&page=' + page);
    }
  }
   getopenGameiq(game_id ) {
    let  tk = localStorage.getItem("accessToken");
   let idConToint= Number(game_id)
     return this.http.post('https://apihost.carthagobet.tn/api/game/open', {
       'game_id': idConToint,
       'client_type': "mobile",
       'token': tk,
       "website": "carthago"
     });
 
   }
  getGamesVirtuel(page, provider) {
    if (provider) {
      return this.http.get(environment.apiUrl + 'games?page=' + page + '&provider=' + provider + '&size=' + 50 + "&virtual=true");
    } else {
      return this.http.get(environment.apiUrl + 'games?page=' + page + '&size=' + 50 + "&virtual=true");
    }
  }

  getVirtualProvider() {
    return this.http.get(environment.apiUrl + "virtual/providers")
  }

  getHomeGames(isLive: number){
    return this.http.get(environment.apiUrl + 'games?&live=' + isLive + '&home=1')
  }
}
