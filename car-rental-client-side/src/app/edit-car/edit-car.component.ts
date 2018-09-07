
import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarTypeService } from '../shared/services/carType.service';
import { Car } from '../shared/models/car.model';
import { CarTypeStore } from '../shared/models/carType-store.model';
import { CarType } from '../shared/models/carType.model';
import { Branch } from '../shared/models/branch.model';
import { BranchStore } from '../shared/models/branch-store.model';
import { BranchService } from '../shared/services/branch.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
localCarType: string;
carTypeStore: CarTypeStore;
branchStore: BranchStore;
actionMsg: string;
  localParam: string;
  localCar: Car = {'CarNumber': undefined, 'CarCurrentKilometerage': undefined, 'CarImage': undefined,
  'CarIsFitForRental': undefined, 'CarType': undefined, 'CarBranch': undefined};

  constructor(private myCarService: CarService, private  myCarTypeService: CarTypeService,
     private myBranchService: BranchService, private myActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.branchStore = this.myBranchService.branchInfo;

    this.carTypeStore = this.myCarTypeService.carTypeInfo;
    this.myActivatedRoute.params.subscribe(params => {
      this.localParam = params.carNumber;

      if (params.carNumber) {
        this.myCarService.getCarForEdit(params.carNumber, (car: Car) => {this.localCar = car;
          this.localCar.CarType = this.carTypeStore.carTypeList[0];
          this.localCar.CarBranch = this.branchStore.branchList[0] ; } );
      }
    });
  }

  saveChanges() {
    const callback = (bool: boolean) => {this.actionMsg = (bool) ? 'action success' : 'action fail'; } ;
    this.localCar.CarType = this.localCar.CarType || this.carTypeStore.carTypeList[0];

    this.localCar.CarBranch = this.localCar.CarBranch || this.branchStore.branchList[0];


    (this.localParam) ? this.myCarService.editCar(this.localCar, this.localParam, callback)
     : this.myCarService.addCar(this.localCar, callback) ;
  }


  saveCarType(model: string) {
    this.localCar.CarType = this.carTypeStore.carTypeList.find(x => x.Model === model);
    console.log(this.localCar);
  }
  saveBranch(branchName: string) {
    this.localCar.CarBranch = this.branchStore.branchList.find(x => x.BranchName === branchName);
    console.log(this.localCar);
  }

}
