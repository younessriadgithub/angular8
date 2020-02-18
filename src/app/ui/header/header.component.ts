import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  auth:boolean;
  admin:boolean;
  user:boolean;
  role:String;
  name:string;
  constructor(private data: DataService) { }

  ngOnInit() {

    this.auth=  this.data.isLoggedIn();
    this.role=  this.data.getRole();
    if( this.role=="Admin"){
      console.log("admin"+  this.role);

      this.admin=  true;
      this.user=  true;

    }else if ( this.role=="User") {

      this.admin=  false;
      this.user=  true;

    } else {

      this.admin=  false;
      this.user=  false;

    }
    
    this.name=this.data.getName()
  }

}
