import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: string): string {
    var regex = '[a-zA-Z0-9]'
    // g for all values(in linux sed ), without g only first occurence will be replaced
    return value.replace(new RegExp(regex, 'g'), '*').substring(0,10)+"...";
  }

}
