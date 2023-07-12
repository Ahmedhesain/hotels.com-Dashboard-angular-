import { Component } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
offers !: Observable<any> ;
name !: string ;
price !: number ;
price2 !: number ;
description !: string ;
city !: string ;
avilabilty !: string ;
  constructor (private firestore :Firestore){
    this.getOffers();
  }

  getOffers(){
    const collectionInstance =  collection(this.firestore ,'Offers');
    collectionData(collectionInstance).subscribe(val => {
      console.log(val);
      this.offers = collectionData(collectionInstance , {idField:'id'});
    })
  }
  saveOffer(){
    const collectionInstance =  collection(this.firestore ,'Offers');
    if(this.name!='' && this.description!='' && this.price!=null && this.price2!=null && this.city !='' && this.avilabilty!='' ){
      addDoc(collectionInstance , {
        Name : this.name,
        price : this.price,
        price2 : this.price2,
        avilabilty : this.avilabilty,
        city : this.city,
        description : this.description
      }).then(() => {
        console.log("offer saved");
      }).catch((err)=>{
        console.log(err);

      })
    }
    this.resetOffer();
  }
resetOffer (){
  this.name='';
  this.price=-1;
  this.price2=-1;
  this.city='';
  this.avilabilty='';
  this.description=''

}
  deleteOffer(id:string){
    const docInstance =  doc(this.firestore ,'Offers',id);
    deleteDoc(docInstance).then(() => {
      console.log('offer deleted')
    }).catch((err) => {
        console.log(err);

      });

    }

}
