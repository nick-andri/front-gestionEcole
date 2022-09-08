import { Component, OnInit } from '@angular/core';
import {TitrePro} from "../_models/titre-pro";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {TitreProService} from "../_services/titre-pro.service";

@Component({
  selector: 'app-titre-pro',
  templateUrl: './titre-pro.component.html',
  styleUrls: ['./titre-pro.component.css']
})
export class TitreProComponent implements OnInit {

  titres?: TitrePro[];
  itemsPerPage: number;
  currentPage:number;
  totalItems:number;
  searchExpression:string;
  searchForm: FormGroup;

  constructor(private formBuilder:FormBuilder,private router:Router,private titreProService :TitreProService) {
    this.searchForm = this.formBuilder.group({
      searchExpression:['']
    });
    this.searchExpression = '';
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;

    this.getTitresList();
  }

  ngOnInit(): void {
    this.getTitresList();
    console.log(this.titres);
  }


  private getTitresList() {
      this.titreProService.getCount().subscribe(n =>{
        this.totalItems=n;
      })
      this.titreProService.getAllByPage(this.currentPage,this.itemsPerPage)
        .subscribe(titres=>{this.titres = titres;})
  }

  pageChanged(page:number){
    this.currentPage = page;
    this.getTitresList();
  }

  onSubmit(){

    this.titreProService.getSearch(this.currentPage,this.itemsPerPage,this.searchForm.get('searchExpression')?.value)
      .subscribe(titres => { this.titres = titres});



  }

  delete(element: number) {

    this.titreProService.delete(element).subscribe(()=>{
      this.getTitresList();
    });
  }
}
