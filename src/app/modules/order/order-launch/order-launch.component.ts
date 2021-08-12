import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-order-launch',
  templateUrl: './order-launch.component.html',
  styleUrls: ['./order-launch.component.scss']
})
export class OrderLaunchComponent implements OnInit {

  constructor(
    private navService: NavService,
  ) { }

  ngOnInit(): void {
    this.navService.updateNavPosition()
  }

}
