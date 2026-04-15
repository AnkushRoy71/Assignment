import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule,ButtonModule,InputTextModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
requiredPassword: string = 'Ab#123@';
password: string = '';

login(){
  if(this.password === this.requiredPassword){
    alert('Login successful!');
  } else {
    alert('Invalid password. Please try again.');
  }
}
}
