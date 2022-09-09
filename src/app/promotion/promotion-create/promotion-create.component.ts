import { Component, OnInit } from '@angular/core';
import {basePromotion, Promotion} from "../../_models/promotion";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocationStrategy} from "@angular/common";
import {PromotionService} from "../../_services/promotion.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-promotion-create',
  templateUrl: './promotion-create.component.html',
  styleUrls: ['./promotion-create.component.css']
})
export class PromotionCreateComponent implements OnInit {


  promotion:Promotion=basePromotion;

  promotionUp:Promotion;
  isUpdate:Boolean =false;
  createForm :FormGroup;


  constructor(
    private  location: LocationStrategy,
    private formBuilder:FormBuilder,private promotionService:PromotionService,private router:Router,
    private route:ActivatedRoute){

    this.createForm =this.formBuilder.group({
      id:'',
      version:'',
      description:'',
      dateDebut:'',
      dateFin:'',
      titreProfessionnelId:'',
      villeId:'',
    })

    this.promotionUp=this.promotion;

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.isUpdate);
    if(id){
      this.isUpdate = true;
      this.promotionService.findById(+id).subscribe(
        t =>{
          this.promotion=t;
          this.createForm.controls["dateDebut"].setValue(this.promotion.dateDebut);
          this.createForm.controls["dateFin"].setValue(this.promotion.dateFin);
          this.createForm.controls["description"].setValue(this.promotion.description);
        })
    }
  }

  affectUser(){

    this.promotionUp.id = this.promotion.id;
    this.promotionUp.dateDebut = this.createForm.get('dateDebut')?.value;
    this.promotionUp.dateFin = this.createForm.get('dateFin')?.value;

    this.promotionUp.description=this.createForm.get('description')?.value;

    this.promotionUp.version =this.promotion.version;
  }

  onSubmit() {

    this.affectUser();

    if(this.isUpdate){

      this.update();
    }else {
      this.create();
    }

    this.goBack();

  }

  goBack() {
    /*navigation vers page précéedente avec maj donnée*/
    this.router.navigate([this.location.path().split('/')[1]]);
  }

  private create() {
    this.promotionService.save(this.promotionUp).subscribe();
  }

  private update() {
    this.promotionService.update(this.promotionUp).subscribe();
  }

}
