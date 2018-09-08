
import { Component, OnInit } from '@angular/core';
import { CarTypeService } from '../shared/services/carType.service';
import { ActivatedRoute } from '@angular/router';
import { CarType } from '../shared/models/carType.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-edit-car-type',
  templateUrl: './edit-car-type.component.html',
  styleUrls: ['./edit-car-type.component.css']
})
export class EditCarTypeComponent implements OnInit {


  actionMsg: string;
  localParam: string;
  localCarType: CarType =
    {
      'Model': undefined,
      'Manufacturer': undefined,
      'ManufactureYear': undefined,
      'DailyCost': undefined,
      'DayDelayCost': undefined,
      'Gear': undefined,
    };

  constructor(private myCarTypeService: CarTypeService, private myActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.myActivatedRoute.params.subscribe(params => {
      this.localParam = params.carModel;

      if (params.carModel) {
        this.myCarTypeService.getCarTypeForEdit(params.carModel, (carType: CarType) => { this.localCarType = carType; });
      }
    });
  }

  saveChanges() {
    const callback = (bool: boolean) => { this.actionMsg = (bool) ? 'action success' : 'action fail'; };
    // tslint:disable-next-line:max-line-length
    (this.localParam) ? this.myCarTypeService.editCarType(this.localCarType, this.localParam, callback) : this.myCarTypeService.addCarType(this.localCarType, callback);
  }



}
