import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getTransaction(id) {
    return this.http.get(environment.apiUrl + 'transactions?player_id=' + id);
  }

  getTransictionsByPage(id,page, pageSize) {
    return this.http.get(environment.apiUrl + 'transactions?player_id=' + id + '&page=' + page + '&size=' + pageSize);
  }
  getTransactionMini(id) {
    return this.http.get(environment.apiUrl + 'mini_transactions?player_id=' + id);
  }
  getTransictionsByPageMini(id,page, pageSize) {
    return this.http.get(environment.apiUrl + 'mini_transactions?player_id=' + id + '&page=' + page + '&size=' + pageSize);
  }

  cashback(token){
   return this.http.post(environment.apiUrl + 'cashback', {'token': token});
  }

  getCasinoHistory(id){
    return this.http.get(environment.apiUrl + 'tickets?player_id=' + id);

  }

  getCasinoHistoryByPage(id, page, pageSize){
    return this.http.get(environment.apiUrl + 'tickets?player_id=' + id + '&page=' + page + '&size=' + pageSize);

  }
}
