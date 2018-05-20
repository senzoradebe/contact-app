import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../contact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
	id: Number;
	contact: Contact = new Contact();
	filtersLoaded: Promise<boolean>;
	newContact: boolean = false;
	constructor(
		private activatedRoute: ActivatedRoute, 
		private contactService: ContactService,
		private router : Router ) {

		this.activatedRoute.params.subscribe(params => {
			this.id = params['id'];
			this.newContact = this.id == 0; 
		});

	}

	ngOnInit() {
		if (!this.newContact) {
			this.contactService.getContact(this.id).subscribe(
				(response : any) => {
					this.contact = response;
					this.filtersLoaded = Promise.resolve(true);
				},
				err => {
					console.log(err);
				}
			);			
		} else {
			this.filtersLoaded = Promise.resolve(true);
		}
	}

	save(): void {
		console.log("saving............");
		console.log(this.contact);
		this.contactService.saveContact(this.contact).subscribe(
			(response : any) => {
				console.log(response)
				this.contact = response;
				this.filtersLoaded = Promise.resolve(true);
			},
			err => {
				console.log(err);
			}
		);	
	}
	back(): void {
		this.router.navigate(['..']);
	}
}