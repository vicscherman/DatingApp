import { Component, EventEmitter,  Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter
  model: any = {}

  constructor(private accountService : AccountService, private toastr: ToastrService){}

  register(): void{
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.toastr.success('register success!')
        this.cancel();
        
      },
      error: error => {this.toastr.error(error.error)
      console.log(error)}
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
   
  }

}
