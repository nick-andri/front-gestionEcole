import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../_models/user";
import {UserService} from "../../_services/user.service";
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user?:User;
  id :number =0;


  constructor(private route:ActivatedRoute,private userservice:UserService,private location:LocationStrategy) { }

  ngOnInit(): void {
    const params = this.route.snapshot.paramMap;
    const id = params.get('id');

    this.id = +(id as string);
    this.userservice.findById(this.id).subscribe(u => {this.user = u} );
  }

  goBack() {
    this.location.back();
  }
}
