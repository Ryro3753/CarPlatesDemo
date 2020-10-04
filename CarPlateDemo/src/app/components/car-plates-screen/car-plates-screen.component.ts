import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MatPaginator } from '@angular/material/paginator';
import { CarPlatesAddComponent } from '../car-plates-add/car-plates-add.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-car-plates-screen',
  templateUrl: './car-plates-screen.component.html',
  styleUrls: ['./car-plates-screen.component.css']
})
export class CarPlatesScreenComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(CarPlatesAddComponent) dialogComponent: CarPlatesAddComponent;

  displayedColumns : string[] =  ['Owner', 'Car Plate', 'actions'];
  loadedValues : any;

  constructor(readonly httpClient: HttpClient, readonly snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    this.loadedValues.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.httpClient.get('http://localhost:8000/api/owners').subscribe(i => {
      this.loadedValues = (<any>i).data;
    })
  }

  

  editClick(e, element){
    this.dialogComponent.openDialogWithData.emit(element);
  }

  deleteClick(e, element){
    this.httpClient.delete('http://localhost:8000/api/owner/' + element.id).subscribe(i => {
      this.snackBar.open('The car plate is updated');
      this.list();
    })
  }
}
