import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-jackpot-winner',
  templateUrl: './jackpot-winner.component.html',
  styleUrls: ['./jackpot-winner.component.css']
})
export class JackpotWinnerComponent implements OnInit {
  username;
  jackpot;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalService.dismissAll();
  }

}
