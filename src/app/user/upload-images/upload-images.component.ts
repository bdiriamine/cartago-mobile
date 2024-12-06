import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import {NgxImageCompressService} from 'ngx-image-compress';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from '../change-password/change-password.component';

export class FileUplodVM {
  ImageBaseData: string;
}
@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {
  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  fileInfos: Observable<any>;
  modalReference: any;
  images: string[] = []
  prog

  constructor(private userServ: UserService,
    private sanitizer: DomSanitizer,
    private toasterServ: ToastrService,
    private router: Router, 
    private imageCompress: NgxImageCompressService,
    private translatServ:TranslateService,
    private modalService: NgbModal) { }
 

  ngOnInit(): void {
  }

  close() {
    this.router.navigate(['/home'])
  }

  onSubmit() {
    return false;
  }

  upload() {
    this.progressInfos = [];
    for (let idx = 0; idx < this.images.length; idx++) {
    this.imageCompress.compressFile(this.images[idx], 50, 50).then(
      result => {
        this.images[idx] = result;
      }
    );
    }
  
    if (this.images.length == 3) {
 
      this.userServ.upload(this.images).subscribe(
        event => {
          for (let idx = 0; idx < this.images.length; idx++) {
            this.progressInfos[idx] = { value: 0, fileName: "file : " + idx };
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
              this.prog = this.progressInfos[idx].value
            } else if (event instanceof HttpResponse) {
              this.fileInfos = this.userServ.getFiles();
              this.toasterServ.success(this.translate('files saved'), 'Success')
            }
          }
        },
        err => {
          this.toasterServ.warning(this.translate('Could not upload the files') , 'Warning')
        }
      );
    } else {
      this.toasterServ.warning(this.translate('You should provide 3 pictures'), 'Warning')
    }
  }

  private translate(txt: string): string {
    return this.translatServ.instant(txt);
  }

  private imageSrc: string = '';
  handleInputChange(e) {

    this.images = []
    this.progressInfos = [];
    this.selectedFiles = e.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      var file = this.selectedFiles[i]
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        this.toasterServ.warning(this.translate('invalid format'), 'Warning')
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.images.push(reader.result)
  }
  transform(im) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(im);
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
