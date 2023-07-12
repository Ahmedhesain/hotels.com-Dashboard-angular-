import { Component } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent {

  ads!: Observable<any>;
  name !: string;
  img !: string;

  constructor(private firestore : Firestore){
    this.getAds();
  }

  getAds(){
    const collectionInstance = collection(this.firestore , "ads");
    collectionData(collectionInstance).subscribe(val => {
      console.log(val);

      this.ads = collectionData(collectionInstance , {idField : 'id'})

    })
  }
  saveAds(){
    const collectionInstance = collection (this.firestore ,"ads");
    if (this.name !=''&& this.img !=''){
      addDoc(collectionInstance , {
        name : this.name ,
        img : this.img
      }).then(() => {
        console.log('ads saved');

      }).catch((err) => {
        console.log(err);

      });
    }
    this.resetData();
  }
  deleteAds(id:string){
    const docInstance = doc(this.firestore ,"ads" ,id);
    deleteDoc(docInstance).then(() =>{
      console.log("City deleted");
    }).catch((err)=>{
      console.log(err);
    })
  }
  resetData(){
    this.name = '';
    this.img = '';
  }
}
