import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http'; 
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.css']
})
export class RestComponent implements OnInit {
  restForm: FormGroup;
  passwordsForm: FormGroup;

  submitted = false;
  success = false;
  routeParams: Params;
  hasToken= false;
  // Query parameters found in the URL: /example-params/one/two?query1=one&query2=two
  queryParams: Params;

  constructor(
      private activatedRoute: ActivatedRoute,
      private http: HttpClient,private data: DataService,
       private router:Router,private formBuilder: FormBuilder
  ) {
      this.getRouteParams();
  }

  ngOnInit() {

    this.restForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
    this.passwordsForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]

    });

  }

  onRest() {
   
    this.submitted = true;
    
    this.data.REST(this.restForm.controls.email.value).subscribe(data => {
      console.log(data)
 
      this.router.navigate(['home']);

    })

    if (this.restForm.invalid) {
        return;
    }    
 

  }
  onChange() {
   
    this.submitted = true;
    this.data.ChangePassword(this.routeParams.token, this.passwordsForm.controls.password.value).subscribe(data => {
      console.log(data)
      this.router.navigate(['home']);

 
    })
     console.log(this.passwordsForm.controls.password.value+' /n here \n'+this.passwordsForm.controls.confirmpassword.value)
     console.log(' this.routeParams.token '+this.routeParams.token)

     if (this.restForm.invalid) {
        return;
    }    
 

  }
  getRouteParams() {

    // Route parameters
    this.activatedRoute.params.subscribe( params => {
        this.routeParams = params;
    });
    console.log(  this.routeParams)
    if ( this.routeParams.token) {
      this.hasToken=  true;

    }else{
      this.hasToken=  false;

    }
    console.log("hasToken "+this.hasToken)
    // URL query parameters
    this.activatedRoute.queryParams.subscribe( params => {
        this.queryParams = params;
    });
    console.log(  this.queryParams)
  }

  
}
