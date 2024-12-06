import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Observer } from 'rxjs';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.css']
})
export class TransactionsHistoryComponent implements OnInit {

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
    this.transactionServ.getTransaction(this.idUser).subscribe((res: any) => {
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
    this.transactionServ.getTransictionsByPage(this.idUser, page, 15).subscribe((res: any) => {
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

    this.transactionServ.getTransictionsByPage(this.idUser, this.page, 10).subscribe((res: any) => {

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
    this.transactionServ.getTransictionsByPage(this.idUser, this.page, 15).subscribe((res: any) => {
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
