import { Injectable } from '@angular/core';
import { Headers, Http, Response , RequestOptions, RequestMethod } from '@angular/http';

import 'rxjs/Rx';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { map } from 'rxjs/operators';

import { Contact } from '../contact';
@Injectable({
  providedIn: 'root'
})

export class ContactService {
  constructor(private http: Http) { }
  client_id :    string ;
  redirect_uri : string; 
 
  getContacts(): any {
    var url = "//localhost:51851/api/contacts/"
    return this.http.get(url)
    .map(
      (response: Response) => {
          var data = response.json();
          return data;  
        }
      )
      .catch(
        (error: Response) => {
          console.log(error)
          return Observable.throw('Something went wrong');
        }
      );
  }

  getContact(id: Number) : any {
  	var url = "//localhost:51851/api/contacts/" + id
  	return this.http.get(url)
    	.map(
      		(response: Response) => {
      			var data = response.json();
      			return data;  
      		}
      	)
      	.catch(
      		(error: Response) => {
      			console.log(error)
      			return Observable.throw('Something went wrong');
      		}
      	);
  }  
	saveContact(contact: Contact) : any {
	 if (contact.Id === 0 || contact.Id === null ) {
    	// var headerOptions = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    	// var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    	//var body = JSON.stringify(contact);
    	const headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    	return this.http.post('http://localhost:51851/api/contacts', contact , {headers: headers});
    	//return this.http.post('http://localhost:51851/api/contacts', body ,requestOptions).map(x => x.json());
	 } else { 
    	// var headerOptions = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    	// var requestOptions = new RequestOptions({method : RequestMethod.Put,headers : headerOptions});
    	const headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    	return this.http.put('http://localhost:51851/api/contacts', contact , {headers: headers});
    	//return this.http.put('http://localhost:51851/api/contacts', body ,requestOptions).map(x => x.json());
	 }

	}
}