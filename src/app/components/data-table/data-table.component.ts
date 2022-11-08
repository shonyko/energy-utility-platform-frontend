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
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['firstName', 'age', 'job'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  /**
   * it holds a list of active filter for each column.
   * example: {firstName: {contains: 'person 1'}}
   *
   */
  public columnsFilters = {};

  public dataSource: MatTableDataSource<Device>;
  private serviceSubscribe!: Subscription;

  constructor(private deviceService: DeviceService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Device>();
  }

  edit(data: Device) {
    const dialogRef = this.dialog.open(DeviceFormDialogComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.personsService.edit(result);
      }
    });
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.personsService.remove(id);
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
    // this.personsService.getAll();
    // this.serviceSubscribe = this.personsService.persons$.subscribe(res => {
    //   this.dataSource.data = res;
    // })
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

}
