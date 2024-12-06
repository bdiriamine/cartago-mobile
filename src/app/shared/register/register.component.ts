import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Stepper from 'bs-stepper';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showPassword = false;
  notMatching: boolean;
  stepper: any;
  currentStep: any;
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  fileInfos: Observable<any>;
  pass;
  confirmPass;

  registerVars = {
    'username': '',
    'firstname': '',
    'lastname': '',
    'email': '',
    'cin': '',
    'country': '',
    'password': '',
    'phone': '',
    'terms': ''
  }

  constructor(
    private authServ: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private readonly elementRef: ElementRef,
    private translatServ: TranslateService
  ) { }

  ngOnInit(): void {

    const stepperEl = this.elementRef.nativeElement.querySelector('#stepper1');
    stepperEl.addEventListener('show.bs-stepper', event => {

      this.currentStep = event.detail.to;
    });

    this.stepper = new Stepper(stepperEl, {
      linear: false,
      animation: true
    });
    const nonWhitespaceRegExp: RegExp = new RegExp("^([A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*)$");

    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(nonWhitespaceRegExp)]),

      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.min(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cin: new FormControl('', [Validators.min(8)]),
      password: new FormControl('', [Validators.required]),
      confirmPass: new FormControl('', [Validators.required,]),
      terms: new FormControl('', [Validators.required]),
      adresse: new FormControl('')
    })
  }

  checkPasswords() {
    this.pass = this.registerForm.controls.password.value;
    this.confirmPass = this.registerForm.controls.confirmPass.value;

    if (this.pass !== this.confirmPass) {
      this.notMatching = true;
      this.toastrService.error(this.translate('Confirm your password'), 'Error');
    } else {
      this.notMatching = false;
    }
  }

  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  register() {
    this.checkPasswords();
    this.registerVars.terms = this.registerForm.controls['terms'].value
    if (!this.notMatching && this.registerVars.terms) {
      this.registerVars.username = this.registerForm.controls['username'].value
      this.registerVars.firstname = this.registerForm.controls['firstname'].value
      this.registerVars.lastname = this.registerForm.controls['lastname'].value
      this.registerVars.email = this.registerForm.controls['email'].value
      this.registerVars.cin = this.registerForm.controls['cin'].value
      this.registerVars.country = this.registerForm.controls['country'].value
      this.registerVars.password = this.registerForm.controls['password'].value
      this.registerVars.phone = this.registerForm.controls['phone'].value
      

      this.authServ.signup(this.registerVars).subscribe(
        (res: any) => {
          if (res) {
            this.toastrService.success(this.translate('Congrats, you are registred successefully'), 'Success');
            this.router.navigate(['home']);
          }
        },
        (err: any) => {
          this.toastrService.error('Oops, something went wrong', 'Error');
        }
      );
    }else {
      this.toastrService.error(this.translate('You should accept terms'), 'Error');
    }
  }

  private translate(txt: string): string {
    return this.translatServ.instant(txt);
  }

  next() {
    this.stepper.next();
  }
}
