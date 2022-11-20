import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Device} from "../../models/device/device";
import {DeviceService} from "../../services/device.service";
import {ChartConfiguration, ChartOptions} from 'chart.js';
import {Measurement} from "../../models/measurement";
import {BaseChartDirective} from "ng2-charts";
import {WebsocketService} from "../../services/websocket.service";

@Component({
  selector: 'app-client-form-dialog',
  templateUrl: './client-form-dialog.component.html',
  styleUrls: ['./client-form-dialog.component.scss']
})
export class ClientFormDialogComponent implements OnInit, OnDestroy {

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  measurements: Measurement[] = [];

  model!: Device;

  isLoading = true;

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
        label: 'Energy Consumption',
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
              private deviceService: DeviceService, private websocketService: WebsocketService) {
    this.model = this.data.model;
  }

  ngOnInit(): void {
    this.deviceService.getMeasurements(this.model).subscribe(data => {
      this.measurements = data as Measurement[];
      const [labels, readings] = this.measurements.reduce((result: any, measurement) => {
        const hour = new Date(measurement.timeStamp).getHours();
        const label = `${hour.toString().padStart(2, '0')}:00`;
        if (result[0].at(-1) != label) {
          result[0].push(label);
        }

        result[1].push(measurement.energyConsumption.toFixed(1))

        return result;
      }, [[], []]);

      this.lineChartData.labels = labels;
      this.lineChartData.datasets[0].data = readings;

      console.log(readings)

      this.isLoading = false;
    });

    this.websocketService.subscribe(`device/${this.model.id}`, (data: string) => {
      const obj = JSON.parse(data);
      const measurement: Measurement = {
        id: "",
        timeStamp: new Date(obj.timestamp),
        energyConsumption: obj["measurement_value"]
      };

      const hour = new Date(measurement.timeStamp).getHours();
      const label = `${hour.toString().padStart(2, '0')}:00`;
      if (this.lineChartData.labels?.at(-1) != label) {
        this.lineChartData.labels?.push(label);
      }

      this.lineChartData.datasets[0].data.push(measurement.energyConsumption);

      this.chart.update();
    });
  }

  ngOnDestroy(): void {
    this.websocketService.unsubscribe(`device/${this.model.id}`);
  }
}
