import { Component, OnInit } from '@angular/core';
import {  DataService } from '../services/data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private data:DataService,private router: Router) {}


  ngOnInit() {


    if( this.data.isLoggedIn() ) {
      this.router.navigate(['/'])
      this.data.logout()
      
    } else {
      window.alert('Some problem')
    }

  }

}
