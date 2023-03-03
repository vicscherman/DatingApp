import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';





@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  model:any = {};
  

  constructor(public accountService: AccountService) {}

  ngOnInit() {
    
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => console.log(error),
    });
  }

  logout() {
    this.accountService.logout();
  }
}
