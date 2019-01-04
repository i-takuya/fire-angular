import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Test { name: string; }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = environment.title;
  tests: AngularFirestoreCollection<Test>;
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.tests = db.collection<Test>('items');
    this.items = this.tests.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Test;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
