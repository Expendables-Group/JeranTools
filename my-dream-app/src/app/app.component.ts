import { OnInit,Component } from '@angular/core';
import{Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
// import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']


})
export class AppComponent{
  name : String;
  password : String
  constructor(public http: Http) {
    
      }
     
      send() {
        const that = this;
       console.log(that)
        this.http.post('http://localhost:3000/user',{
          username: that.name,
          password: that.password
        })
        // JSON.stringify({
        //   username: that.name,
        //   password: that.password
        // })
      .subscribe(
        data => {
          alert('ok');
          console.log(data)
        },
        error => {
          console.log(error , "erooooooooooooooooooe");
        }
        )

}
    //   send() {
    //     console.log(this.password)
    //  this.http.get('http://localhost:3000/user')
    // .map(res => res.json())
    // .subscribe(
    //   data =>{
    //     console.log(data)
    //   },
    //   err => console.log(err),
    //   () => console.log("khawa" )
    // );
    
    //     }

}