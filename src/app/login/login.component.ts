import { AuthenticationService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted = false;
  error='';
  token: any;
/*
 private recaptchaSiteKey = '6LfxfL4hAAAAAK_g2CW8s0u4AtixvfTul2YJLvrH';
*/


  constructor(
    private formBuilder: FormBuilder,
    private authenticationService:AuthenticationService,
    private router:Router,
    private route:ActivatedRoute,

  ) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
      captcha: ['']
  });

    this.token = undefined;
  }

  ngOnInit(): void {
    this.loginForm.controls['captcha'].valueChanges
      .subscribe(token =>{this.token = token});
  }



  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    /*this.authenticationService.verifCaptcha(this.token)
      .subscribe({
        next:(resultOk) =>{
          console.log("resultOK :"+resultOk);
          if(resultOk) {*/
            this.authenticationService.login(this.f['email'].value, this.f['password'].value)
              .pipe(first())
              .subscribe({
                next: () => {
                  //il y a une url demandée dans les paramètres de route, prendre celle-ci sinon on redirige vers admin
                  const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
                  this.router.navigate([returnUrl]);

                },
                error: error => {
                  this.error = "Erreur d'authentification : " + error.message;
                }
              });
          }
      /*},
      error:err => {
        this.error="Erreur d'authentification : " + err.message;
      }
    } );
    console.log(`Token [${this.token}] generated`);
    grecaptcha.reset();


  }*/

}
