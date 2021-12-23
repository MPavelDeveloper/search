import { Injectable } from '@angular/core';
import {TEST_DATA} from "../testData";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  public getData(): Array<string> {
    return TEST_DATA
  }
}
