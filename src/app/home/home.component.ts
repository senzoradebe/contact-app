import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private contactService: ContactService, private router : Router) { }

  contacts: Contact[];
  tempList: Contact[];

  movies;
  startAt = new Subject();
  endAt = new Subject();
  name : string = "";
  ngOnInit() {
  	this.contactService.getContacts().subscribe(
  		(suc : any) => {
  			console.log("loading contacts");
  			this.contacts = suc;
  			this.tempList = this.contacts;
  		},
  		err => {
  			console.log(err);
  		}
  		);
  }

  search($event) {
      this.tempList = this.contacts.filter(item => item.Name.toLowerCase().includes(this.name.toLowerCase()));
  }

  selectedContact: Contact;

  gotoDetail(): void {
  	this.router.navigate(['contact',0]);
  }

}
