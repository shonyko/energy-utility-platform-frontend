import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Device} from "../../models/device/device";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {ClientFormDialogComponent} from "../client-form-dialog/client-form-dialog.component";

@Component({
  selector: 'app-client-data-table',
  templateUrl: './client-data-table.component.html',
  styleUrls: ['./client-data-table.component.scss']
})
export class ClientDataTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['id', 'description', 'maxHourlyConsumption', 'address', 'user'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  public dataSource: MatTableDataSource<any>;
  private devices: Device[] = [];
  private serviceSubscribe!: Subscription;

  constructor(public dialog: MatDialog, private authService: AuthService, private userService: UserService) {
    this.dataSource = new MatTableDataSource<Device>();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  show(device: any) {
    this.dialog.open(ClientFormDialogComponent, {
      width: '30em',
      data: {
        model: device
      }
    });
  }

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {
    this.serviceSubscribe = this.userService.getDevices(this.authService.getId())
      .subscribe(devices => {
        console.log(devices)
        this.devices = devices as Device[];
        this.dataSource.data = this.devices.map(this.map);
      });
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

  private map(device: Device) {
    return ({
      id: device.id,
      description: device.description,
      maxHourlyConsumption: device.maxHourlyConsumption,
      address: device.address.name,
      user: device.user?.id ?? 'Not assigned'
    })
  }

}
