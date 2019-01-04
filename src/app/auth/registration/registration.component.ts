import { Component, OnInit, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService } from 'src/app/_services';
import { Router, ActivatedRoute} from '@angular/router';
import { RxwebValidators,RxFormBuilder } from "@rxweb/reactive-form-validators"
import { Country, Language } from 'src/app/_models';

interface verifiedUser {
  countries: Country[];
  email: string;
  languages: Language[];
  role: string;
  token: string;
}

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  selectedFile = File = null;
  users$: verifiedUser

  errors: Array<string> = []
  loading : boolean = false
  registration: FormGroup

  constructor(private fb: RxFormBuilder,
              private auth: AuthService, 
              private route: ActivatedRoute,
              private router: Router) {

       this.registration = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(8)])],
      firstname: ['',  Validators.required],
      middlename: ['',  Validators.required],
      surname: ['',  Validators.required],
      username: ['',  Validators.required],
      email_other: ['', Validators.compose([Validators.email]) ],
      phone_no: ['',  Validators.compose([ Validators.required, Validators.minLength(8), 
                    Validators.maxLength(15), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      dob: ['',  Validators.required],
      gender: ['',  Validators.required],
      nationality: ['',  Validators.required],
      country: ['',  Validators.required],
      language: ['',  Validators.required],
      training_sch_completed:['',  Validators.required],
      church: ['',  Validators.required],
      marital_status: ['',Validators.required],
      spouse_name:[''],
      spouse_dob: [''],
      spouse_email: [''],
      spouse_phone: ['',  Validators.compose([ Validators.minLength(8),Validators.maxLength(15), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      wedding_anniversary: [''],
      has_children: ['',  Validators.required],
      spouse_is_tni: ['0'],
      is_baptized: ['',  Validators.required],
      foundation_sch_completed: ['',  Validators.required],
      avatar: [''],
      token:[''],
      email:[''],
      role:[''],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password_confirmation: ['', RxwebValidators.compare({fieldName:'password' })]
    })

   }
  
  ngOnInit() {
    let token = this.route.snapshot.paramMap.get('token')
    this.auth.verifyUser(token)
        .subscribe(
        res => {
          console.log(res)
           if(res.success){
              this.registration.controls['token'].setValue(res.data.token)
              this.registration.controls['email'].setValue(res.data.email)
              this.registration.controls['role'].setValue(res.data.role)
              this.auth.registeringUser.subscribe(userData => this.users$ = userData)
              console.log(this.users$)
              return true
           } else { 
             this.router.navigate(['/invalid-request'])
           }
        }
      )
  }

  onSubmit(){
    this.loading = true
    console.log(this.registration.value)
    this.auth.registerUser(this.registration.value)
      .subscribe(
        res => {
          console.log(res.data)
          console.log(res)
          if(res.success){
            window.localStorage.removeItem('verifiedUser')
            this.loading = false
            this.router.navigate(['/login'])
          } 
            else {
              for(const i of res.data){
                this.errors.push(i)
              }
            this.loading = false
          }
        
        },
        err => {
            this.errors = err
            this.loading = false
        }
      )
  }


  get f(){
    return this.registration.controls;
  }
  
 get has_children(){
   return this.registration.get('has_children')
 }
  get role() {
    return this.registration.get('role')
  }

  get marital_status(){
    return this.registration.get('marital_status')
  }


}