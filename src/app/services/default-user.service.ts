import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultUserService {

  constructor() { }

  public generateId(): string {
    let id: string = (Math.random() * 1E8).toFixed(0).toString()
    let size = 8
    while (id.length > size) {
      id = "0" + id
    }
    return id
  }
}
