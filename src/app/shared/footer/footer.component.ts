import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CashbackTermsComponent } from '../cashback-terms/cashback-terms.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openTermes(){
    const modalRef = this.modalService.open(CashbackTermsComponent, { size: 'xxl' });
  }

}
