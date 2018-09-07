import { Component, OnInit } from '@angular/core';
import { CarStore } from '../shared/models/car-store.model';
import { CarService } from '../shared/services/car.service';

@Component({
  selector: 'app-single-car',
  templateUrl: './single-car.component.html',
  styleUrls: ['./single-car.component.css']
})
export class SingleCarComponent implements OnInit {
  img: string;
  carStore: CarStore;
  constructor(private myCarService: CarService) {


   }

  ngOnInit() {
    this.carStore = this.myCarService.carInfo;
  }


}
