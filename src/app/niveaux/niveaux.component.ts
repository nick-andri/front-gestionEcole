import { Component, OnInit } from '@angular/core';
import {Niveaux} from "../_models/niveaux";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NiveauxService} from "../_services/niveaux.service";

@Component({
  selector: 'app-niveaux',
  templateUrl: './niveaux.component.html',
  styleUrls: ['./niveaux.component.css']
})
export class NiveauxComponent implements OnInit {

  niveaux?: Niveaux[];
  itemsPerPage: number;
  currentPage:number;
  totalItems:number;
  searchExpression:string;
  searchForm: FormGroup;

  constructor(private formBuilder:FormBuilder,private router:Router,private niveauxService :NiveauxService) {
    this.searchForm = this.formBuilder.group({
      searchExpression:['']
    });
    this.searchExpression = '';
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;

    this.getNiveauxList();
  }

  ngOnInit(): void {
    this.getNiveauxList();
    console.log(this.niveaux);
  }


  private getNiveauxList() {
    this.niveauxService.getCount().subscribe(n =>{
      this.totalItems=n;
    })
    this.niveauxService.getAllByPage(this.currentPage,this.itemsPerPage)
      .subscribe(niveaux =>{this.niveaux = niveaux;})
  }

  pageChanged(page:number){
    this.currentPage = page;
    this.getNiveauxList();
  }

  onSubmit(){

    this.niveauxService.getSearch(this.currentPage,this.itemsPerPage,this.searchForm.get('searchExpression')?.value)
      .subscribe(niveaux => { this.niveaux = niveaux});



  }

  delete(element: number) {

    this.niveauxService.delete(element).subscribe(()=>{
      this.getNiveauxList();
    });
  }

  reset() {
    this.getNiveauxList();
  }

}
