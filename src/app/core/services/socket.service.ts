import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import io from 'node_modules/socket.io-client/dist/socket.io';
import { Maintain } from '../models/Maintain';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // private status = new BehaviorSubject<boolean>(false);
  statusSC: Maintain;
  // site = false;
  // casino = false;

  private solde = new BehaviorSubject<boolean>(false);
  soldeSC = this.solde.asObservable();
  sold: any
  bolqService: any
  socket: io.Socket;
  SOC_URL = environment.socketUrl;

  myOBStatus = Observable.create((observer: Observer<any>) => {
    this.socket.on('status', function (data: Maintain) {
      observer.next(data)

      // this.casino = data.casino;
      // this.site = data.site
    });
  })

  myOBSolde = Observable.create((observer: Observer<any>) => {
    this.socket.on('balance', function (data: any) {
      observer.next(data)
      this.score = data.balance
      this.cashback = data.cashback
      this.bloque = data.blocked
    });
  })
  newMessage = new Observable((observer: Observer<any>) => {
    this.socket.on('NewMessage', function (data: any) {
      this.listMessages.push(data);
      observer.next(this.listMessages)
    });
  })

  sendMessage = new Observable((observer: Observer<any>) => {
    this.socket.on('SendMessage', function (data: any) {
      this.getMessage.subscribe((d) => {
        this.listMessages = d;
      })
      observer.next(data)
    });
  })

  getMessage = new Observable((observer: Observer<any>) => {
    this.socket.on('messages', function (data: any) {
      this.listMessages = data;
      observer.next(data)
    });
  })

  listMessages = [];
  blocked = new Subject();

  constructor(private authServ: AuthService) { }

  updateBlock(val: boolean) {
    this.blocked.next(val)
  }

  connect() {
    this.socket = io.connect(this.SOC_URL, { 'forceNew': true });
  }

  getBalance(fp, idUser) {
    this.socket.emit('Getbalance', { 'id': idUser, 'finger_print': fp });
    this.myOBSolde.subscribe((data: any) => {
      this.sold = data.balance
      this.soldeSC = data
    });
  }

  getStatus() {
    this.socket.emit('status', { 'id': 'status' });
    this.myOBStatus.subscribe((data: Maintain) => {
      this.statusSC = data
      this.authServ.InMaintenance.next(data.site);
      this.authServ.sportMaintain.next(data.sport);
      this.authServ.casinoMaintain.next(data.casino);
      this.authServ.miniGamesMaintain.next(data.mini_games);

      this.authServ.sportMaintain.subscribe( res => {
        if (data.sport) {
          localStorage.setItem('Maint', 'sport')
        } else {
          localStorage.setItem('Maint', 'sportFree')
        }
      })
      

    });

  }

  getMesgs(idUser) {
    this.socket.emit('GetMessages', { 'id': idUser });
  }

  sendMessageSoc(idUser, message, username) {
    this.socket.emit('SendMessage', { 'id': idUser, 'message': message, 'username': username });
  }

}
