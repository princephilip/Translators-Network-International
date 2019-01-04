import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  loading: boolean = false
  returnUrl: string
  error = ''
  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService) {}

  ngOnInit() {
      // reset login status
      this.auth.logout()
      this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required]]
      });
       
      // get return url from route parameters or default to '/' 
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
  }

  onSubmit(){
   this.error = ''
    this.loading = true

    this.auth.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          res => {
            if(res.data.length === 0){
              this.loading = false
              this.error = 'Email or Password is incorrect'
              return
            } else {
              this.loading = false
              this.router.navigate([this.returnUrl])
              return
            }
          },
          err => {
            this.loading = false
            this.error = 'Access to server blocked, due to CORS policy. Retry'
          }
        )
  }

  
}
