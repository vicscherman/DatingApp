import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css'],
})
export class RolesModalComponent {
  username = '';
  availableRoles: any[] = [];
  selectedRoles: any[] = [];

  constructor(public bsModalRef: BsModalRef) {}

  updateChecked(checkedValue: string) {
    const index = this.selectedRoles.indexOf(checkedValue);
    //for example let's say we want to update "admin"
    if (index != -1) {
      //if it's already selected we unselect
      this.selectedRoles.splice(index, 1);
    }
    if (index == -1) {
      //if not selected we select
      this.selectedRoles.push(checkedValue);
    }
  }
}
