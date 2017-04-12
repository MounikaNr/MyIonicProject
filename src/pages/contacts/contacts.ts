import { Component } from '@angular/core';

import { Database } from '../../provider/database';
import { ContactInfo } from '../../models/contact';
@Component({
    selector: 'page-contacts',
    templateUrl: 'contacts.html',
    providers: [Database]
})

export class Contacts {
    public name: any;
    public lname: any;
    public contact: any;
    public contacts: ContactInfo[];


    //public contactint:any
    constructor(public database: Database) {
    }

    insertcontact() {
        //this.contactint=parseInt(this.contact,10);
        this.database.insertContact(this.contact, this.name, this.lname).then((result) => {
            console.log("INSERTED: ", result);
        }, (error) => {
            console.log("ERROR: ", error);
        });;
        this.readContact();
    }

    readContact() {
        this.database.readContacts().then((result: ContactInfo[]) => {
            //result has list of contacts

            //insert result's data into contacts
            this.contacts = result;
            //data= array of contact objects
            console.log("the data is: ", result);
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }
    deleteContact() {
        let contactsToBeDeleted = [];
        for (var index = 0; index < this.contacts.length; index++) {
            if(this.contacts[index].checked){
                contactsToBeDeleted.push(this.contacts[index]);
            }
        }

        this.database.deleteContact(contactsToBeDeleted).then((result) => {
            console.log("DELETED: ", result);
        }, (error) => {
            console.log("ERROR: ", error);
        });;
        this.readContact();
    }

}

