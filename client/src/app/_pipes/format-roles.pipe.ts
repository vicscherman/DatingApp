import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatRoles',
})
export class FormatRolesPipe implements PipeTransform {
  transform(roles: string[]) {
    let returnString = '';
    for (let [index, role] of roles.entries()) {
      for (let i = 0; i < role.length; i++) {
        if (i == role.length - 1 && index !== roles.length - 1) {
          returnString += role[i] + ', ';
        } else {
          returnString += role[i];
        }
      }
    }
    return returnString;
  }
}
