import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private http: HttpClient,private data: DataService, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  onRegister() {
   
    this.submitted = true;
    this.data.newUser(this.registerForm.controls.name.value,this.registerForm.controls.email.value,this.registerForm.controls.password.value);
    this.router.navigate(['login']);

    if (this.registerForm.invalid) {
        return;
    }    
 

  }

  
}
