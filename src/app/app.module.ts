import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA, enableProdMode } from '@angular/core';
enableProdMode();
import { MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader} from 'ng-uikit-pro-standard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpEventType} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { UsersComponent } from './users/add-users/users.component';
import { RolesComponent } from './users/roles/roles.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ProfileComponent } from './users/profile/profile.component';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { NotificationComponent } from './shared/notification/notification.component';
import { InvalidRequestComponent } from './shared/invalid-request/invalid-request.component';
import { NavigationComponent } from './users/navigation/navigation.component';
import { HomeComponent } from './users/home/home.component';
import { MemberProjectsComponent } from './users/member-projects/member-projects.component';
import { ProjectsComponent } from './users/projects/projects.component';
import { MemberTranslationsComponent } from './users/member-translations/member-translations.component';
import { TranslationsComponent } from './users/translations/translations.component';
import { MyScoreCardComponent } from './users/my-score-card/my-score-card.component';
import { TniccComponent } from './users/tnicc/tnicc.component';
import { LogoutComponent } from './users/logout/logout.component';
import { SendAnnouncementComponent } from './users/send-announcement/send-announcement.component';
import { DownloadReportComponent } from './users/download-report/download-report.component';
import { TniccInboxComponent } from './users/tnicc-inbox/tnicc-inbox.component';
import { TniccAddProjectComponent } from './users/tnicc-add-project/tnicc-add-project.component';
import { MyMeetingsComponent } from './users/my-meetings/my-meetings.component';
import { InformationCenterComponent } from './users/information-center/information-center.component';
import { InboxComponent } from './users/inbox/inbox.component';
import { ReportComponent } from './users/report/report.component';
import { TnicPolicyComponent } from './users/tnic-policy/tnic-policy.component';
import { TnitsComponent } from './users/tnits/tnits.component';
import { FooterComponent } from './users/footer/footer.component';
import { AddMeetingComponent } from './users/admin-meeting/add-meeting/add-meeting.component';
import { MeetingDetailComponent } from './users/admin-meeting/meeting-detail/meeting-detail.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent,  RegistrationComponent, 
    UsersComponent, RolesComponent, ProfileComponent,
    InvalidRequestComponent, NotificationComponent, NavigationComponent, HomeComponent,
    MemberProjectsComponent, ProjectsComponent, MemberTranslationsComponent, TranslationsComponent,
    MyScoreCardComponent,TniccComponent, LogoutComponent, AddMeetingComponent, 
    SendAnnouncementComponent, DownloadReportComponent, TniccInboxComponent, TniccAddProjectComponent, 
    MyMeetingsComponent, InformationCenterComponent, InboxComponent, ReportComponent, 
    TnicPolicyComponent, TnitsComponent, FooterComponent, MeetingDetailComponent
  ],
  imports: [
    BrowserModule,  AppRoutingModule,  MDBBootstrapModulesPro.forRoot(),
    ReactiveFormsModule,  FormsModule,  BrowserAnimationsModule,  
    HttpClientModule, RxReactiveFormsModule, FontAwesomeModule, 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    MDBSpinningPreloader
  ],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA , CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
