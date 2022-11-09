import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {AddressService} from "../../services/address.service";
import {Address} from "../../models/address";
import {AddressFormDialogComponent} from "../address-form-dialog/address-form-dialog.component";

@Component({
  selector: 'app-address-data-table',
  templateUrl: './address-data-table.component.html',
  styleUrls: ['./address-data-table.component.scss']
})
export class AddressDataTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['id', 'name'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  public dataSource: MatTableDataSource<Address>;
  private serviceSubscribe!: Subscription;

  constructor(private addressService: AddressService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Address>();
  }

  create() {
    const dialogRef = this.dialog.open(AddressFormDialogComponent, {
      width: '30rem',
      data: {
        edit: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addressService.add(result).subscribe(address => {
          this.dataSource.data = [...this.dataSource.data, address as Address];
        });
      }
    });
  }

  edit(data: Address) {
    const dialogRef = this.dialog.open(AddressFormDialogComponent, {
      width: '30rem',
      data: {
        edit: true,
        model: data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addressService.update(result).subscribe(address => {
          data.name = (address as Address).name
        });
      }
    });
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addressService.remove(id).subscribe(_ => {
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
    this.serviceSubscribe = this.addressService.getAll()
      .subscribe(addresses => {
        this.dataSource.data = addresses as Address[]
      });
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

}
