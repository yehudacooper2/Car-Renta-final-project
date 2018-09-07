
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branch } from '../models/branch.model';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { BranchStore } from '../models/branch-store.model';


@Injectable()
export class BranchService {
    private link = 'http://localhost:51349/api/branch';
    branchInfo: BranchStore = new BranchStore();

    constructor(private myHttpClient: HttpClient) {
        this.initBranches();
     }

    initBranches(): void {
        this.myHttpClient.get(this.link)
            .subscribe((x: Array<Branch>) => { this.branchInfo.branchList = x; });
    }

}
