import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
 

  title = 'angularApp';


  users: Object;
  msg=  '';

  loginForm: FormGroup;
  messageForm: FormGroup;
  submitted = false;
  success = false;

  selectedFile: File;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  constructor(private http: HttpClient,private data: DataService, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit() {

   


    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }





 onLogin(){

  
  this.msg= this.data.login(this.loginForm.controls.email.value,this.loginForm.controls.password.value).toString();
  

  
 }

  getusers(){

  
    this.data.profile();
    
  
    
   }




}
