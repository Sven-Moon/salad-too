import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  modalRef: BsModalRef
  newUser: boolean = false

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.newUser = false;
  }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template)
  }

  public onSubmit(f: NgForm): void {

  }

  public cancel(): void {
    this.modalService.hide()
  }



}
