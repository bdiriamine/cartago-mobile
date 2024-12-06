import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.css']
})
export class TermsModalComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private userServ: UserService,
    private authServ: AuthService,
    private toastrService: ToastrService,
    private route: Router,
    private translatServ: TranslateService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  userResponse(resp) {
    if (resp == 'true') {
      this.userServ.termsAcceptance(localStorage.getItem('name'), true).subscribe((res: any) => {
        if (res) {
          this.toastrService.success(this.translate('Thanks for your trust :)'), 'Success');
          this.route.navigate(['/']);
          this.closeModal();
        }
      })

    } else {
      localStorage.getItem('name')
      this.userServ.termsAcceptance(localStorage.getItem('name'), false).subscribe((res: any) => {
        this.route.navigate(['/']);
        this.authServ.logout();
        this.closeModal();
        this.toastrService.warning(this.translate('Sorry, your account will desactivated'), 'Warning');
      });
    }
  }

  private translate(txt: string): string {
    return this.translatServ.instant(txt);
  }

}
