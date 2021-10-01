import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'shortName'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string): string {
    let regex: RegExp = /\s/
    return value.slice(0,+value.match(regex)+1)
  }
}
