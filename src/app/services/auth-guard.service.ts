import { Injectable } from '@angular/core'
import { DataService } from './data.service'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private data:DataService,   private router: Router) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const role =localStorage.getItem('userRole');

     
      console.log("role "+ route.data.roles.indexOf(role));

          // check if route is restricted by role
          if (route.data.roles.indexOf(role)==-1) {
            console.log("role "+role);
            console.log("role "+route.data.roles );
            this.router.navigate(['/login']);
            return false;
          }else{

            console.log("role"+role);
            console.log("role"+route.data.roles );
            //  this.router.navigate(['/']);
              return true;


          }
     
  }
  

  canDeactivate(){
    if (!this.data.isAdmin()) {
      this.router.navigateByUrl('/')
      return false

    }
    return true

  }

  
}
