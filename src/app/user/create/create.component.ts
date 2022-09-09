import { Component, OnInit } from '@angular/core';
import {User} from "../../_models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../_services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EtudiantComponent} from "../../etudiant/etudiant.component";
import {EtudiantService} from "../../_services/etudiant/etudiant.service";
import {baseEtudiant, Etudiant} from "../../_models/etudiant";
import {LocationStrategy} from "@angular/common";



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class UserCreateComponent implements OnInit {

  user :User = {
    id:0,
    prenom:'default',
    nom:'default',
    email:'default',
    password:'default',
    active:true,
    role:'default',
    version:0,
    imagePath:'default'
  };

  userUp:User;
  isUpdate:Boolean =false;

  etu : Etudiant = baseEtudiant;

  createForm :FormGroup;

  constructor(
    private  location: LocationStrategy,
    private formBuilder:FormBuilder,private userservice:UserService,private router:Router,
    private route:ActivatedRoute,private etudiantService :EtudiantService) {
    this.createForm =this.formBuilder.group({
      id:'',
      prenom:'',
      nom:'',
      email:'',
      password:'',
      active:'',
      role:'',
      version:'',
      imagePath:''
    })

    this.userUp =this.user;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.isUpdate = true;
      this.userservice.findById(+id).subscribe(
        u =>{
          this.user=u;
          this.createForm.controls["email"].setValue(this.user.email);
          this.createForm.controls["prenom"].setValue(this.user.prenom);
          this.createForm.controls["nom"].setValue(this.user.nom);
          this.createForm.controls["password"].setValue(this.user.password);
          this.createForm.controls["role"].setValue(this.user.role);
          this.createForm.controls["imagePath"].setValue(this.user.imagePath);

        })
     }


  }

  affectUser(){

    this.userUp.id = this.user.id;
    this.userUp.prenom = this.createForm.get('prenom')?.value;

    this.userUp.nom=this.createForm.get('nom')?.value;

    this.userUp.email=this.createForm.get('email')?.value;

    this.userUp.password =this.createForm.get('password')?.value;

    this.userUp.role  =this.createForm.get('role')?.value;

    this.userUp.imagePath =this.createForm.get('imagePath')?.value;

    this.userUp.version =this.user.version;
  }

  onSubmit() {

    this.affectUser();

    if(this.isUpdate){
      console.log("role: "+this.userUp.role);

      this.update(this.user.role);

    }else {
      this.create(this.user.role);

    }

    this.goBack();

  }

  create(role:String){
    if(role === 'ETUDIANT' ){

      Object.assign(this.etu,this.userUp);
      this.etudiantService.save(this.etu).subscribe();

    }else if (role === 'ADMIN' || role === 'FORMATEUR' ){

      this.userservice.save(this.user).subscribe();
    }
  }

  update(role:String){
    if(role === 'ETUDIANT' ){

      Object.assign(this.etu,this.userUp);

      this.etudiantService.update(this.etu).subscribe(()=>{

      });

    }else if (role === 'ADMIN' || role === 'FORMATEUR' ){

      this.userservice.update(this.userUp).subscribe();
    }

  }

  veriferMDPboolean(pass:String):Boolean{
     let isPassOk:Boolean =false;
    this.userservice.hashPassword(pass).subscribe(hashedPass =>{
      if (hashedPass ! === this.user.password){
        isPassOk = true;
      }
    });
    return isPassOk;
  }


  goBack() {
    /*navigation vers page précéedente avec maj donnée*/
    this.router.navigate([this.location.path().split('/')[1]]);
  }
}
