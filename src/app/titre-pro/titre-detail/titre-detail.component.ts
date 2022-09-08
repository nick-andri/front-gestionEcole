import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LocationStrategy} from "@angular/common";
import {TitrePro} from "../../_models/titre-pro";
import {TitreProService} from "../../_services/titre-pro.service";

@Component({
  selector: 'app-titre-detail',
  templateUrl: './titre-detail.component.html',
  styleUrls: ['./titre-detail.component.css']
})
export class TitreDetailComponent implements OnInit {

  titre?:TitrePro;
  id :number =0;

  constructor(private route:ActivatedRoute,private titreservice:TitreProService,private location:LocationStrategy) { }

  ngOnInit(): void {

    const params = this.route.snapshot.paramMap;
    const id = params.get('id');

    this.id = +(id as string);
    this.titreservice.findById(this.id).subscribe(u => {this.titre = u} );
  }

  goBack() {
    this.location.back();
  }

}
