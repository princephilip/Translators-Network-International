import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Role, Meeting, Post, Distribution, Media, Mission, Comment,
  OnlineChurch, Production, Reachout, Tnion, Translation, Goal} from '../_models/index';
import {HttpClient } from '@angular/common/http';

interface myData {
    data: Object[];
    message: Array<string>;
    success: boolean;
  }

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl = ''
  private getUsersUrl = 'invites/list' 
  private addNewUrl = ''
  private addRoleUrl = 'user/role/add'
  private allUsersRoleUrl = 'user/roles/list'

  private adminMettingUrl = 'meeting'
  private memberMeetingUrl = 'meetings'
  private allReportUrl = 'reports'
  private reportUrl = 'report'
  private goalUrl = 'goal'
  private memberGoalsUrl = 'goals/current'
  private postUrl = "post"
  private commentUrl = 'comment'
  private likeUrl = 'like'
  private homeUrl = 'user/dashboard'
 
  constructor( private http: HttpClient) { }

  getHomepage(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${this.homeUrl}`)
  }

          // CRUD POSTS

    // GET all posts
    getAllPosts(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/${this.postUrl}`)
    }

    addPost(post: Post): Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/${this.postUrl}`, post)
    }

    // GET, activate post. 0=inactive 1=active
    postStatus(post: Post) : Observable<any>{
      return this.http.get<any>(
        `${this.baseUrl}/${this.postUrl}/${post.id}/suspend/${post.status}`
        )
    }

    deletePost(post_id: number) : Observable<any>{
      return this.http.delete<any>(`${this.baseUrl}/${this.postUrl}/${post_id}`)
    }
    
    getAllPostsComments(post_id: number): Observable<any>{
      return this.http.get<any>(`${this.baseUrl}/${this.postUrl}/${post_id}/comments`)
    }

          // CRUD COMMENTS

    addComment(post_id: number, content: string) : Observable<any>{
      const comment= {
        'post_id' : post_id,
        'content' : content
        }
      return this.http.post<any>(`${this.baseUrl}/${this.commentUrl}`, comment)
    }

// tessssssssssssssssssssssssssssst this
    // update comment
    updateComment(comment: Comment): Observable<any>{
      return this.http.put<any>(`${this.baseUrl}/${this.commentUrl}/${comment.comment_id}`, comment.content)
    }

    // delete comment ----comment_id
    deleteComment(comment: Comment): Observable<any>{
      return this.http.delete<any>(`${this.baseUrl}/${this.commentUrl}/${comment.comment_id}`)
    }

          // CRUD LIKES
          
// tessst-- it is get, test if it supposed to have been a like
    addLike(post_id: number) : Observable<any>{
      return this.http.get<any>(`${this.baseUrl}/${this.likeUrl}/post/${post_id}`)
    }

    deleteLike(like_id: number): Observable<any>{
      return this.http.delete<any>(`${this.baseUrl}/${this.likeUrl}/${like_id}`)
    }

          // CRUD GOALS
    getAllGoals(): Observable<any>{
      return this.http.get<any>(`${this.baseUrl}/${this.goalUrl}`)
    }
    addGoal(goal: Goal): Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/${this.goalUrl}`, goal)
    }

    deleteGoal(goal:string) : Observable<any>{
      return this.http.delete(`${this.baseUrl}/${this.goalUrl}/${goal}`)
    }

    updateGoal(goal:Goal) : Observable<any>{
      return this.http.put<any>(`${this.baseUrl}/${this.goalUrl}/${goal.goal}`, goal)
    }

    openGoal(goal: string) : Observable<any>{
      return this.http.get<any>(`${this.baseUrl}/${this.goalUrl}/${goal}`)
    }

    getGoalsMembers(){
      return this.http.get<any>(`${this.baseUrl}/${this.memberGoalsUrl}`)
    }

    
          // CRUD REPORTS for admin, dev, leader, subleader, member

  getAllReports() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${this.allReportUrl}`)
  }
  
  getMonthlyReport(month: string) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${this.reportUrl}/${month}`)
  }


  addDistReport(distribution: Distribution) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/${this.reportUrl}/distribution`, distribution)
  }

   deleteDistReport(distribution: Distribution) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${this.reportUrl}/distribution/${distribution}`)
  }

  updateDistReport(distribution: Distribution) : Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${this.reportUrl}/distribution/${distribution}`, distribution)
  }


  addMediaReport(media: Media) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/${this.reportUrl}/media`, media)
  }

   updateMediaReport(media: Media) : Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${this.reportUrl}/media/${media}`, media)
  }

   deleteMediaReport(media: Media) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${this.reportUrl}/media/${media}`)
  }

  
  addMissionReport(mission: Mission) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/${this.reportUrl}/mission`, mission)
  }

  deleteMissionReport(mission: Mission) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${this.reportUrl}/mission/${mission}`)
  }

   updateMissionReport(mission: Mission) : Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${this.reportUrl}/mission/${mission}`, mission)
  }


  addOnlineChurchReport(online_church: OnlineChurch) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/${this.reportUrl}/onlinechurch`, online_church)
  }

  updateOnlineChurchReport(online_church: OnlineChurch) : Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${this.reportUrl}/onlinechurch/${online_church}`, online_church)
  }

  deleteOnlineChurchReport(online_church: OnlineChurch) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${this.reportUrl}/onlinechurch/${online_church}`)
  }


  addProductionReport(month: string, production: Production) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/${this.reportUrl}/${month}/production`, production)
  }

  updateProductionReport(month: string, production: Production) : Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${this.reportUrl}/${month}/production/${production}`, production)
  }

  deleteProductionReport(production: Production) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${this.reportUrl}/production/${production}`)
  }


   addReachOutReport(reachout: Reachout) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/${this.reportUrl}/reachout`, reachout)
  }

  updateReachOutReport(reachout: Reachout) : Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${this.reportUrl}/reachout/${reachout}`, reachout)
  }
  
  deleteReachOutReport(reachout: Reachout) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${this.reportUrl}/reachout/${reachout}`)
  }
  

  addTnionReport(tnion: Tnion) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/${this.reportUrl}/tnion`, tnion)
  }

  updatedTnionReport(tnion: Tnion) : Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${this.reportUrl}/tnion/${tnion}`, tnion)
  }

  deleteTnionReport(tnion: Tnion) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${this.reportUrl}/tnion/${tnion}`)
  }


  addTranslationReport(month: string, translation: Translation) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/${this.reportUrl}/${month}/translation`, translation)
  }

  updateTranslationReport(month: string, translation: Translation) : Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${this.reportUrl}/${month}/translation/${translation}`, translation)
  }

  deleteTranslationReport(translation: Translation) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${this.reportUrl}/translation/${translation}`)
  }


          // CRUD USERS

  getAllUsers(){
    return this.http.get<any>(`${this.baseUrl}/${this.getUsersUrl}`)
  }

  addUser(email:string, role:string): Observable<any>{
      const formData = {
          'email': email,
          'role': role,
      }
      return this.http.post<any>(this.addNewUrl,formData)   
  }

            // CRUD ROLES

    // add(post) new role
    addRole(newRole:Role) : Observable<any>{ 
      return this.http.post<any>(`${this.baseUrl}/${this.addRoleUrl}`, newRole)
    }

    // get all roles
    getUsersRoles() : Observable<myData>{
        return this.http.get<myData>(`${this.baseUrl}/${this.allUsersRoleUrl}`)
      }      

              // CRUD MEETINGS
 
    // GET admin,dev
    getAllAdminMeetings():Observable<any>{
      return this.http.get<any>(`${this.baseUrl}/${this.adminMettingUrl}`)
    }

    // GET leader, subleader, member
    getMemberMeetings() : Observable<any>{
      return this.http.get<any>(`${this.baseUrl}/${this.memberMeetingUrl}`)
    }

    // POST admin,dev
    addAdminMeetings(meeting : Meeting) : Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/${this.adminMettingUrl}`, meeting)
    }

    // DELETE admin, dev 
    deleteMeeting(id: number): Observable<any>{
      return this.http.delete<any>(`${this.baseUrl}/${this.adminMettingUrl}/${id}`)
    }

    // PUT admin, dev 
    updateMeeting(meeting: Meeting) : Observable<any>{
      return this.http.put<any>(`${this.baseUrl}/${this.adminMettingUrl}/${meeting.id}`, meeting)
    }
  
    // GET specific meeting admin, dev
    getMeetingById(meetingId: number): Observable<any>{
      return this.http.get<any>(`${this.baseUrl}/${this.adminMettingUrl}/${meetingId}`)
    }

    // GET close meeting admin, dev
    closeMeeting(meeting: Meeting) : Observable<any>{
      return this.http.get<any>(`${this.baseUrl}/${this.adminMettingUrl}/${meeting.id}/close`)
    }

    // GET suspend meeting admin, dev
    suspendMeeting(meeting: Meeting) : Observable<any>{
      return this.http.get<any>(
        `${this.baseUrl}/${this.adminMettingUrl}/${meeting.id}/suspend/${meeting.suspend}`
        )
    }

    // GET register for meeting leader, subleader, member
    registerMeeting(meeting: Meeting) : Observable<any>{
      return this.http.get<any>(`${this.baseUrl}/${this.adminMettingUrl}/${meeting.id}/register`)
    }

    // GET register for meeting leader, subleader, member
    unregisterMeeting(meeting: Meeting) : Observable<any>{
      return this.http.get<any>(`${this.baseUrl}/${this.adminMettingUrl}/${meeting.id}/unregister`)
    }

    


}
