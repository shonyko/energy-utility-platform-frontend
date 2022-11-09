import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Device} from "../../models/device/device";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {UserFormDialogComponent} from "../user-form-dialog/user-form-dialog.component";
import {User} from "../../models/user/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-data-table',
  templateUrl: './user-data-table.component.html',
  styleUrls: ['./user-data-table.component.scss']
})
export class UserDataTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['id', 'name', 'role', 'username', 'password'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  public dataSource: MatTableDataSource<any>;
  private users: User[] = [];
  private serviceSubscribe!: Subscription;

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Device>();
  }

  create() {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '30rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.userService.add(result).subscribe(data => {
        const model = data as User;
        this.dataSource.data = [...this.dataSource.data, this.map(model)];
        this.users.push(model)

        const usr = model as User;
        this.remove(usr.id, result.toDelete, () => {
          this.add(usr.id, result.toAdd);
        })
      });
    });
  }

  edit(data: User) {
    let user = this.users.find(x => x.id == data.id) as User;
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '400px',
      data: {
        edit: true,
        model: user
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.userService.update(result).subscribe(model => {
        Object.assign(user, model as User);
        Object.assign(data, this.map(model as User));
        const usr = model as User;
        this.remove(usr.id, result.toDelete, () => {
          this.add(usr.id, result.toAdd);
        });
      })
    });
  }

  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.remove(id).subscribe(_ => {
          this.users = this.users.filter(x => x.id != id);
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
    this.serviceSubscribe = this.userService.getAll()
      .subscribe(users => {
        console.log(users)
        this.users = users as User[];
        this.dataSource.data = this.users.map(this.map);
      });
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }

  remove(userId: string, devices: any, cb: any) {
    if (devices.length == 0) return cb();
    this.userService.removeDevice(userId, devices.at(-1)).subscribe(_ => {
      devices.pop();
      this.remove(userId, devices, cb);
    })
  }

  add(userId: string, devices: any) {
    if (devices.length == 0) return;
    this.userService.addDevice(userId, devices.at(-1)).subscribe(_ => {
      devices.pop();
      this.add(userId, devices);
    })
  }

  private map(user: User) {
    return ({
      id: user.id,
      name: user.name,
      role: user.role,
      username: user.credentials.username,
      password: user.credentials.password,
    })
  }

}
