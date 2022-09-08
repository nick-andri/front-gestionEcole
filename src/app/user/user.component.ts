import { first } from 'rxjs';
import { UserService } from './../_services/user.service';
import { Form, FormGroup, FormBuilder } from '@angular/forms';
import { User } from './../_models/user';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  users?: User[];
  itemsPerPage: number;
  currentPage:number;
  totalItems:number;
  searchExpression:string;
  searchForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private userService:UserService,private router:Router ) {
    this.searchForm = this.formBuilder.group({
      searchExpression:['']
    });


    this.searchExpression = '';
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;
    this.getUsersList();


  }


  ngOnInit(): void {
    this.getUsersList();

  }

  getUsersList(){
    this.userService.countUsers().subscribe(nb=> {
      this.totalItems = nb;

    })

    this.userService.getAllByPage(this.currentPage, this.itemsPerPage).subscribe(users=> {
      this.users = users;
    })
  }

  pageChanged(page:number){
    this.currentPage = page;
    this.getUsersList();
  }

  onSubmit(){
    console.log(this.users);
   this.userService.getAll(this.currentPage,this.itemsPerPage,this.searchForm.get('searchExpression')?.value)
     .subscribe(users => { this.users = users});

  }



  delete(element: number) {

    this.userService.delete(element).subscribe(()=>{
      this.getUsersList();
    });
  }


}
