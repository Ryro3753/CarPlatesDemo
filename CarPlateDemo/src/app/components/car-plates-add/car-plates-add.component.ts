import { Component, OnInit, inject, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http'
import { CarPlate } from 'src/models/CarPlate';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-car-plates-add',
  templateUrl: './car-plates-add.component.html',
  styleUrls: ['./car-plates-add.component.css']
})
export class CarPlatesAddComponent implements OnInit {

  addCarPlate : CarPlate = {id : 0, owner : '', carPlate : ''}
  
  @Output()
  openDialogWithData: EventEmitter<CarPlate> = new EventEmitter<CarPlate>();

  
  @Output()
  refreshData: EventEmitter<any> = new EventEmitter<any>();

  constructor(readonly dialog: MatDialog, readonly httpClient: HttpClient, readonly snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.openDialogWithData.subscribe(i => {
      this.addCarPlate = i;
      this.openDialog();
    })
  }
  addNew() {
    this.addCarPlate = {id : 0, owner : '', carPlate : ''};
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CarPlatesAddDialog, {
      width: '250px',
      data: this.addCarPlate
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.addCarPlate = result;
      if (this.addCarPlate.id && this.addCarPlate.id > 0) {
        this.httpClient.patch('http://localhost:8000/api/owner/' + this.addCarPlate.id, this.addCarPlate).subscribe(i => {
          this.snackBar.open('The car plate is updated');
          this.refreshData.emit();
        }, err => {
          this.snackBar.open(err);
        })
      } else {
        this.httpClient.post('http://localhost:8000/api/owner', this.addCarPlate).subscribe(i => {
          this.snackBar.open('The car plate is added');
          this.refreshData.emit();
        }, err => {
          this.snackBar.open(err);
        })
      }
    });

  }
  
}

@Component({
  selector: 'car-plates-add-dialog',
  templateUrl: './car-plates-dialog-add.html',
})
export class CarPlatesAddDialog {
  
  constructor(
    public dialogRef: MatDialogRef<CarPlatesAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CarPlate) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addClick() {
    this.dialogRef.close(this.data);
  }
}