import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DeviceService} from "../../services/device.service";
import {Device} from "../../models/device/device";
import {DeviceFormDialogComponent} from "../device-form-dialog/device-form-dialog.component";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-device-data-table',
  templateUrl: './device-data-table.component.html',
  styleUrls: ['./device-data-table.component.scss']
})
export class DeviceDataTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['id', 'description', 'maxHourlyConsumption', 'address', 'user'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  public dataSource: MatTableDataSource<any>;
  private devices: Device[] = [];
  private serviceSubscribe!: Subscription;

  constructor(private deviceService: DeviceService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Device>();
  }

  create() {
    const dialogRef = this.dialog.open(DeviceFormDialogComponent, {
      width: '30rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.deviceService.add(result).subscribe(data => {
        const model = data as Device;
        this.dataSource.data = [...this.dataSource.data, this.map(model)];
        this.devices.push(model)
      });
    });
  }

  edit(data: Device) {
    let device = this.devices.find(x => x.id == data.id) as Device;
    const dialogRef = this.dialog.open(DeviceFormDialogComponent, {
      width: '30em',
      data: {
        edit: true,
        model: device
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.deviceService.update(result).subscribe(model => {
        Object.assign(device, model as Device);
        Object.assign(data, this.map(model as Device));
      })
    });
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deviceService.remove(id).subscribe(_ => {
          this.devices = this.devices.filter(x => x.id != id);
          this.dataSource.data = this.dataSource.data.filter(x => x.id != id);
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {
    this.serviceSubscribe = this.deviceService.getAll()
      .subscribe(devices => {
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
