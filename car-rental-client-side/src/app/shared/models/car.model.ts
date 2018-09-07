import { CarType } from './carType.model';
import { Branch } from './branch.model';


export interface Car {

CarCurrentKilometerage: number;
CarImage: string;
CarIsFitForRental: boolean;
CarNumber: string;
CarType: CarType;
CarBranch: Branch;

}
