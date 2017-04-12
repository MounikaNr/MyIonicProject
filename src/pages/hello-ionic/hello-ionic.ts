import { Component } from '@angular/core';
import { Database } from '../../provider/database';
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
  providers: [Database]
})
export class HelloIonicPage {
}
