import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  thisPosition: string = '';

  constructor() { }

  ngOnInit(): void {
    this.thisPosition = "20%"
  }


}
