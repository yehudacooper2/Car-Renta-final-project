
import { Component, OnInit } from '@angular/core';
import { CarTypeService } from '../shared/services/carType.service';
import { CarTypeStore } from '../shared/models/carType-store.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-car-type-list',
  templateUrl: './car-type-list.component.html',
  styleUrls: ['./car-type-list.component.css']
})
export class CarTypeListComponent implements OnInit {


  carTypeStore: CarTypeStore;
  actionMsg: string;
  constructor(private myCarTypeService: CarTypeService) { }

  ngOnInit() {
    this.carTypeStore = this.myCarTypeService.carTypeInfo;
  }

  showCarType(carModel: string) {
    this.myCarTypeService.getCarType(carModel);
  }

  deleteCarType(carModel: string) {
    this.myCarTypeService.deleteCarType(carModel).subscribe(
      (res) => {
        if (res) {
          this.myCarTypeService.getCarTypes();
        }
        this.actionMsg = (res) ? 'delete success' : 'delete fail';

      });



  }
}
