import { Injectable } from '@angular/core';
import {Observable, BehaviorSubject} from 'rxjs';
import { map} from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { User, Menu, Profile, UserData, Country, Language } from '../_models';
import { Router } from '@angular/router';

interface tniData {
  menu : Menu[];
  profile: Profile;
  user_data: UserData;
}

interface verifiedUser {
  countries: Country[];
  email: string;
  languages: Language[];
  role: string;
  token: string;
}

interface regisVerifiedUser {
  data : verifiedUser;
  message: Array<string>;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentlyRegisteringUser: BehaviorSubject<verifiedUser>
  public registeringUser: Observable<verifiedUser>

  private currentUserSubject: BehaviorSubject<tniData>
  public currentUser: Observable<tniData>
  private user$ : boolean
  
  private baseUrl = ''
  private registerUrl = 'user/register'
  private loginUrl = 'user/login'
  private logoutUrl = 'user/logout'
  private upDateUrl = 'user/profile/update'

  constructor( private http: HttpClient, private router: Router) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(JSON.stringify(localStorage.getItem('currentUser'))));
    this.currentUserSubject = new BehaviorSubject<tniData>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.currentlyRegisteringUser = new BehaviorSubject<verifiedUser>(JSON.parse(localStorage.getItem('verifiedUser')))
    this.registeringUser = this.currentlyRegisteringUser.asObservable()
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value
}
  
  login(email:string, password: string): Observable<any> 
      {
        const body = {
        'email': email,
        'password': password
            }
            return this.http.post<any>(`${this.baseUrl}/${this.loginUrl}`, body)
              .pipe(map(
                user => { console.log(user)
                    // login successful if there's a jwt token in the response
                    if (user.success && user.data.user.auth_token) {
                      window.localStorage.setItem('currentUser', JSON.stringify(user.data));
                      window.localStorage.setItem('token', user.data.user.auth_token)
                      this.currentUserSubject.next(user.data)
                      this.user$ = user.success
                    }
                  return user     
                }
              ))
    }    
  
  loggedIn()
    {
      return !!window.localStorage.getItem('token')
    } 

  public get getToken()
    {
      return window.localStorage.getItem('token')
    }

  logout()
    {
      console.log('on init logout')
      window.localStorage.clear()
      this.router.navigate(['/login'])
       this.http.get<any>(`${this.baseUrl}/${this.logoutUrl}`)
      this.currentUserSubject.next(null);
    }

  registerUser(newUser:User): Observable<any>
    {
      const data = {
      'token': newUser.token,
      'username': newUser.username,
      'password': newUser.password,
      'password_confirmation': newUser.password_confirmation,
      'title': newUser.title,
      'firstname': newUser.firstname,
      'middlename': newUser.middlename,
      'surname': newUser.surname,
      'email_other': newUser.email_other,
      'dob': newUser.dob,
      'phone_no': newUser.phone_no,
      'gender': newUser.gender,
      'nationality': newUser.nationality,
      'country': newUser.country,
      'language': newUser.language, 
      'training_sch_completed': newUser.training_sch_completed,
      'church': newUser.church,
      'is_baptized': newUser.is_baptized,
      'foundation_sch_completed': newUser.foundation_sch_completed,
      'marital_status': newUser.marital_status,
      'spouse_name': newUser.spouse_name,
      'spouse_dob': newUser.spouse_dob,
      'spouse_email': newUser.spouse_email,
      'spouse_phone': newUser.spouse_phone,
      'spouse_is_tni': newUser.spouse_is_tni,
      'wedding_anniversary': newUser.wedding_anniversary,
      'avatar' : newUser.avatar,
      'has_children': newUser.has_children,
      }
       
       return this.http.post(`${this.baseUrl}/${this.registerUrl}`, data)
    }
    
  verifyUser(token)
    {
      return this.http.get<regisVerifiedUser>(`${this.baseUrl}/api/user/register/${token}`)
        .pipe(map(
          res => {
              console.log(res)
              if(res.success){
                localStorage.setItem('verifiedUser', JSON.stringify(res.data))
                this.currentlyRegisteringUser.next(res.data)
                }
              return res
        })
        )
    }
      
    updateUser(upUser: User): Observable<any>
    {
      // const data = {
      // 'title': upUser.title,
      // 'firstname': upUser.firstname,
      // 'middlename': upUser.middlename,
      // 'surname': upUser.surname,
      // 'email_other': upUser.email_other,
      // 'dob': upUser.dob,
      // 'phone_no': upUser.phone_no,
      // 'gender': upUser.gender,
      // 'nationality': upUser.nationality,
      // 'country': upUser.country,
      // 'training_sch_completed': upUser.training_sch_completed,
      // 'church': upUser.church,
      // 'is_baptized': upUser.is_baptized,
      // 'foundation_sch_completed': upUser.foundation_sch_completed,
      // 'marital_status': upUser.marital_status,
      // 'avatar' : upUser.avatar,
      // 'has_children': upUser.has_children,
      // }
       
       return this.http.put<any>(`${this.baseUrl}/${this.upDateUrl}`, upUser)
    }
  }

  
