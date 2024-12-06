import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  passwordForm = {
    'old_password':'',
    'new_password' :''
  }
  constructor(
    private activeModal: NgbActiveModal, 
    private userServ: UserService,
    private toastrService: ToastrService,
    private translatServ: TranslateService
    ) { }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      old_password: new FormControl('', [Validators.required]),
      new_password: new FormControl('', [Validators.required])
    })
  }

  closeModal() {
   this.activeModal.close()
  }

  changePassword(){
    this.passwordForm.old_password = this.changePasswordForm.controls['old_password'].value
    this.passwordForm.new_password = this.changePasswordForm.controls['new_password'].value

    this.userServ.changePassword(localStorage.getItem('idUser'), this.passwordForm).subscribe((res: any) => {
     this.toastrService.success(res.message , 'Success')
      this.closeModal();
    }, (error) =>{
      this.toastrService.error(this.translate('Oops, something went wrong please try again') , 'Error')
    })
  }

  private translate(txt: string): string {
    return this.translatServ.instant(txt);
  }

}
