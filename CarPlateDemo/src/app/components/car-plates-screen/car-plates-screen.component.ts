import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-car-plates-screen',
  templateUrl: './car-plates-screen.component.html',
  styleUrls: ['./car-plates-screen.component.css']
})
export class CarPlatesScreenComponent implements OnInit {
  displayedColumns : string[] =  ['Owner', 'Car Plate', 'actions'];
  loadedValues : any;
  constructor(readonly httpClient: HttpClient) { }


  ngOnInit(): void {
    console.log('init')
    this.list("carPlate");
  }


  list(orderBy) {
    this.httpClient.get('http://localhost:8000/api/owners?orderBy=' + orderBy).subscribe(i => {
      this.loadedValues = (<any>i).data;
    })
  }


}
