import { Injectable } from '@angular/core';

import { BehaviorSubject, finalize, from, switchMap } from 'rxjs';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable( {
  providedIn: 'root'
} )
export class UploadImageService {

  public urlImage: BehaviorSubject<string> = new BehaviorSubject<string>( '' );

  constructor(
    private storage: Storage
  ) { }


  uploadFile ( e: Event ) {
    const event = ( e.target as HTMLInputElement );
    const image = event.files![ 0 ];

    const name = `${ image.name }`;
    // const ref = this.storage.ref( name );
    //const task = this.storage.upload( name, image );

    const storageRef = ref( this.storage, name );
    const uploadTask = from( uploadBytes( storageRef, image ) );

    return uploadTask.pipe(
      switchMap( ( result ) => getDownloadURL( result.ref ) )
    );
    // .subscribe( url => {
    //   this.urlImage.next( url );
    // } );
  }

}
