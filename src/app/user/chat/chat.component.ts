import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { AuthService } from 'src/app/core/services/auth.service';
import io from 'node_modules/socket.io-client/dist/socket.io';
import { environment } from 'src/environments/environment';
import { SocketService } from 'src/app/core/services/socket.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  socket: io.Socket;
  SOC_URL = environment.socketUrl;
  isLoggedIn = false;
  username;
  outMessages;
  message: string;
  listMessages = [];

  scrollTo: any;
  mlength: any;
  idUser: any;
  constructor(
    private authServ: AuthService,
    private socketServ: SocketService
  ) {
    this.authServ.castId.subscribe((res: any) => {
      this.idUser = res;
    });
  }
  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser');
    this.socketServ.connect();

    if (this.idUser) {
      // this.socket.emit('GetMessages', { 'id': this.idUser });
      this.socketServ.getMesgs(this.idUser)
      this.socketServ.getMessage.subscribe((data) => {
        this.listMessages = data;
        
        setTimeout(() => {
          this.scrollToBottom();
        }, 800)
      }, (error) => {
      }, () => {
      })

      this.socketServ.sendMessage.subscribe((msg: any) => {
        this.listMessages = msg;
        setTimeout(() => {
          this.scrollToBottom();
        }, 800)
      })

      this.socketServ.newMessage.subscribe((data) => {
        
        
        this.listMessages = data;
        setTimeout(() => {
          this.scrollToBottom();
        }, 800)
      })
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  send(message) {
    this.message = message;
    if (message != undefined && message != '') {
      this.socketServ.sendMessageSoc(this.idUser,this.message,this.username)
      this.message = ""

      setTimeout(() => {
        this.scrollToBottom();
      }, 1000)
    }
  }

}
