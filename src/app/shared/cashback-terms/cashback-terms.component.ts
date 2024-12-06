import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TermsService } from 'src/app/services/terms/terms.service';

@Component({
  selector: 'app-cashback-terms',
  templateUrl: './cashback-terms.component.html',
  styleUrls: ['./cashback-terms.component.css']
})
export class CashbackTermsComponent implements OnInit {
  terms;
  constructor(private termsServ: TermsService, private activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    this.getTerms()
  }

  getTerms(){
    this.termsServ.getTerms().subscribe((res: any) => {
      this.terms = res.data
    })
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

}
