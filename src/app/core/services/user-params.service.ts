import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as CryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserParamsService {
  secretKey = '11eb-b8bc-0242ac130003';
  configList: string;
  game = new BehaviorSubject<boolean>(true);
  gameShow = new BehaviorSubject<boolean>(false);
  virtuel = new BehaviorSubject<boolean>(false);
  jackpot = new BehaviorSubject<boolean>(false);
  miniGames = new BehaviorSubject<boolean>(true);
  sport = new BehaviorSubject<boolean>(true);

  constructor(private authServ: AuthService) {
  }

  updateParams() {

    if (this.authServ.isSignedIn()==false) {
      this.authServ.config_webs.subscribe(w => {
        this.configList = this.decryptData(w);
        
        for (let i = 0; i <= this.configList.length; i++) {
          this.configList = this.configList.replace('"', '')
        }
        const item = this.configList.split(',').slice(0, -1)
        
        if (item.length > 0) {
          item.forEach(elem => {
            if (elem == '010') this.game.next(true); 
            if (elem == '020') this.gameShow.next(true); 
            if (elem == '030') this.virtuel.next(true);
            if (elem == '040') this.jackpot.next(true);
            if (elem == '050') this.miniGames.next(true);
            if (elem == '060') this.sport.next(true); 
          })
        }
      });
    } else {
      this.configList = this.decryptData(localStorage.getItem('config_web'));
      
      for (let i = 0; i <= this.configList.length; i++) {
        this.configList = this.configList.replace('"', '')
      }
      const item = this.configList.trim().split(',').slice(0, -1);
      if (item.length > 0) {
        item.forEach(elem => {
          if (elem == '010') this.game.next(true);
          if (elem == '020') this.gameShow.next(true);
          if (elem == '030') this.virtuel.next(true);
          if (elem == '040') this.jackpot.next(true);
          if (elem == '050') this.miniGames.next(true);
          if (elem == '060') this.sport.next(true);
        })
      }
    }
  }

  decryptData(data) {
    return CryptoJS.AES.decrypt(data, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
