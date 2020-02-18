import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WINDOW } from '@ng-toolkit/universal';



interface usersdata {
  "count":number,"nmbrepage":number, users:[] ,
}
interface categoriesdata {
  "count":number,"nmbrepage":number,"page":number, categories:[] ,
}
interface propertiesdata {
  "count":number,"nmbrepage":number,"page":number, properties:[] ,
}
interface viewsdata {
 "nmbrepage":number, views:[] ,
}

interface property{
  "title":string,
  "category":string,
  "description":string,
  "price":number,
  "area_size":number,
  "phone":string,
  "address":string,
  "near_city":string,
  "balcony":number,
  "enable":number,
  "salerent":number,
  "date_build":Date
 }
 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  views: Object;
  count: Object;
  users: Object;
  properties: Object;
  property:Object;
  categories:Object;
  allcategories:Object;

  chartcategories:Object;


  propertiesfrm=false;
  newpropertyfrm=false;
  editpropertyfrm=false;

  viewsfrm=false;

  newcategoryfrm=false;
  categoriesfrm=false;
  editcategoryfrm=false;

  usersfrm=false;
  edituserfrm=false;
  userschart=false;
  categorieschart=false;
  viewschart=false;
  propertieschart=false;


  usersdata=[];
  lmbrpage=[];
  _currentValues = [];
  searchVal='';
  newproperty=false;
  title = ' LAP ';
  viewsdata= [];
  propertiesdata=[];
  view: any[] = [600, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Views';
  timeline = true;
  userscreate=[];
  page=1;
  nbritems=9;
  nmbrpage=4;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  serverimg:String;


 public datacategories = [];

  propertyForm: FormGroup;  epropertyForm: FormGroup; euserForm: FormGroup;
  categoryForm: FormGroup;  edtcategoryForm: FormGroup;

  submitted = false;
  success = false;
  public imagePath;
  imgURL: any;
  public message: string;

  propertyid=0;
  userid=0;
  categoryid=0;
  eusername:string;
  name:string;

  results:Object;
  constructor(@Inject(WINDOW) private window: Window,  private cookieService: CookieService ,private data: DataService, private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.serverimg="http://localhost:8000/images/";

    this.propertyForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      area_size: ['', Validators.required], 
      phone: ['', Validators.required],
      address:['', Validators.required],
      near_city:['', Validators.required],
      balcony: ['', Validators.required],
      salerent: ['', Validators.required],
      date_build:['', Validators.required]

    });
  
    this.epropertyForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      area_size: ['', Validators.required], 
      phone: ['', Validators.required],
      address:['', Validators.required],
      near_city:['', Validators.required],
      balcony: ['', Validators.required],
      salerent: ['', Validators.required],
      date_build:['', Validators.required],
      enable: ['', Validators.required]
    });
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.edtcategoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  
    this.euserForm= this.formBuilder.group({
      status: ['', Validators.required], role: ['', Validators.required]

    });   


    this.data.getCount().subscribe(data => {
         this.count = data;
         console.log(this.count);
    });
  //  this.data.sendMail().subscribe(data => {  console.log(data);  });
    this.name='';

    this.getViewsChart();
  }

  onSearch(searchVal: string) {
    this.searchVal = searchVal;
    console.log( this.searchVal+" searchVal");
    this.getpage(1);

    
  }



  sendMail( ){

    console.log('mail'); 
    this.data.sendMail().subscribe(data => {  console.log(data);  });


  }
    updateClick( ){

    this.data.getUsers(this.page,this.nbritems,this.name).subscribe((data:usersdata) => {
      this.users = data.users;
         console.log(this.users);
         console.log( data);
         this.nmbrpage = data.nmbrepage;

         this.lmbrpage=[];
         for (let index = 1; index <= this.nmbrpage ; index++) {
          this.lmbrpage[index]=[index];
           
         }
 
       }
     );
     this.data.getProperties(this.page,this.nbritems,this.searchVal,'','4000','0').subscribe((data:propertiesdata) => {
            this.properties = data.properties;
            console.log( data);
            this.nmbrpage = data.nmbrepage;

            this.lmbrpage=[];
            for (let index = 1; index <= this.nmbrpage ; index++) {
             this.lmbrpage[index]=[index];
              
            }
 
 
       } );

  }
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

 

  onNewProperty(){

    this.propertiesfrm=false;
    this.viewsfrm=false;
    
    this.newcategoryfrm=false;
    this.categoriesfrm=false;
    this.editcategoryfrm=false;
    this.usersfrm=false;
    this.edituserfrm=false;
    this.userschart=false;
    this.categorieschart=false;
    this.viewschart=false;
    this.editpropertyfrm=false;
    this.newpropertyfrm=true;
    this.propertieschart=false;



    this.submitted = true;
    this.data.newProperty(
      this.propertyForm.controls.title.value,this.propertyForm.controls.category.value,
      this.propertyForm.controls.description.value,this.propertyForm.controls.price.value,
      this.propertyForm.controls.area_size.value,this.propertyForm.controls.phone.value,
      this.propertyForm.controls.address.value, this.propertyForm.controls.near_city.value,
      this.propertyForm.controls.balcony.value, this.propertyForm.controls.salerent.value,
      this.propertyForm.controls.date_build.value, this.imgURL
      );

    if (this.propertyForm.invalid) {
        return;
    }

  }

  UpdateProperty(propertyid){

      this.propertiesfrm=false;
      this.newpropertyfrm=false;
      this.viewsfrm=false;
      
      this.newcategoryfrm=false;
      this.categoriesfrm=false;
      this.editcategoryfrm=false;
      this.usersfrm=false;
      this.edituserfrm=false;
      this.userschart=false;
      this.categorieschart=false;
      this.viewschart=false;
      this.propertieschart=false;

      this.editpropertyfrm=true;
      this.propertyid=propertyid;
      this.data.propertybyid( this.propertyid).subscribe((data:property) => {
        this.property=data;
        console.log(this.property)
        this.epropertyForm.controls.title.setValue(data.title);
        this.epropertyForm.controls.category.setValue(data.category);
        this.epropertyForm.controls.description.setValue(data.description);
        this.epropertyForm.controls.price.setValue(data.price);
        this.epropertyForm.controls.area_size.setValue(data.area_size);
        this.epropertyForm.controls.phone.setValue(data.phone);
        this.epropertyForm.controls.address.setValue(data.address);
        this.epropertyForm.controls.near_city.setValue(data.near_city);
        this.epropertyForm.controls.balcony.setValue(data.balcony);
        this.epropertyForm.controls.salerent.setValue(data.salerent);
        this.epropertyForm.controls.date_build.setValue(data.date_build);
        this.epropertyForm.controls.enable.setValue(data.enable);
      //  this.imgURL=data.imgURL;

      this.data.getListCategories().subscribe(data => {
        this.allcategories=data;
      })
  
      });
    
  }

  onUpdateProperty(){
 
  
    this.submitted = true;
    this.data.updateProperty(this.propertyid,
      this.epropertyForm.controls.title.value,this.epropertyForm.controls.category.value,
      this.epropertyForm.controls.description.value,this.epropertyForm.controls.price.value,
      this.epropertyForm.controls.area_size.value,this.epropertyForm.controls.phone.value,
      this.epropertyForm.controls.address.value, this.epropertyForm.controls.near_city.value,
      this.epropertyForm.controls.balcony.value, this.epropertyForm.controls.salerent.value,
      this.epropertyForm.controls.date_build.value,this.epropertyForm.controls.enable.value, this.imgURL
      );

    if (this.propertyForm.invalid) {
        return;
    }

  }




  getnewCategoryfrm(){
 
    this.propertiesfrm=false;
    this.newpropertyfrm=false;
    this.editpropertyfrm=false;
    this.viewsfrm=false;
    
    this.editcategoryfrm=false;
    this.categoriesfrm=false;
    this.usersfrm=false;
    this.edituserfrm=false;
    this.userschart=false;
    this.categorieschart=false;
    this.viewschart=false;
    this.propertieschart=false;

    this.newcategoryfrm=true;

  }
  onNewCategory(){
 
    this.submitted = true;
    this.data.newCategory(this.categoryForm.controls.name.value)

    if (this.categoryForm.invalid) {
        return;
    }

  }
  onEditCategory(categoryid,categoryname){
    this.propertiesfrm=false;
    this.newpropertyfrm=false;
    this.editpropertyfrm=false;
    this.viewsfrm=false;
    
    this.newcategoryfrm=false;
    this.categoriesfrm=false;
    this.usersfrm=false;
    this.edituserfrm=false;
    this.userschart=false;
    this.categorieschart=false;
    this.viewschart=false;
    this.propertieschart=false;

    this.editcategoryfrm=true;
    this.categoryid=categoryid;
    this.edtcategoryForm.controls.name.setValue(categoryname);
  }

  onUpdateCategory(){
 
    this.submitted = true;
    this.data.updateCategory(this.categoryid, this.edtcategoryForm.controls.name.value );

    if (this.edtcategoryForm.invalid) {
        return;
    }
    this.getCategoriesfrm();
  }


  frmnewproperty(){
    this.newproperty=true;
  }

  getViewsfrm(){
    this.propertiesfrm=false;
    this.newpropertyfrm=false;    
    this.editpropertyfrm=false;
    
    this.newcategoryfrm=false;
    this.categoriesfrm=false;
    this.editcategoryfrm=false;
    this.usersfrm=false;
    this.edituserfrm=false;
    this.userschart=false;
    this.categorieschart=false;
    this.viewschart=false;
    this.propertieschart=false;

    this.viewsfrm=true;
    this.page=1;

    this.data.getViews(this.page,this.nbritems,this.name).subscribe((data:viewsdata) => {
      this.views = data.views;
      this.nmbrpage = data.nmbrepage;

         console.log(this.views);



    if(this.page==0){
      this.page=1;
    }
    this.lmbrpage=[];
    for (let index = 1; index <= this.nmbrpage ; index++) {
      this.lmbrpage[index]=[index];
      
    }
    });


    //this.getCategoriesfrm();
  }
  deleteView(id){
  
  
    this.data.deleteView(id).subscribe(data => {
        this.getViewsfrm();
    });

  }

  getUsersfrm(){
    this.page=1;

    this.propertiesfrm=false;
    this.newpropertyfrm=false;    
    this.editpropertyfrm=false;
    this.viewsfrm=false;
    
    this.newcategoryfrm=false;
    this.categoriesfrm=false;
    this.editcategoryfrm=false;
    this.edituserfrm=false;
    this.userschart=false;
    this.categorieschart=false;
    this.viewschart=false;
    this.propertieschart=false;


    this.usersfrm=true;

    this.data.getUsers(this.page,this.nbritems,this.name).subscribe((data:usersdata) => {
         this.users = data.users;

         this.nmbrpage = data.nmbrepage;

         this.lmbrpage=[];
         for (let index = 1; index <= this.nmbrpage ; index++) {
          this.lmbrpage[index]=[index];
           
         }


     });
  }

  getEditUserfrm(user){
    this.userid=user.id;
    this.eusername=user.name;

    this.propertiesfrm=false;
    this.newpropertyfrm=false;    
    this.editpropertyfrm=false;
    this.viewsfrm=false;
    
    this.newcategoryfrm=false;
    this.categoriesfrm=false;
    this.editcategoryfrm=false;


    this.usersfrm=false;

    this.userschart=false;
    this.categorieschart=false;
    this.viewschart=false;
    this.propertieschart=false;

    this.edituserfrm=true;
   

  }

  onUpdateUser(){
  
    this.data.updateUser(this.userid,this.euserForm.controls.role.value).subscribe(data => {
      this.getUsersfrm();
   });
   

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

      if (this.usersfrm==true) {
      this.data.getUsers(this.page,this.nbritems,this.name).subscribe((data:usersdata) => {
        this.users = data.users;
          console.log(this.users);
      this.nmbrpage = data.nmbrepage;
      if(this.page==0){
        this.page=1;
      }
      this.lmbrpage=[];
      for (let index = 1; index <= this.nmbrpage ; index++) {
        this.lmbrpage[index]=[index];
        
      }
      });
      }else if  (this.categoriesfrm==true) {

          this.data.getCategoriesTable(this.page,this.nbritems,this.searchVal).subscribe((data:categoriesdata) => {
              this.categories = data.categories;
              console.log(this.categories);
              this.nmbrpage = data.nmbrepage;
              if(this.page==0){
                this.page=1;
              }
              this.lmbrpage=[];
              for (let index = 1; index <= this.nmbrpage ; index++) {
                this.lmbrpage[index]=[index];
                
              }
          });


      }else if  (this.viewsfrm==true) {
      this.data.getViews(this.page,this.nbritems,this.name).subscribe((data:viewsdata) => {
        this.views = data.views;
          console.log(this.views);
      this.nmbrpage = data.nmbrepage;
  
      this.lmbrpage=[];
      for (let index = 1; index <= this.nmbrpage ; index++) {
        this.lmbrpage[index]=[index];
        
      }
      });
      } else if  (this.propertiesfrm==true) {
        
          this.data.getProperties(this.page,this.nbritems,this.searchVal,'',4000,0).subscribe((data:propertiesdata) => {
            this.properties = data.properties;
            console.log( data);
            this.nmbrpage = data.nmbrepage;

            this.lmbrpage=[];
            for (let index = 1; index <= this.nmbrpage ; index++) {
             this.lmbrpage[index]=[index];
              
            }
 
 
       } );

  }
 


  }
  getPropertiesfrm(){
       this.page=1;
       this.editpropertyfrm=false;
       this.newpropertyfrm=false;    
       this.viewsfrm=false;
       
       this.newcategoryfrm=false;
       this.categoriesfrm=false;
       this.editcategoryfrm=false;
       this.usersfrm=false;
       this.edituserfrm=false;
       this.userschart=false;
       this.categorieschart=false;
       this.viewschart=false;
       this.propertieschart=false;


       this.propertiesfrm=true;

       this.data.getProperties(this.page,this.nbritems,this.searchVal,'',4000,0).subscribe((data:propertiesdata) => {
        this.properties = data.properties;
        console.log(  this.properties);
        this.nmbrpage = data.nmbrepage;

        this.lmbrpage=[];
        for (let index = 1; index <= this.nmbrpage ; index++) {
         this.lmbrpage[index]=[index];
          
        }


      } );





  }

  getNewPropertyfrm(){
    this.propertiesfrm=false;
    this.editpropertyfrm=false;
    this.viewsfrm=false;
    
    this.newcategoryfrm=false;
    this.categoriesfrm=false;
    this.editcategoryfrm=false;
    this.usersfrm=false;
    this.edituserfrm=false;
    this.userschart=false;
    this.categorieschart=false;
    this.viewschart=false;
    this.propertieschart=false;

    this.newpropertyfrm=true;

    this.data.getListCategories().subscribe(data => {
      this.allcategories=data;
    })

  }

  
  getNewCategoryfrm(){
    this.propertiesfrm=false;
    this.newpropertyfrm=false;    
    this.editpropertyfrm=false;
    
    this.categoriesfrm=false;
    this.editcategoryfrm=false;
    this.usersfrm=false;
    this.edituserfrm=false;
    this.userschart=false;
    this.categorieschart=false;
    this.viewschart=false;
    this.propertieschart=false;

    this.newcategoryfrm=true;
  }

  getCategoriesfrm(){
    this.propertiesfrm=false;
    this.newpropertyfrm=false;    
    this.editpropertyfrm=false;
    this.viewsfrm=false;
    
    this.newcategoryfrm=false;
    this.editcategoryfrm=false;
    this.usersfrm=false;
    this.edituserfrm=false;
    this.userschart=false;
    this.categorieschart=false;
    this.viewschart=false;
    this.propertieschart=false;


    this.categoriesfrm=true;
    this.page=1;
    this.data.getCategoriesTable(this.page,this.nbritems,this.searchVal).subscribe((data : categoriesdata) => {
      this.categories = data.categories;

      this.nmbrpage = data.nmbrepage;

      this.lmbrpage=[];
      for (let index = 1; index <= this.nmbrpage ; index++) {
       this.lmbrpage[index]=[index];
        
      }
      console.log(this.categories);
    });
  }

  getCategorieschart(){

    this.propertiesfrm=false;
    this.newpropertyfrm=false;    
    this.editpropertyfrm=false;
    this.viewsfrm=false;
    
    this.newcategoryfrm=false;
    this.categoriesfrm=false;
    this.editcategoryfrm=false;
    this.usersfrm=false;
    this.edituserfrm=false;
    this.userschart=false;
    this.viewschart=false;
    this.propertieschart=false;


    this.categorieschart=true;

    this.data.getListCategories().subscribe((data:[]) => {
    this.datacategories = data;
      console.log(data);

    });

  }

 
  getUserschart(){
    this.propertiesfrm=false;
    this.newpropertyfrm=false;    
    this.editpropertyfrm=false;
    this.viewsfrm=false;
    
    this.newcategoryfrm=false;
    this.categoriesfrm=false;
    this.editcategoryfrm=false;
    this.usersfrm=false
    ;this.edituserfrm=false;
    this.categorieschart=false;
    this.viewschart=false;
    this.propertieschart=false;

    this.userschart=true;

   // this.getCategoriesfrm();
   this.data.getUsersChart().subscribe((data:[] )=> {
    this.usersdata= data;
    console.log(this.usersdata);

  });



  }

  getViewsChart(){
      this.propertiesfrm=false;
      this.newpropertyfrm=false;    
      this.editpropertyfrm=false;
      this.viewsfrm=false;
      
      this.newcategoryfrm=false;
      this.categoriesfrm=false;
      this.editcategoryfrm=false;
      this.usersfrm=false;
      this.edituserfrm=false;
      this.userschart=false;
      this.categorieschart=false;
      this.propertieschart=false;
      this.viewschart=true;

      this.view= [this.window.innerWidth-100, 400];
      this.data.getViewsChart().subscribe((data:[] )=> {
        this.viewsdata= data;
        console.log(this.viewsdata);
      });
  }


  getPropertiesChart(){
    this.propertiesfrm=false;
    this.newpropertyfrm=false;    
    this.editpropertyfrm=false;
    this.viewsfrm=false;
    
    this.newcategoryfrm=false;
    this.categoriesfrm=false;
    this.editcategoryfrm=false;
    this.usersfrm=false;
    this.edituserfrm=false;
    this.userschart=false;
    this.categorieschart=false;
    this.viewschart=false;
    this.propertieschart=true;

    console.log("width"+ this.window.innerWidth);

    this.view= [this.window.innerWidth-100, 400];

    this.data.getPropertiesChart().subscribe((data:[] )=> {
      this.propertiesdata= data;

      console.log(this.propertiesdata);
    });
}






}