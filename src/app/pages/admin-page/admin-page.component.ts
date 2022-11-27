import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  activeTab: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onTabChange(tabName: string) {
    this.activeTab = tabName;
  }
}
