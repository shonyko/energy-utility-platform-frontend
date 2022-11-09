import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Device} from "../../models/device/device";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user/user";
import {DeviceService} from "../../services/device.service";
import {ChartConfiguration, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-client-form-dialog',
  templateUrl: './client-form-dialog.component.html',
  styleUrls: ['./client-form-dialog.component.scss']
})
export class ClientFormDialogComponent implements OnInit {

  deviceList!: Device[];
  selected!: Device[];
  initial!: Device[];

  model!: User;

  roles = ["ADMIN", "CLIENT"]

  loading = true;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      '00:00',
      '05:00',
      '10:00',
      '15:00',
      '20:00',
      '24:00'
    ],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;

  constructor(public dialogRef: MatDialogRef<ClientFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private deviceService: DeviceService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.deviceService.getAll().subscribe(data => {
      // this.deviceList = data as Device[];
      // console.log(this.deviceList)
      // this.selected = this.deviceList.filter(dev => this.checkSelected(dev));
      // this.initial = this.selected;
      // this.formInstance.get("devices")?.setValue(this.selected.map(x => x.id));
      // this.loading = false;
    });
  }
}
