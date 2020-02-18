import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../models/user';
import * as moment from 'moment'; // add this 1 of 4


interface userdata {
  "name":string,"email":string,"image":string,
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {
  user: userdata;
  str:String;
  serverimg:String;
  update:boolean;
  rest:boolean;
  submitted:boolean;
  public imagePath;
  imgURL: any;
  updateuserForm: FormGroup; 
  passwordsForm: FormGroup; 

  constructor(private data: DataService, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.passwordsForm= this.formBuilder.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
    this.updateuserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.submitted=true;
    this.update=false ;
    this.rest=false ;
    this.serverimg="http://localhost:8000/images/";
    this.str=moment("2020-02-11 19:59:37", "YYYY-MM-DD").fromNow() ;
    this.data.profile().subscribe((data:userdata) => {
      this.user = data;
      console.log(this.user)
      this.imgURL = this.serverimg+this.user.image; 

 
       })
  }
  getTest(str){

    return str=moment(str, "YYYY-MM-DD").fromNow() ;
  }

  getUpdatefrm(){
    this.updateuserForm.controls.name.setValue(this.user.name);
    this.updateuserForm.controls.email.setValue(this.user.email);

    this.update=true ;
    this.rest=false ;

  }
  getRestfrm(){
    this.update=false ;
    this.rest=true ;
  }
  getCancel(){
    this.update=false ;
    this.rest=false ;
  }


  updateUser(){
    console.log("hi"+this.updateuserForm.controls.name.value)
    this.submitted = true;
    this.data.updateUserProfile( this.updateuserForm.controls.name.value,
      this.updateuserForm.controls.email.value,this.imgURL
    ).subscribe((data:userdata) => {
      this.user = data;
      console.log(this.user)
 
    });

    if (this.updateuserForm.invalid) {
        return;
    }



  }

  newPassword(){
    console.log("hi"+this.passwordsForm.controls.oldpassword.value)
    this.submitted = true;
    if (this.passwordsForm.controls.newpassword.value != this.passwordsForm.controls.confirmpassword.value) {
      return;
    }
    this.data.newPassword( this.passwordsForm.controls.oldpassword.value, this.passwordsForm.controls.newpassword.value
    ).subscribe((data:userdata) => {
      this.user = data;
      console.log(this.user)
 
    });

    if (this.updateuserForm.invalid) {
        return;
    }



  }


  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.str = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
}
