import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userId;
  userForm: FormGroup;
  user = {
    "phone": '',
    'adress': ''
  }
  constructor(
    private userServ: UserService,
    private modalService: NgbModal,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      username: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl('', Validators.email),
      country: new FormControl(''),
      phone: new FormControl('', [Validators.min(8)]),
      cin: new FormControl(''),
      adress: new FormControl('')
    })

    this.getUser();
  }

  getUser() {
    this.userId = localStorage.getItem('idUser')
    this.userServ.getUser(this.userId).subscribe((res: any) => {
      this.userForm.controls['username'].setValue(res.data['username']);
      this.userForm.controls['firstname'].setValue(res.data['firstname']);
      this.userForm.controls['lastname'].setValue(res.data['lastname']);
      this.userForm.controls['email'].setValue(res.data['email']);
      this.userForm.controls['country'].setValue(res.data['country']);
      this.userForm.controls['phone'].setValue(res.data['phone']);
      this.userForm.controls['cin'].setValue(res.data['cin']);
      this.userForm.controls['adress'].setValue(res.data['adress']);
    })
  }

  editProfile() {
    this.user.phone = this.userForm.controls['phone'].value
    this.user.adress = this.userForm.controls['adress'].value

    this.userServ.editProfile(localStorage.getItem('idUser'), this.user).subscribe((res: any) => {
      this.getUser();
      this.toastrService.success(res.message, 'Success');
    })
  }

  openModal() {
    const modalRef = this.modalService.open(ChangePasswordComponent, { size: 'xxl', centered: true });

    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

}
