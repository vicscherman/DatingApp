import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { RegisterValidators } from '../_validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  gender = new FormControl('male');
  username = new FormControl('', [Validators.required]);
  knownAs = new FormControl('', [Validators.required]);
  dateOfBirth = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  country = new FormControl('', [Validators.required]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);
  maxDate: Date = new Date();
  validationErrors: string[] | undefined;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  registerForm = new FormGroup(
    {
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
      gender: this.gender,
      knownAs: this.knownAs,
      dateOfBirth: this.dateOfBirth,
      city: this.city,
      country: this.country,
    },
    [RegisterValidators.match('password', 'confirmPassword')]
  );

  register() {
    const dob = this.getDateOnly(
      this.registerForm.controls['dateOfBirth'].value
    );
    const values = { ...this.registerForm.value, dateOfBirth: dob };


    this.accountService.register(values).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
      },
      error: (error) => {
        this.validationErrors = error;
      },
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob: string | null) {
    if (!dob) return;

    let theDob = new Date(dob);

    return new Date(
      theDob.setMinutes(theDob.getMinutes() - theDob.getTimezoneOffset())
    )
      .toISOString()
      .slice(0, 10);
  }
}
