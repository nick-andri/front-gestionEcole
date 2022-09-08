import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentUsername : string ;


  constructor(private authService:AuthenticationService) {
    this.currentUsername = this.authService.currentUserValue.nom;
  }

  ngOnInit(): void {

  }

  logout():void{
    this.authService.logout();

  }

}
