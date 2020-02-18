import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http'; 
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-rest',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {

  routeParams: Params;
  hasToken= false;
  submitted = false;
  queryParams: Params;
  sendtokenForm: FormGroup;

  constructor(
      private activatedRoute: ActivatedRoute,
      private http: HttpClient,private data: DataService,
       private router:Router,private formBuilder: FormBuilder
  ) {
      this.getRouteParams();
  }

  ngOnInit() {
    this.sendtokenForm = this.formBuilder.group({
      email: ['', Validators.required],
    });


  }

  sendToken() {
   
    this.submitted = true;
    
    this.data.sendToken(this.sendtokenForm.controls.email.value).subscribe(data => {
      console.log(data)
 
      this.router.navigate(['home']);

    })

    if (this.sendtokenForm.invalid) {
        return;
    }    
 

  }
  onActive() {
    console.log(this.routeParams.token)

    this.data.activeAccount(this.routeParams.token).subscribe(data => {
      console.log(data)
      this.router.navigate(['login']);

    })
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
    
  }

  
}
