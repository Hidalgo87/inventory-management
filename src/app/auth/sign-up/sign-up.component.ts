import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { HeaderRegisterComponent } from '../../layout/header/header-register/header-register.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HeaderRegisterComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm = this.fb.group({
    email: ['', [Validators.required]],
    userName:['',[Validators.required]],
    password:['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });


  constructor(private fb: FormBuilder, private router: Router, private userService:UserService) {

  }

  onRegister() {
    if(!this.signUpForm.valid){  
      Swal.fire({
        title: "Error",
        text: "Diligencia todos los campos",
        icon: "warning"
      });
      return;

    }

    const userName = this.signUpForm.value.userName;
    const password = this.signUpForm.value.password;
    const email = this.signUpForm.value.email;
    const confirmPassword = this.signUpForm.value.confirmPassword;

    if(password !== confirmPassword){
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden",
        icon: "error"
      });
      return;
    }

    const response = this.userService.register({userName:userName!, password: password!, email: email!});

    if(response.success){
      this.router.navigateByUrl('/home')
    }else{
      Swal.fire({
        text: response.message,
        icon: "info"
      });
      return;
      
    }


  }
  
  
  

}

