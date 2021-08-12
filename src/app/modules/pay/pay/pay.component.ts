import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';


@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(
    private navService: NavService
  ) { }

  ngOnInit(): void {
    this.navService.updateNavPosition()
  }

}
