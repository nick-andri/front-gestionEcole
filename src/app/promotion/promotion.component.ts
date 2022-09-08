import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {basePromotionDto, Promotion, PromotionDto} from "../_models/promotion";
import {PromotionService} from "../_services/promotion.service";
import {Ville} from "../_models/ville";
import {TitrePro} from "../_models/titre-pro";
import {VilleService} from "../_services/ville.service";
import {TitreProService} from "../_services/titre-pro.service";

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  promotions?: Promotion[];
  listeVille:String[];
  listeTitrePro:String[];
  itemsPerPage: number;
  currentPage:number;
  totalItems:number;
  searchExpression:string;
  searchForm: FormGroup;



  constructor(private formBuilder:FormBuilder,private router:Router,
              private promotionService :PromotionService,private villeService:VilleService,
              private titreProService:TitreProService) {

    this.searchForm = this.formBuilder.group({
      searchExpression:['']
    });
    this.searchExpression = '';
    this.itemsPerPage = 10;
    this.currentPage = 1;
    this.totalItems = 0;
    this.listeVille=[];
    this.listeTitrePro=[];
    this.getPromotionsList();

  }

  ngOnInit(): void {
    this.getPromotionsList();

  }


  private getPromotionsList() {
    let promoDto:PromotionDto=basePromotionDto;
    this.promotionService.getCount().subscribe(n =>{
      this.totalItems=n;
    });

    this.promotionService.getAllByPage(this.currentPage,this.itemsPerPage).subscribe(promotions =>{
              this.promotions = promotions
              this.getListTitrePro(this.promotions);
              this.getListVille(this.promotions);
    });

  }

  pageChanged(page:number){
    this.currentPage = page;
    this.getPromotionsList();
  }

  onSubmit(){

    this.promotionService.getSearch(this.currentPage,this.itemsPerPage,this.searchForm.get('searchExpression')?.value)
      .subscribe(promotions => { this.promotions = promotions});

  }

  delete(element: number) {

    this.promotionService.delete(element).subscribe(()=>{
      this.getPromotionsList();
    });
  }

  reset() {
    this.searchExpression='';
    this.getPromotionsList();
  }


  getListTitrePro(promotion :Promotion[]){
    this.listeTitrePro=[];
    promotion.map(promotion =>{
      this.titreProService.findById(promotion.titreProfessionnelId).subscribe(t =>{
        this.listeTitrePro.push(t.titre);
      });
    });
  }


  getListVille(promotion :Promotion[]){
    this.listeVille =[];
    promotion.map(promotion =>{
      this.villeService.findById(promotion.villeId).subscribe(v =>{
        this.listeVille.push(v.nom);
      });
    });
  }
}
