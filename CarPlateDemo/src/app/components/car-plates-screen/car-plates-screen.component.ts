import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CarPlatesAddComponent } from '../car-plates-add/car-plates-add.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-car-plates-screen',
  templateUrl: './car-plates-screen.component.html',
  styleUrls: ['./car-plates-screen.component.css']
})
export class CarPlatesScreenComponent implements OnInit {

  @ViewChild(CarPlatesAddComponent) dialogComponent: CarPlatesAddComponent;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['owner', 'carPlate', 'actions'];
  loadedValues: any;
  search: string;
  defaultSort = 'owner';
  defaultSortDirection = 'asc';

  constructor(readonly httpClient: HttpClient, readonly snackBar: MatSnackBar) { }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.list())
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    let sort = this.defaultSort;
    let desc = false;
    if (this.sort?.active) {
      sort = this.sort.active;
    }
    let url = 'http://localhost:8000/api/owners?orderBy=' + sort;

    if (this.sort?.direction && this.sort?.direction == 'desc') {
      desc = true
      url += '&desc=1'
    }


    this.httpClient.get(url).subscribe(i => {
      this.loadedValues = (<any>i).data;
    })
  }



  editClick(e, element) {
    this.dialogComponent.openDialogWithData.emit(element);
  }

  deleteClick(e, element) {
    this.httpClient.delete('http://localhost:8000/api/owner/' + element.id).subscribe(i => {
      this.snackBar.open('The car plate is updated');
      this.list();
    })
  }

  searchClick(value) {
    this.httpClient.get('http://localhost:8000/api/owners?search=' + value).subscribe(i => {
      console.log(value);
      this.loadedValues = (<any>i).data;
    })
  }
}
