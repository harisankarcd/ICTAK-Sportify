import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-student-landing',
  templateUrl: './student-landing.component.html',
  styleUrls: ['./student-landing.component.css']
})
export class StudentLandingComponent implements OnInit {

  constructor(private api:ApiService, private auth:AuthenticateService) { 
    this.studenttoken = this.auth.getStudentToken();
    if(this.studenttoken!==null)
    {
      this.decodetoken = jwtDecode<JwtPayload>(this.studenttoken);
      this.studentname = this.decodetoken.name;
      this.studenthouse = this.decodetoken.house;
      api.getStudent({"name":this.studentname,"house":this.studenthouse}).subscribe(
        (res)=>{
          this.studentinfo = res;
          this.studentevents = this.studentinfo.events;
        }
      )
    }
    this.api.viewEvents().subscribe((res)=>
  {
    this.a=res;
  })
  }

  ngOnInit(): void {
  }

a:any=[]
studenttoken:any;
decodetoken:any;
studentname:any;
studenthouse:any;
studentevents:any = []
studentinfo:any = [];

registerEvent = (event:any) =>{
  let id = this.studentinfo._id;
  let data = {"event":event,"_id":id};
  this.api.registerStudentEvent(data).subscribe(
    (res)=>{
      console.log(res);
      alert("Event added successfully!!");
      location.reload();
    }
  )
}

}