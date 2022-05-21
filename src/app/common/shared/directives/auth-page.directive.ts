import { Directive, OnInit } from '@angular/core'
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Directive({
    selector: '[root]'
})

export class AuthPage implements OnInit{

    constructor(private localStorageService: LocalStorageService,private router : Router) { }

    ngOnInit() {
       var userclaims = this.localStorageService.getItem("usrLgndt").objModel.user_claims;
       var urlUser = this.router.url.split("/")[1];

       var refMenu = userclaims.find(function (element) {
        return element.md_link === urlUser
       });

       if(refMenu === undefined){
           this.router.navigateByUrl('/start');
       }       
    }
}