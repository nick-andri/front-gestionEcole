import { Component, OnInit } from '@angular/core';
import {TitrePro} from "../../_models/titre-pro";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocationStrategy} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {TitreProService} from "../../_services/titre-pro.service";

@Component({
  selector: 'app-titre-create',
  templateUrl: './titre-create.component.html',
  styleUrls: ['./titre-create.component.css']
})
export class TitreCreateComponent implements OnInit {

  titre:TitrePro={
    id:0,
    titre:'default',
    version:0,
    slug:'default'
  };

  titreUp:TitrePro;
  isUpdate:Boolean =false;
  createForm :FormGroup;


  constructor(
    private  location: LocationStrategy,
    private formBuilder:FormBuilder,private titreProService:TitreProService,private router:Router,
    private route:ActivatedRoute){

    this.createForm =this.formBuilder.group({
      id:'',
      titre:'',
      slug:'',
      version:''
    })

    this.titreUp=this.titre;
    console.log('construct : '+this.isUpdate);

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.isUpdate);
    if(id){
      this.isUpdate = true;
      this.titreProService.findById(+id).subscribe(
        t =>{
          this.titre=t;
          this.createForm.controls["slug"].setValue(this.titre.slug);
          this.createForm.controls["titre"].setValue(this.titre.titre);
        })
    }
  }

  affectUser(){

    this.titreUp.id = this.titre.id;
    this.titreUp.slug = this.createForm.get('slug')?.value;

    this.titreUp.titre=this.createForm.get('titre')?.value;

    this.titreUp.version =this.titre.version;
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
      this.titreProService.save(this.titreUp).subscribe();
  }

  private update() {
      this.titreProService.update(this.titreUp).subscribe();
  }
}
