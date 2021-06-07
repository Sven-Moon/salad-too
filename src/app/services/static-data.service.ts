import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { StaticData } from '../models/StaticData';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = 'https://localhost:3000/'

  public getStaticData(): Observable<StaticData> {
    const url = this.baseUrl + 'static-data/'
    const body = ''
    let httpOptions: {};

    return this.http.get<any>(url)
  }

}
