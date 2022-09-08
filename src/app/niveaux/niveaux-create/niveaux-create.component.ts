import { Component, OnInit } from '@angular/core';
import {baseNiveaux, Niveaux} from "../../_models/niveaux";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LocationStrategy} from "@angular/common";
import {NiveauxService} from "../../_services/niveaux.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-niveaux-create',
  templateUrl: './niveaux-create.component.html',
  styleUrls: ['./niveaux-create.component.css']
})
export class NiveauxCreateComponent implements OnInit {

  niveaux:Niveaux=baseNiveaux;
  newColor?: string;

  niveauxUp:Niveaux;
  isUpdate:Boolean =false;
  createForm :FormGroup;


  constructor(
    private  location: LocationStrategy,
    private formBuilder:FormBuilder,private niveauxService:NiveauxService,private router:Router,
    private route:ActivatedRoute){

    this.createForm =this.formBuilder.group({
      id:'',
      valeur:'',
      description:'',
      codeCouleurHexa:'',
      version:''
    })

    this.niveauxUp=this.niveaux;
    console.log('construct : '+this.isUpdate);

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.isUpdate);
    if(id){
      this.isUpdate = true;
      this.niveauxService.findById(+id).subscribe(
        t =>{
          this.niveaux=t;
          this.newColor=t.codeCouleurHexa;
          this.createForm.controls["valeur"].setValue(this.niveaux.valeur);
          this.createForm.controls["codeCouleurHexa"].setValue(this.niveaux.codeCouleurHexa);
          this.createForm.controls["description"].setValue(this.niveaux.description);
        })
    }
  }

  affectUser(){

    this.niveauxUp.id = this.niveaux.id;
    this.niveauxUp.valeur = this.createForm.get('valeur')?.value;

    this.niveauxUp.codeCouleurHexa=this.createForm.get('codeCouleurHexa')?.value;
    this.niveauxUp.description=this.createForm.get('description')?.value;

/*
    this.niveauxUp.codeCouleurHexa=this.newColor;
*/
    this.niveauxUp.version =this.niveaux.version;
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
    this.niveauxService.save(this.niveauxUp).subscribe();
  }

  private update() {
    this.niveauxService.update(this.niveauxUp).subscribe();
  }


  updateColor($event: string) {
    this.newColor = $event;
    this.createForm.controls["codeCouleurHexa"].setValue($event);

  }
}
