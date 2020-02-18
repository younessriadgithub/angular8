import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../services/property.service';

import { DataService } from '../services/data.service';
import * as moment from 'moment'; // add this 1 of 4

import { HttpClient } from '@angular/common/http'; 
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  submitted = false;
  success = false;
  routeParams: Params;
  Property:Object;
  titleurl:String;
  serverimg:String;
  auth : boolean;

  constructor(
    private activatedRoute: ActivatedRoute,private data: DataService,
    private http: HttpClient,private serve: PropertyService,
     private router:Router,private formBuilder: FormBuilder



  ) {


    this.getRouteParams();
   }

  ngOnInit() {

    this.serverimg="http://localhost:8000/images/";

    
    this.auth=this.data.isLoggedIn();
    this.serve.getProperty(this.titleurl).subscribe(data => {
      this.Property = data;
      console.log(  data);
     


    });



  }
  getRouteParams() {

    this.activatedRoute.params.subscribe( params => {
        this.routeParams = params;
    });
    
   
    this.titleurl=this.routeParams.title;

  }
  getMoment(str){

    return str=moment(str, "YYYY-MM-DD").fromNow() ;
  }

  
}
