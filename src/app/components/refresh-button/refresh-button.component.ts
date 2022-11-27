import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-refresh-button',
  templateUrl: './refresh-button.component.html',
  styleUrls: ['./refresh-button.component.scss']
})
export class RefreshButtonComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  refresh() {
    const url = window.location.pathname
    this.router.navigateByUrl('/404', { skipLocationChange: true }).then(() => {
      this.router.navigate([url]);
    });
  }
}
