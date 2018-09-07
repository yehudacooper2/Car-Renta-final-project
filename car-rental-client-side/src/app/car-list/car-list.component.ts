
import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/services/car.service';
import { CarStore } from '../shared/models/car-store.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {


  carStore: CarStore;
  actionMsg: string;
  constructor(private myCarService: CarService) { }

  ngOnInit() {
    this.carStore = this.myCarService.carInfo;
  }

  showCar(carNumber: string) {
    this.myCarService.getCar(carNumber);
  }

  deleteCar(carNumber: string) {
    this.myCarService.deleteCar(carNumber).subscribe(
      (res) => {
        if (res) {
          this.myCarService.getCars();
        }
        this.actionMsg = (res) ? 'delete success' : 'delete fail';

      });



  }
}
