import { Injectable } from "@angular/core";
import {
  AngularFirestore
} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import { Observable } from "rxjs";

export interface FirestoreModel {
  id?: string;
  created?: firebase.firestore.FieldValue | firebase.firestore.Timestamp | any;
  modified?: firebase.firestore.FieldValue | firebase.firestore.Timestamp | any;
}

@Injectable()
export class Firestore {
  constructor(private afs: AngularFirestore) {}

  async docAsync<T>(path: string): Promise<T> {
    const doc = await this.afs.doc<T>(`${path}`).ref.get();
    return <T>doc.data();
  }

  doc<T>(path: string): Observable<T | undefined> {
    return this.afs.doc<T>(`${path}`).valueChanges();
  }

  add(path: string, data: any) {
    const doc = {
      id: this.generatedId,
      created: this.timestamp,
      modified: this.timestamp,
      ...data,
    };
    return this.afs
      .doc(`${path}/${doc.id}`)
      .set(doc)
      .then(() => doc);
  }

  set(path: string, id: string, data: any, merge: boolean = false) {
    const created = this.timestamp;
    const modified = this.timestamp;
    return this.afs
      .doc(`${path}/${id}`)
      .set({ id, created, ...data, modified }, { merge: merge });
  }

  setWithoutMetadata(path: string, id: string, data: any) {
    return this.afs.doc(`${path}/${id}`).set({ ...data });
  }

  update(path: string, id: string, data: any) {
    const modified = this.timestamp;
    return this.afs.doc(`${path}/${id}`).update({ ...data, modified });
  }

  delete(path: string, id: string) {
    return this.afs.doc(`${path}/${id}`).delete();
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  get generatedId() {
    return this.afs.createId();
  }

}
