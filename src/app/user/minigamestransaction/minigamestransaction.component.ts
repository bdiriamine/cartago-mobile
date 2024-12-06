import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Observer } from 'rxjs';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';

@Component({
  selector: 'app-minigamestransaction',
  templateUrl: './minigamestransaction.component.html',
  styleUrls: ['./minigamestransaction.component.css']
})
export class MinigamestransactionComponent implements OnInit {

  closeResult = '';
  idUser
  transaction: any
  pageSize;


  BOL: boolean = false;
  transactions: any;
  zindex = 1;
  UserPlayer: any;
  lengthdata: number;
  page = 0
  totalPages;

  constructor(
    private transactionServ: TransactionsService) {
    this.idUser = localStorage.getItem("idUser")
    this.getdTicketsPlayer()
  }

  ngOnInit(): void {
  }

  getdTicketsPlayer() {
    this.transactionServ.getTransactionMini(this.idUser).subscribe((res: any) => {
      this.lengthdata = res.data.items.length;

      if (res) {
        this.BOL = true;
        this.transactions = res.data.items;
        this.totalPages = res.data.totalPages
        this.arraytotal = this.counter(this.totalPages)
        this.transactions.forEach(element => {
          element.createdAt = new Date(element.createdAt)
        });
      } else {
        this.BOL = false;
      }
    })

  }
  getdTicketsPlayerPage(page) {

    this.page = page;
    this.transactionServ.getTransictionsByPageMini(this.idUser, page, 10).subscribe((res: any) => {
      this.lengthdata = res.data.items.length;
      if (res) {
        this.BOL = true;
        this.transactions = res.data.items;
        this.transactions.forEach(element => {
          element.createdAt = new Date(element.createdAt)
        });
      } else {
        this.BOL = false;
      }
    })
  }
  backTo() {
    this.zindex = this.zindex - 1
    this.page = this.page - 1

    if (this.page < 0) {
      this.zindex = 0
      this.page = 0
    }

    this.transactionServ.getTransictionsByPageMini(this.idUser, this.page, 10).subscribe((res: any) => {
      if (res) {
        this.BOL = true;
        this.transactions = res.data.items;

        this.transactions.forEach(element => {
          element.createdAt = new Date(element.createdAt)
        });
      } else {
        this.BOL = false;
      }
    })
  }

  arraytotal = []
  counter(totalPages: number) {
    return new Array(totalPages);
  }

  nextTo() {

    if (this.zindex < this.totalPages) {

      this.zindex = this.zindex + 1
      this.page = this.page + 1
    }
    this.transactionServ.getTransictionsByPageMini(this.idUser, this.page, 10).subscribe((res: any) => {
      if (res) {
        this.BOL = true;
        this.transactions = res.data.items;
        this.transactions.forEach(element => {
          element.createdAt = new Date(element.createdAt)
        });


      } else {
        this.BOL = false;
      }
    })
  }
}
