import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { HttpHeaders   } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthGuardService } from './Auth-Guard.service'
import { DataService } from './data.service'

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  token :string;
  property :object;
  image :string;
  filterdata:Object;

  constructor(private data:DataService,private http: HttpClient,private router:Router) { }

  public getProperties(page,count,title,category,city,rent,sale) {

      
    this.filterdata = {"title":title,"category":category,"city":city,"rent":rent,"sale":sale};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'    
      })};

    
    return this.http.post('http://localhost:8000/api/getproperties/'+page+'/'+count,JSON.stringify(this.filterdata),httpOptions);
 
       
  }
  public getCategories(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'    
      })};
    return this.http.get('http://localhost:8000/api/getcategories',httpOptions);
  }

  public getCities(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'    
      })};
    return this.http.get('http://localhost:8000/api/getcities',httpOptions);
  }


  public popularProperties(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'    
      })};
    return this.http.get('http://localhost:8000/api/popularproperties',httpOptions);
  }

  
  public RecentsProperties(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'    
      })};
    return this.http.get('http://localhost:8000/api/recentsproperties',httpOptions);
  }

  public getProperty(titleurl){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'    
      })};
    return this.http.get('http://localhost:8000/api/getproperty/'+titleurl,httpOptions);
  }


}