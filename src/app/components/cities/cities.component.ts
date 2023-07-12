import { Component } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {

  cities!: Observable<any>;
  name !: string  ;
  img !: string ;

  constructor(private firestore : Firestore){
    this.getCitiess();
  }

  getCitiess(){
    const collectionInstance = collection(this.firestore , "cities");
    collectionData(collectionInstance).subscribe(val => {
      console.log(val);
      this.cities = collectionData(collectionInstance , {idField : 'id'});
    })

  }

  saveCity(){
    const collectionInstance = collection (this.firestore ,"cities");
    if (this.name !=''&& this.img !=''){
      addDoc(collectionInstance , {
        name : this.name ,
        img : this.img
      }).then(() => {
        console.log('city saved');

      }).catch((err) => {
        console.log(err);

      });
    }
    this.resetData();
  }
  deleteCity(id:string){
    const docInstance = doc(this.firestore ,"cities" ,id);
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
