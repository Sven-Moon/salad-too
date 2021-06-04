import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-launch',
  templateUrl: './order-launch.component.html',
  styleUrls: ['./order-launch.component.scss']
})
export class OrderLaunchComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
