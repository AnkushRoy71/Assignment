import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { StepperComponent } from '../../../components/stepper/stepper.component';
import { RegisterFormModel, RegisterRequestModel } from '../../../models/auth.model';
import { AuthserviceService } from '../../../services/authservice.service';

type FormControls<T> ={
  [key in keyof T]: FormControl<T[key]>
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    StepperComponent,
    DropdownModule,
    CardModule,
    CheckboxModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  activeIndex = 1;
  registrationDone = false;

  steps = [
    { label: 'REGISTER' },
    { label: 'SUBMIT INFO' },
    { label: 'COMPLETE' },
  ];

  states = [
    { label: 'Select State', value: '' },
    { label: 'West Bengal', value: 'WB' },
    { label: 'Maharashtra', value: 'MH' },
  ];

  headers : { [key: number]: string } = {
    1: 'CONTACT INFORMATION',
    2: 'COMPLETE',
  };

  registerForm = this.fb.group<FormControls<RegisterFormModel>>({
    firstName: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    state: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    confirmEmail: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    subscribe: new FormControl(false, {
      nonNullable: true,
    }),
  },{
  validators: (group) => {    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;
    if (email !== confirmEmail) {
      group.get('confirmEmail')?.setErrors({ emailMismatch: true });
    } else {
      const errors = group.get('confirmEmail')?.errors;
      if (errors) {
        delete errors['emailMismatch'];
        group
          .get('confirmEmail')
          ?.setErrors(Object.keys(errors).length ? errors : null);
      }
    }
    return null;
  }
}
);

  constructor(
    private fb: FormBuilder,
    private authService: AuthserviceService,
  ) {}

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    } else {
      const { confirmEmail, ...registerData } = this.registerForm.value;
      // Note* I didn't unsubscribe the observable since http observables complete after emitting the response, so there is no risk of memory leaks in this case.
      this.authService
        .registerUser(registerData as RegisterRequestModel)
        .subscribe({
          next: (response) => {
            console.log('Registration successful:', response);
            this.activeIndex = 2;
            this.registrationDone = true;
          },
          error: (error) => {
            console.error('Registration failed:', error);
          },
        });
    }
  }

  isInvalid(control: string) {
    const c = this.registerForm.get(control);
    return c?.invalid && c?.touched;
  }
}
