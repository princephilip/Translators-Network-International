import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './users/add-users/users.component';
import { RolesComponent } from './users/roles/roles.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthGuard, ValidTokenGuard } from './_guards';
import { ProfileComponent } from './users/profile/profile.component';
import { InvalidRequestComponent } from './shared/invalid-request/invalid-request.component';
import { HomeComponent } from './users/home/home.component';
import { MemberProjectsComponent } from './users/member-projects/member-projects.component';
import { ProjectsComponent } from './users/projects/projects.component';
import { MemberTranslationsComponent } from './users/member-translations/member-translations.component';
import { TranslationsComponent } from './users/translations/translations.component';
import { MyScoreCardComponent } from './users/my-score-card/my-score-card.component';
import { TniccComponent } from './users/tnicc/tnicc.component';
import { LogoutComponent } from './users/logout/logout.component';
import { AddMeetingComponent } from './users/admin-meeting/add-meeting/add-meeting.component';
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
import { MeetingDetailComponent } from './users/admin-meeting/meeting-detail/meeting-detail.component';

const routes: Routes = [
  {
    path: 'edit-meeting',
    component:MeetingDetailComponent
  },
  {
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'invalid-request',
    component: InvalidRequestComponent
  },
  {
    path:'login', 
    component: LoginComponent,
      children:[
        {path:'**' , redirectTo: '/login', pathMatch: 'full'}
      ]
  },
  {
    path: 'api/user/register/:token', 
    component: RegistrationComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'announcement/send',
    component: SendAnnouncementComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report/download',
    component: DownloadReportComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'invite/user',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inbox/tnicc',
    component: TniccInboxComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user/role/update',
    component: RolesComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'add/meeting',
    component: AddMeetingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'meetings/list',
    component: MyMeetingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tnicc/project/add',
    component: TniccAddProjectComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path:'member-projects',
    component: MemberProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'member-translations',
    component: MemberTranslationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'translations',
    component: TranslationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-score-card',
    component: MyScoreCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'information-center',
    component: InformationCenterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'info/tnicc',
    canActivate: [AuthGuard],
    component: TniccComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inbox',
    component: InboxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [AuthGuard]    
  }, 
  {
    path: 'info/tni-policy',
    component: TnicPolicyComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'info/tnits',
    component: TnitsComponent,
    canActivate: [AuthGuard]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
