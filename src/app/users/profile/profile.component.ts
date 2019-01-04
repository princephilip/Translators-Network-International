import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services';
import { Observable } from 'rxjs';
import { Profile, UserData, Menu } from 'src/app/_models';
import { RxFormBuilder } from "@rxweb/reactive-form-validators";
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_helpers';

interface tniData {
  menu : Menu[];
  profile: Profile;
  user_data: UserData;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: tniData;
  public data$ : Observable<tniData>
  updateForm: FormGroup
  loading: boolean

  constructor(private fb: RxFormBuilder,
              public auth: AuthService,
              private router: Router,
              private notifier: NotificationService) {

    this.data$ = this.auth.currentUser
 
  }

  //  https://stackoverflow.com/questions/45530752/getting-image-from-api-in-angular-4-5
  
  ngOnInit() {
    this.data$.subscribe(user => this.user = user); 

        this.updateForm = this.fb.group({
      title: [this.user.profile[0].title, Validators.compose([Validators.required, Validators.maxLength(8)])],
      firstname: [this.user.profile[0].firstname,  Validators.required],
      middlename: ['',  Validators.required],
      surname: [this.user.profile[0].surname,  Validators.required],
      email_other: [this.user.profile[0].email_other, Validators.compose([Validators.email]) ],
      phone_no: [this.user.profile[0].phone_no,  Validators.compose([ Validators.required, Validators.minLength(8), 
                    Validators.maxLength(15), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      dob: [this.user.profile[0].dob,  Validators.required],

      gender: [this.user.profile[0].gender,  Validators.required],
      language: [this.user.profile[0].language,  Validators.required],
      nationality: [this.user.profile[0].nationality,  Validators.required],
      country: [this.user.profile[0].country,  Validators.required],
      // language: ['',  Validators.required],
      training_sch_completed:[this.user.profile[0].training_sch_completed,  Validators.required],
      church: [this.user.profile[0].church,  Validators.required],
      marital_status: [this.user.profile[0].marital_status,Validators.required],
      is_baptized: [this.user.profile[0].is_baptized,  Validators.required],
      has_children: ['',Validators.required],
      foundation_sch_completed: [this.user.profile[0].foundation_sch_completed,  Validators.required],
      avatar: [''],
      spouse_name:[''],
      spouse_dob: [''],
      spouse_email: [''],
      spouse_is_tni: ['0'],
      spouse_phone: ['',  Validators.compose([ Validators.minLength(8),Validators.maxLength(15), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      wedding_anniversary: [''],
    })
  }

  get marital_status(){
    return this.updateForm.get('marital_status')
  }

  onUpdate(){
    console.log('on update clicked')
    console.log(this.updateForm.value)
    this.loading = true
    this.auth.updateUser(this.updateForm.value)
    .subscribe(
      res => {
        console.log(res)
        if(res.success){
          this.loading = false
          this.notifier.display('success', 'You data has been successfully updated')
          this.router.navigate(['/profile'])
        } 
          else {
              for(const i of res.data)
              {
                this.notifier.display('error',`${res.message.text}`)
              }
            this.loading = false
          }
      
      },
      err => {
          this.notifier.display('error', `${err.value}`)
          this.loading = false
      }
    )
  }

}
