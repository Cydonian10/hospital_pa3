import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
  name: 'toArray'
} )
export class ToArrayPipe implements PipeTransform {

  transform ( value: string, ): unknown {

    const newValue = JSON.parse( value );
    console.log( newValue );
    return newValue;
  }

}
