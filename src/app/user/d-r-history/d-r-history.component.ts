import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-d-r-history',
  templateUrl: './d-r-history.component.html',
  styleUrls: ['./d-r-history.component.css']
})
export class DRHistoryComponent implements OnInit {
  closeResult: string;
  idUser: string;
  username
  depot
  retrait
  transaction: any
  pageSize;

  BOL: boolean = false;
  transactions: any;
  zindex = 1;
  UserPlayer: any;
  lengthdata: number;
  page = 0

  constructor(private userServ: UserService, private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.username = localStorage.getItem("name")
    this.idUser = localStorage.getItem("idUser")

    this.getDepotRetrait()
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.modalService.dismissAll();
    });
  }

  getDepotRetrait() {
    this.userServ.drhistory(this.username).subscribe((res: any) => {
      this.depot = res.data.depot
      this.retrait = res.data.retrait      
    })
  }

}
