import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,AfterViewInit{

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    
  }

}
