import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  async onLogin() {
    console.log(this.loginForm);
    if (!this.loginForm.valid) {
      Swal.fire({
        title: 'Ingreso',
        text: 'Debe diligenciar todos los campos',
        icon: 'error',
      });
      return;
    }
    let userName = this.loginForm.value.userName || '';
    let password = this.loginForm.value.password || '';
    let response = await this.userService.login(userName, password);
    if (response.success) {
      this.router.navigateByUrl('/view');
    } else {
      Swal.fire({
        title: 'Ingreso',
        text: response.message,
        icon: 'error',
      });
    }
  }
}
