import { Component, OnInit } from '@angular/core';
import {Ville} from "../../_models/ville";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocationStrategy} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {VilleService} from "../../_services/ville.service";

@Component({
  selector: 'app-ville-create',
  templateUrl: './ville-create.component.html',
  styleUrls: ['./ville-create.component.css']
})
export class VilleCreateComponent implements OnInit {

  ville:Ville={
    id:0,
    version:0,
    nom:'default',
    slug:'default'
  };

  villeUp:Ville;
  isUpdate:Boolean =false;
  createForm :FormGroup;


  constructor(
    private  location: LocationStrategy,
    private formBuilder:FormBuilder,private villeService:VilleService,private router:Router,
    private route:ActivatedRoute){

    this.createForm =this.formBuilder.group({
      id:'',
      nom:'',
      slug:'',
      version:''
    })

    this.villeUp=this.ville;
    console.log('construct : '+this.isUpdate);

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.isUpdate);
    if(id){
      this.isUpdate = true;
      this.villeService.findById(+id).subscribe(
        t =>{
          this.ville=t;
          this.createForm.controls["slug"].setValue(this.ville.slug);
          this.createForm.controls["nom"].setValue(this.ville.nom);
        })
    }
  }

  affectUser(){

    this.villeUp.id = this.ville.id;
    this.villeUp.slug = this.createForm.get('slug')?.value;

    this.villeUp.nom=this.createForm.get('nom')?.value;

    this.villeUp.version =this.ville.version;
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
    this.villeService.save(this.villeUp).subscribe();
  }

  private update() {
    this.villeService.update(this.villeUp).subscribe();
  }

}
