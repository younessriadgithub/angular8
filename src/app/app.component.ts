import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { HttpClient } from '@angular/common/http'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private http: HttpClient,private data: DataService, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit() {

   



  }





  


}