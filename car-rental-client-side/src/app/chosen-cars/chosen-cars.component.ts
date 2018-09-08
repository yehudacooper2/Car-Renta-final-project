
import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/services/car.service';
import { CarStore } from '../shared/models/car-store.model';
import { Car } from '../shared/models/car.model';
import { FormsModule } from '@angular/forms';
import { CarTypeService } from '../shared/services/carType.service';
import { CarTypeStore } from '../shared/models/carType-store.model';
import { OrderService } from '../shared/services/order.service';
import { OrderStore } from '../shared/models/order-store.model';
@Component({
  selector: 'app-chosen-cars',
  templateUrl: './chosen-cars.component.html',
  styleUrls: ['./chosen-cars.component.css']
})
export class ChosenCarsComponent implements OnInit {
  chosenCarByManufacturerArray: Array<Car> = new Array<Car>();
  chosenCarByYearArray: Array<Car> = new Array<Car>();
  chosenCarByGearArray: Array<Car> = new Array<Car>();
  chosenCarByModelArray: Array<Car> = new Array<Car>();
  chosenCarArray: Array<Car> = new Array<Car>();

  orderStore: OrderStore;
  carStore: CarStore;
  carTypeStore: CarTypeStore;
  localCarGear: boolean = undefined;
  localCarYear: any;
  localCarManufacturer: string;
  localCarModel: string;
  localCarType: string;
  localCar: Car;
  constructor(private myCarService: CarService, private myCarTypeService: CarTypeService, private myOrderService: OrderService) { }

  ngOnInit() {
    this.carStore = this.myCarService.carInfo;
    this.carTypeStore = this.myCarTypeService.carTypeInfo;
    this.orderStore = this.myOrderService.orderInfo;
  }

  saveModel(model: string): void {
    this.localCarModel = model;
    console.log(this.localCarModel);
  }
  showCar(carNumber: string) {
    this.myCarService.getCar(carNumber);
  }
  // this function checks if there is one or more  car/s with the chosen model name
 // and checks if the car is available and does not have an order for it already.
  chooseCarByModel(): void {
    this.chosenCarByModelArray = [];
    this.localCarModel = this.localCarModel || this.myCarTypeService.carTypeInfo.carTypeList[0].Model;
    for (let i = 0; i < this.carStore.carList.length; i++) {
      if (this.carStore.carList[i].CarType.Model === this.localCarModel && this.carStore.carList[i].CarIsFitForRental === true) {
        this.chosenCarByModelArray.push(this.carStore.carList[i]);
      }
    }
    for (let i = 0; i < this.chosenCarByModelArray.length; i++) {
      for (let j = 0; j < this.orderStore.orderList.length; j++) {
        if (this.chosenCarByModelArray[i].CarNumber === this.orderStore.orderList[j].OrderCar.CarNumber
          && this.orderStore.orderList[j].OrderActualReturnDate == null) {
          this.chosenCarByModelArray.splice(i, 1);
        }
      }
    }

  }

  saveManufacturer(manufacturer: string): void {
    this.localCarManufacturer = manufacturer;
  }
      // this function checks if there is one or more  car/s with the chosen manufacturer name
     // and checks if the car is available and does not have an order for it already.
  chooseCarByManufacturer(): void {
    this.localCarManufacturer = this.localCarManufacturer || this.myCarTypeService.carTypeInfo.carTypeList[0].Manufacturer;
    this.chosenCarByManufacturerArray = [];
    for (let i = 0; i < this.carStore.carList.length; i++) {
      // tslint:disable-next-line:max-line-length
      if (this.carStore.carList[i].CarType.Manufacturer === this.localCarManufacturer && this.carStore.carList[i].CarIsFitForRental === true) {
        this.chosenCarByManufacturerArray.push(this.carStore.carList[i]);
      }
    }
    for (let i = 0; i < this.chosenCarByManufacturerArray.length; i++) {
      for (let j = 0; j < this.orderStore.orderList.length; j++) {
        if (this.chosenCarByManufacturerArray[i].CarNumber === this.orderStore.orderList[j].OrderCar.CarNumber
          && this.orderStore.orderList[j].OrderActualReturnDate == null) {
          this.chosenCarByManufacturerArray.splice(i, 1);
        }
      }
    }

  }
  saveYear(year: number): void {
    this.localCarYear = year;
    console.log(this.localCarYear);

  }
      // this function checks if there is one or more  car/s with the chosen year
     // and checks if the car is available and does not have an order for it already.
  chooseCarByYear(): void {
    this.localCarYear = this.localCarYear || this.myCarTypeService.carTypeInfo.carTypeList[0].ManufactureYear;
    this.chosenCarByYearArray = [];
    for (let i = 0; i < this.carStore.carList.length; i++) {
      if (this.carStore.carList[i].CarType.ManufactureYear === this.localCarYear && this.carStore.carList[i].CarIsFitForRental === true) {
        this.chosenCarByYearArray.push(this.carStore.carList[i]);
      }
    }
    for (let i = 0; i < this.chosenCarByYearArray.length; i++) {
      for (let j = 0; j < this.orderStore.orderList.length; j++) {
        if (this.chosenCarByYearArray[i].CarNumber === this.orderStore.orderList[j].OrderCar.CarNumber
          && this.orderStore.orderList[j].OrderActualReturnDate == null) {
          this.chosenCarByYearArray.splice(i, 1);
        }
      }
    }

  }
      // this function checks if there is one or more  car/s with the chosen gear
     // and checks if the car is available and does not have an order for it already.
  chooseCarByGear(gear: boolean): void {
    this.chosenCarByGearArray = [];
    for (let i = 0; i < this.carStore.carList.length; i++) {
      if (this.carStore.carList[i].CarType.Gear === gear && this.carStore.carList[i].CarIsFitForRental === true) {
        this.chosenCarByGearArray.push(this.carStore.carList[i]);
      }
    }
    for (let i = 0; i < this.chosenCarByGearArray.length; i++) {
      for (let j = 0; j < this.orderStore.orderList.length; j++) {
        if (this.chosenCarByGearArray[i].CarNumber === this.orderStore.orderList[j].OrderCar.CarNumber
          && this.orderStore.orderList[j].OrderActualReturnDate == null) {
          this.chosenCarByGearArray.splice(i, 1);
        }
      }
    }

  }
      // this function checks if there is one or more  car/s in the car list on the db
     // and checks if the car is available and does not have an order for it already.
  chooseAllAvailableCars(): void {
    this.chosenCarArray = [];
    for (let a = 0; a < this.carStore.carList.length; a++) {
      if (this.carStore.carList[a].CarIsFitForRental === true) {
        this.chosenCarByGearArray.push(this.carStore.carList[a]);
      }
    }
    for (let i = 0; i < this.carStore.carList.length; i++) {
      for (let j = 0; j < this.orderStore.orderList.length; j++) {
        if (this.carStore.carList[i].CarNumber === this.orderStore.orderList[j].OrderCar.CarNumber
          && this.orderStore.orderList[j].OrderActualReturnDate == null) {
          this.chosenCarArray.splice(i, 1);
        }
      }
    }

  }
}
