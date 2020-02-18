import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../services/property.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import * as moment from 'moment'; // add this 1 of 4



interface propertiesdata {
  "count":number,"nmbrepage":number,"page":number, properties:[] ,
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  selectedFile: File;

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  title = 'angularApp';

  Cities: Object;

  Properties: Object;
  Populars: Object;
  Recents: Object;

  Categories: Object;
  searchVal: string;
  nameCategorie:String;
  nmbrpage:Number;
  page:Number;
  nbritems:Number;
  lmbrpage=[];
  serverimg: string;
  sale:boolean;
  rent:boolean;
  category: string;
  city: string;
  constructor(private http: HttpClient,private serve: PropertyService, private router:Router,private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.serverimg="http://localhost:8000/images/";
    this.rent=true;
    this.sale=true;
    this.city="";
    this.category="";
    this.page = 1;

    this.nmbrpage = 1;
    this.nbritems =6;

    this.serve.getProperties(this.page,this.nbritems,this.searchVal,this.category,this.city,this.rent,this.sale).subscribe((data:propertiesdata) => {
      this.Properties = data.properties;
      console.log(  this.Properties);
      this.nmbrpage = data.nmbrepage;
      console.log(  data);

      this.lmbrpage=[];
      for (let index = 1; index <= this.nmbrpage ; index++) {
       this.lmbrpage[index]=[index];
        
      }


    });




    
    this.serve.popularProperties().subscribe(data => {
      this.Populars = data;
      console.log(  this.Populars);
    

    });
    this.serve.RecentsProperties().subscribe(data => {
      this.Recents = data;
      console.log(  this.Recents);
    

    });
    this.serve.getCategories().subscribe(data => {
      this.Categories = data;
      console.log(  this.Categories);
    

    });


    this.serve.getCities().subscribe(data => {
      this.Cities = data;
      console.log(  this.Cities);
    

    });



  }
  onSearch(searchVal: string) {
    this.searchVal = searchVal;
    console.log( this.searchVal+" searchVal");
    this.getpage(1);

    
  }

  getpage(page){
        if (1>page) {
            this.page=1;

        }else  if (this.nmbrpage<page) {
            this.page=this.nmbrpage;
        }else{
            this.page=page;
        }
        console.log("this.page"+this.page);
        if(this.page==0){
          this.page=1;
        }

    
        this.serve.getProperties(this.page,this.nbritems,this.searchVal,this.category,this.city,this.rent,this.sale).subscribe((data:propertiesdata) => {
          this.Properties = data.properties;
              console.log( data);
              this.nmbrpage = data.nmbrepage;

              this.lmbrpage=[];
              for (let index = 1; index <= this.nmbrpage ; index++) {
              this.lmbrpage[index]=[index];
                
              }


        });

  }

  setSale(sale){
    if (sale==true) {
      this.sale=false;
    }
    if (sale==false) {
      this.sale=true;
    }
    console.log('sale'+this.sale)

  }
  setRent(rent){
    if (rent==true) {
      this.rent=false;
    }
    if (rent==false) {
      this.rent=true;
    }
    console.log('new value rent'+rent)

    console.log('rent'+this.rent)
    this.getpage(1);

  }

  setCategory(category){
    console.log('category'+category)

      this.category=category;
      this.getpage(1);

  }
  getCategory(){
    console.log(this.category)
  }
  setCity(city){
    console.log('city'+city)

      this.city=city;
      this.getpage(1);

  }

  getMoment(date){
   
    return moment(date, "YYYY-MM-DD").fromNow() ;
  }




}
