import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ProductService {

  // inject http service inside this service, cool again right!
  constructor(private http: Http) { }

  // define a cart that will hold the data coming from the database
  public cart = [];

  // send a get request to the server to get the products
  send() {
    const that = this;
    this.http.get('http://localhost:3000').subscribe(function() {
      that.http.get('http://localhost:3000/user', {}).subscribe();
    });

    return this.http.get('http://localhost:3000/user')
        .map(res => res.json()
    );
  }

  // send the added product to the server



}