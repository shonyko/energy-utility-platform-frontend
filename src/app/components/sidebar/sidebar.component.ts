import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserRole} from "../../enums/user-role";

const tabsDictionary = {
  [UserRole.Client]: [{
    name: 'devices',
    icon: 'devices',
  }, {
    name: 'chat',
    icon: 'chat',
  }],
  [UserRole.Admin]: [{
    name: 'tables',
    icon: 'border_color',
  }, {
    name: 'chat',
    icon: 'chat',
  }]
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() tabChangeEvent = new EventEmitter<string>();

  tabs: any[] = [];
  activeTab: any = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    const role = this.authService.getRoles()[0];
    this.tabs = tabsDictionary[role];
    this.activeTab = this.tabs[0];
  }

  selectTab(tab: any) {
    this.activeTab = tab;
    this.tabChangeEvent.emit(tab.name)
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
