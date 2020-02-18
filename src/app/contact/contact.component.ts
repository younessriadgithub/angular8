import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
 
 
  contactForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private http: HttpClient,private data: DataService, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit() {

   


    this.contactForm = this.formBuilder.group({
      email: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required]


    });
  }





 onContact(){

  
  this.data.onContact(this.contactForm.controls.email.value,this.contactForm.controls.subject.value,this.contactForm.controls.body.value).subscribe(data => {
    console.log(data)
    this.router.navigate(['home']);


  })

  

  
 }

}
