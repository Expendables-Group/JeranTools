import { Component } from '@angular/core';
import{Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']


})
export class AppComponent {
  constructor(public http: Http) {
    
      }
    
      send() {
      //   this.http.get('http://localhost:3000/user')
      //   .map((response: Response) => {
      //    var result = response.json();
      //     console.log(response)
      //     return result;
      //  this.http.get(`http://localhost:3000/user`)
      // .map((response: Response) => {
      //   console.log()
      //   var result = response.json();
      //   console.log('hi'+result);
      //   //return result;
      //  });
  
      // }
     this.http.get('http://localhost:4200/user').subscribe(data => {
        // data is now an instance of type ItemsResponse, so you can do this:
        console.log(data)
      });
    
}

}