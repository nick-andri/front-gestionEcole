import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LocationStrategy} from "@angular/common";
import {VilleService} from "../../_services/ville.service";
import {Ville} from "../../_models/ville";

@Component({
  selector: 'app-ville-detail',
  templateUrl: './ville-detail.component.html',
  styleUrls: ['./ville-detail.component.css']
})
export class VilleDetailComponent implements OnInit {
  ville?:Ville;
  id :number =0;

  constructor(private route:ActivatedRoute,private villeservice:VilleService,private location:LocationStrategy) { }

  ngOnInit(): void {

    const params = this.route.snapshot.paramMap;
    const id = params.get('id');

    this.id = +(id as string);
    this.villeservice.findById(this.id).subscribe(v => {this.ville = v} );
  }

  goBack() {
    this.location.back();
  }


}
