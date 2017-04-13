import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Nav, Platform } from 'ionic-angular';
import { GlobalData } from '../provider/global-data';
import { ContactInfo } from '../models/contact';
@Injectable()
export class Database {

    //private db: SQLiteObject = this.globalData.db;


    constructor(public platform: Platform, public sqlite: SQLite, public globaldata: GlobalData) {
        console.log('Hello Database Provider');
    }

    insertContact(contactno, firstname, lastname) {
        console.log("contactnum=", contactno);
        console.log("firstname", firstname);
        console.log("lastname", lastname);
        return new Promise((resolve, reject) => {
            let query = "";
            query = "INSERT INTO CONTACTS ('contactnumber', 'firstname', 'lastname') VALUES (" + contactno + ",'" + firstname + "','" + lastname + "')";
            console.log("QUERY: " + query);
            this.globaldata.db.executeSql(query, []).then((data) => {
                console.log("INSERTED: " + JSON.stringify(data));
                resolve(data);
            }, (error) => {
                console.log("elements");
                if (error.code == 6) {
                    window.alert(error.message);
                }
                reject(error);
            });
        });

    }

    /*readContact() {

        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM CONTACTS";
            console.log("QUERY: " + query);
            this.globaldata.db.executeSql(query, []).then((data) => {
                resolve(data);
            }, (error) => {
                console.log("elements are read");
                reject(error);
            });
        });
    }*/
    readContacts() {

        return new Promise((resolve, reject) => {
            let query = "SELECT * FROM CONTACTS";
            console.log("QUERY: " + query);
            this.globaldata.db.executeSql(query, []).then((data) => {
                let contacts = [];
                let contact: ContactInfo;
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        contact = new ContactInfo();
                        contact.contactnumber = data.rows.item(i).contactnumber;
                        contact.firstname = data.rows.item(i).firstname;
                        contact.lastname = data.rows.item(i).lastname;

                        // message.data = new MessageData(data.rows.item(i).dataType, data.rows.item(i).url);

                        contacts.push(contact);
                    }
                }
                resolve(contacts);
            }, (error) => {
                //console.log("ERROR: ", JSON.stringify(error));
                reject(error);
            });
        });
    }
     deleteContact(contactsToBeDeleted: ContactInfo[]) {
        return new Promise((resolve, reject) => {
            let query = "DELETE FROM CONTACTS WHERE ";
            for (var index = 0; index < contactsToBeDeleted.length; index++) {
                if (contactsToBeDeleted[index].checked) {
                    query += "contactnumber=" + contactsToBeDeleted[index].contactnumber;
                    if (index == contactsToBeDeleted.length - 1) {
                        //last contact
                    } else {
                        query += " OR ";
                    }
                }
            }
            console.log("QUERY: " + query);
            this.globaldata.db.executeSql(query, []).then((data) => {
                resolve(data);
            }, (error) => {
                //console.log("ERROR: ", JSON.stringify(error));
                reject(error);
            });
        });
    }


}

