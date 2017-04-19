import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { Contacts } from '../pages/contacts/contacts';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { GlobalData } from '../provider/global-data';


@Component({
  templateUrl: 'app.html',
  providers: [SQLite, GlobalData]

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private sqlite: SQLite,
    private globaldata: GlobalData
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      
      { title: 'ContactInfo', component: Contacts },
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.createTable();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  createTable() {
    this.platform.ready().then(() => {
      //init DB
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          //save db in global
          this.globaldata.db = db;
          let query = "CREATE TABLE CONTACTS ("
            + "'contactnumber' INTEGER PRIMARY KEY "
            + ", 'firstname' TEXT"
          
            + ", 'lastname' TEXT)";

          console.log("QUERY: ", query);
          db.executeSql(query
            , {})
            .then(() => {
              console.log('Executed SQL');
            })
            .catch(e => console.log(e));
        })
        
        .catch(e => console.log(e));
        
    });
  }
}
