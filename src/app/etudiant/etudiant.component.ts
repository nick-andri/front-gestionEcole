import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {EtudiantService} from "../_services/etudiant/etudiant.service";
import {baseEtudiant, Etudiant} from "../_models/etudiant";

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  @Input() promoId:number=0;

  etudiants?:Etudiant[] ;
etudiantsPromo?:Etudiant[];

  itemsPerPage: number =10;
  currentPage:number=1;
  totalItems:number=0;
  searchExpression:string ='';
  searchForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private etudiantService:EtudiantService,private router:Router) {
    this.searchForm = this.formBuilder.group({
      searchExpression:['']
    });

  }

  initTab(){

      if(this.promoId === 0){

        this.etudiantService.getAllByPage(this.currentPage,this.itemsPerPage).subscribe(etudiants =>{
          this.etudiants = etudiants;
        });
        this.initTotalItem();
      }else{

        this.etudiantService.getAllByPromo(this.currentPage,this.itemsPerPage,this.promoId)
          .subscribe(etudiants =>{
            this.etudiants =etudiants;

          });
        this.initTotalItem();
      }




  }

  initTotalItem(){

    if(this.promoId != 0){
      this.totalItems=this.etudiants!.length;
    }else{
      this.etudiantService.count().subscribe( nb =>{
        this.totalItems= nb;
      })
    }

  }

  ngOnInit(): void {

    this.initTab();
  }

  pageChanged(page:number){
    this.currentPage = page;
    this.initTab();
  }

  onSubmit() {
    this.etudiantService.getAllByName(this.currentPage,this.itemsPerPage,this.searchForm.get('searchExpression')?.value)
      .subscribe(etudiants => { this.etudiants = etudiants});
  }


  delete(e: any) {
        this.etudiantService.delete(e.id);
        this.initTab();
  }
}
