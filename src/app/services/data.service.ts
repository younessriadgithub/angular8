import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { HttpHeaders   } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthGuardService } from './Auth-Guard.service'
import { HeaderComponent } from '../ui/header/header.component'; 
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';


interface RoleResponse {
  name: string,
  inactive:boolean
}
interface TokenResponse {
  token: string,
  role: string,
  name: string,
  msg: string,
  inactive: false

}

@Injectable({
  providedIn: 'root'
})


export class DataService {
  inactive: false

  user :Object;
  token :string;

  role:string;


  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any, private http: HttpClient,private router:Router    ) { }

  REST(email:string){

   
    console.log("send1");
    const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json'
     })};
       this.user = {"email":email};
   
       return this.http.post('http://localhost:8000/api/rest',JSON.stringify(this.user),httpOptions);
 
   }

   sendToken(email:string){

   
    console.log("send1");
    const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json'
     })};
       this.user = {"email":email};
   
       return this.http.post('http://localhost:8000/api/sendtoken',JSON.stringify(this.user),httpOptions);
 
   }


   newUser(name:string, email:string,password:string){
   
    console.log("send1");
    const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json'//,
     //  'encype':  'multipart/form-data'

     })};
       this.user = {"name":name,"email":email,"password":password};
   
       return this.http.post('http://localhost:8000/api/register',JSON.stringify(this.user),httpOptions).subscribe(response => {
     //   this.saveToken =response as string;
     console.log(response);
    
             });
 
   }
 

 

  login(email:string,password:string){

 
      
    this.user = {"email":email,"password":password};

         
     console.log("send1");
     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};

    
    return this.http.post('http://localhost:8000/api/login',JSON.stringify(this.user),httpOptions).subscribe((data: TokenResponse) => {

        if (data.token) {
             this.isInActive(data.token);
             this.saveToken(data.token)
             this.router.navigate(['home']);

             return 'success';

        }else{

            return data.msg;

        }
    });
           
           
  }
  isInActive(token) {


    return this.http.get('http://localhost:8000/api/getrole', { headers: { Authorization: `Bearer ${token}`}}).subscribe((data: RoleResponse) => {
               console.log("isInActive"+data);
               if (data.inactive) {
                this.router.navigate(['active']);
               }else{
                  this.saveToken(token)
                  this.findRole(token);
      
                  this.findName();
                  this.router.navigate(['home']);
               }

         
       });
   

  }
  public  findRole(token) {
    this.user = {"token": token};
    return this.http.get('http://localhost:8000/api/getrole', { headers: { Authorization: `Bearer ${token}`}}).subscribe((data: RoleResponse) => {
               console.log(data);

               if (data.inactive) {
                this.inactive = this.localStorage.setItem('inactive',true)

               }else{
                this.inactive = this.localStorage.setItem('inactive',false)


               }
               this.saveRole(data.name);
               console.log("getRole "+this.getRole());

       });
   
        
        
           
           
  }

  public  findName() {
    this.user = {"token": this.getToken()};
    return this.http.get('http://localhost:8000/api/profile', { headers: { Authorization: `Bearer ${this.getToken()}`}}).subscribe((data: RoleResponse) => {

             this.localStorage.setItem('name', data.name)

              
               console.log("getName "+data.name);

       });
   
        
        
           
           
  }
  saveRole(role: string): void {
    localStorage.setItem('userRole', role)
    this.role = role
  }
   getRole() {

    return localStorage.getItem('userRole')
   
  }
  getName() {

    return localStorage.getItem('name')
   
  }
  public logout(): void {
    this.token = ''
    this.window.localStorage.clear();
    this.router.navigateByUrl('/')
  }

  public isLoggedIn(): boolean {
    this.token = this.localStorage.getItem('usertoken')

    if (this.token ) {
      return true;
    } else {
      return false
    }
  }
  public isAdmin(): boolean {
    this.token = this.localStorage.getItem('usertoken')

    if (this.token ) {
      return true;
    } else {
      return false
    }
  }


  private saveToken(token: string): void {
    this.localStorage.setItem('usertoken', token)
    this.token = token
  }
  private getToken(): string {
    if (!this.token) {
      this.token = this.localStorage.getItem('usertoken')
    }
    return this.token
  }

   public profile() {
    return this.http.get('http://localhost:8000/api/profile', { headers: { Authorization: `Bearer ${this.getToken()}`}});
  }

  public getListCategories(){
    return this.http.get('http://localhost:8000/api/categories', { headers: { Authorization: `Bearer ${this.getToken()}` } });
  }

  public getCategoriesTable(page,nbritems,name) {
    console.log(name)
    return this.http.post('http://localhost:8000/api/categories/'+page+'/'+nbritems,JSON.stringify( {"name":name}), { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }

  public getProperties(page,nbritems,name,category,maxprice,minprice) {
     return this.http.post('http://localhost:8000/api/properties/'+page+'/'+nbritems,JSON.stringify( {"name":name,"category":category,"maxprice":maxprice,"minprice":minprice}), { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }



  public getUsers(page,nbritems,name) {
    return this.http.post('http://localhost:8000/api/users/'+page+'/'+nbritems,JSON.stringify( {"name":name} ), { headers: { Authorization: `Bearer ${this.getToken()}` }  });
  }  
  public deleteView(id) {
    return this.http.delete('http://localhost:8000/api/views/'+id, { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }
  public getViews(page,nbritems,name) {
    return this.http.post('http://localhost:8000/api/views/'+page+'/'+nbritems,JSON.stringify( {"name":name}), { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }



  public getNewCartName() {
     return this.http.get('http://localhost:8000/api/newcart', { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }
  public addtocart(cartname,id,color,size) {
       const httpOptions = {  headers: new HttpHeaders({  'Content-Type':  'application/json'   })};
       return this.http.post('http://localhost:8000/api/addtocart/'+id,JSON.stringify( {"cartname":cartname,"color":color,"size":size}), { headers: { Authorization: `Bearer ${this.getToken()}` }}).subscribe(response => {
       console.log("getToken "+response);
      });
  }


   public newProperty(  title,category, description,price, area_size,phone,
                  address, near_city,  balcony, salerent, date_build, imgURL){
          console.log(salerent);
          return this.http.post('http://localhost:8000/api/newproperty',JSON.stringify( {"title":title,"category":category,"description":description ,"price":price ,"area_size":area_size,"phone":phone,"imgURL":imgURL,"address":address,"near_city":near_city,"salerent":salerent,"balcony":balcony,"date_build":date_build }), { headers: { Authorization: `Bearer ${this.getToken()}` }}).subscribe(response => {
            console.log(response);
          });
   }
   public updateProperty( id, title,category, description,price, area_size,phone,
    address, near_city,  balcony, salerent, date_build,enable, imgURL){
        console.log(salerent);
        return this.http.put('http://localhost:8000/api/property/'+id,JSON.stringify( {"title":title,"category":category,"description":description ,"price":price ,"area_size":area_size,"phone":phone,"imgURL":imgURL,"address":address,"near_city":near_city,"salerent":salerent,"balcony":balcony,"enable":enable,"date_build":date_build }), { headers: { Authorization: `Bearer ${this.getToken()}` }}).subscribe(response => {
        console.log(response);
        });
    }

   newCategory(name){
    return this.http.post('http://localhost:8000/api/newcategory',JSON.stringify( {"name":name }), { headers: { Authorization: `Bearer ${this.getToken()}` }}).subscribe(response => {
      console.log("getToken "+response);
    });

   }



   updateCategory(id,name){
      return this.http.put('http://localhost:8000/api/updatecategory/'+id,JSON.stringify( {"name":name}), { headers: { Authorization: `Bearer ${this.getToken()}` }}).subscribe(response => {
        console.log("getToken "+response);
        });
    }


    propertybyid(id) {
    return this.http.get('http://localhost:8000/api/property/'+id, { headers: { Authorization: `Bearer ${this.getToken()}` }});
   }




   public updateUser(userid,role){
    console.log('role'+role);

    return this.http.put('http://localhost:8000/api/updateuser/'+userid,JSON.stringify( {"role":role}), { headers: { Authorization: `Bearer ${this.getToken()}` }});
 
 
  }


  public RestPassword(userid,password){
    return this.http.post('http://localhost:8000/api/restpassword/'+userid,JSON.stringify({"password":password}), { headers: { Authorization: `Bearer ${this.getToken()}` }});


  }
  public activeAccount(token){
    console.log(token)
    return this.http.post('http://localhost:8000/api/activeaccount',JSON.stringify({"password":""}), { headers: { Authorization: `Bearer ${token}` }});

  }


  ChangePassword(token:string,password:string){
     
    return this.http.post('http://localhost:8000/api/changepassword/',JSON.stringify({"password":password}), { headers: { Authorization: `Bearer ${token}` }});

   }
   updateUserProfile(name:string,email:string,imgURL:string){
     
    return this.http.put('http://localhost:8000/api/updateuserprofile/',JSON.stringify({"name":name,"email":email,"imgURL":imgURL}), { headers: { Authorization: `Bearer ${this.getToken()}` }});

   }

   newPassword(oldpassword:string,newpassword:string){
     
    return this.http.put('http://localhost:8000/api/newpassword/',JSON.stringify({"oldpassword":oldpassword,"newpassword":newpassword}), { headers: { Authorization: `Bearer ${this.getToken()}` }});

   }
 
   getCount() {
    return this.http.get('http://localhost:8000/api/statistic', { headers: { Authorization: `Bearer ${this.getToken()}` }});
   }



   public sendMail() {
    return this.http.post('http://localhost:8000/api/sendmail',JSON.stringify( {"name":'youness',"email":'younessriadme@gmail.com',"body":'click here'}), { headers: { Authorization: `Bearer ${this.getToken()}` }});
  }

  public sendCantact(email,object,body) {

    console.log("ne"+email);

    const httpOptions = {  headers: new HttpHeaders({  'Content-Type':  'application/json'   })};
    return this.http.post('http://localhost:8000/api/sendcantact',JSON.stringify( {"email":email,"object":object,"body":body}), httpOptions);
  }


  public sendMailrest(email) {
    console.log("email "+email);

    const httpOptions = {  headers: new HttpHeaders({  'Content-Type':  'application/json'   })};
    return this.http.post('http://localhost:8000/api/sendmailrest',JSON.stringify( {"email":email}), httpOptions);
  }
  NewPassword(oldpassword,newpassword){

    const httpOptions = {  headers: new HttpHeaders({  'Content-Type':  'application/json'   })};

    return this.http.post('http://localhost:8000/api/newpassword',JSON.stringify( {"oldpassword":oldpassword,"newpassword":newpassword}), httpOptions);


  }

  getUsersChart(){


    return this.http.get('http://localhost:8000/api/chartusers' ,{ headers: { Authorization: `Bearer ${this.getToken()}` }});


  }

  getPropertiesChart(){


    return this.http.get('http://localhost:8000/api/chartproperties', { headers: { Authorization: `Bearer ${this.getToken()}` }});


  }
  getViewsChart(){


    return this.http.get('http://localhost:8000/api/chartviews',  { headers: { Authorization: `Bearer ${this.getToken()}` }});


  }


  onContact(email:string,subject:string,body:string){

 
      
    var contact = {"email":email,"subject":subject,"body":body};

          
     console.log(contact);
     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      
    
      })};

    
    return this.http.post('http://localhost:8000/api/contact',JSON.stringify(contact),httpOptions);
           
  }
}


