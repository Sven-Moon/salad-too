import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { StaticData } from '../models/StaticData';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = environment.baseUrl

  public getStaticData(): Observable<StaticData> {
    const url = this.baseUrl + '/staticdata'
    const body = ''
    let httpOptions: {};

    return this.http.get<any>(url)
  }

}
