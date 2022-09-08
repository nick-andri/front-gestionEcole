import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Ville} from "../_models/ville";
import {VilleService} from "../_services/ville.service";

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {

  villes?: Ville[];
  itemsPerPage: number;
  currentPage:number;
  totalItems:number;
  searchExpression:string;
  searchForm: FormGroup;

  constructor(private formBuilder:FormBuilder,private router:Router,private villeService :VilleService) {
    this.searchForm = this.formBuilder.group({
      searchExpression:['']
    });
    this.searchExpression = '';
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;

    this.getVillesList();
  }

  ngOnInit(): void {
    this.getVillesList();
    console.log(this.villes);
  }


  private getVillesList() {
    this.villeService.getCount().subscribe(n =>{
      this.totalItems=n;
    })
    this.villeService.getAllByPage(this.currentPage,this.itemsPerPage)
      .subscribe(villes =>{this.villes = villes;})
  }

  pageChanged(page:number){
    this.currentPage = page;
    this.getVillesList();
  }

  onSubmit(){

    this.villeService.getSearch(this.currentPage,this.itemsPerPage,this.searchForm.get('searchExpression')?.value)
      .subscribe(villes => { this.villes = villes});



  }

  delete(element: number) {

    this.villeService.delete(element).subscribe(()=>{
      this.getVillesList();
    });
  }

  reset() {
    this.getVillesList();
  }
}
