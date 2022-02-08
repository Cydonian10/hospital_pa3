import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component( {
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: [ './button.component.scss' ]
} )
export class ButtonComponent {

  @Input() disable: boolean = false;
  @Input() type: string = "button";
  @Output() onClickFunction = new EventEmitter();

  onClick ( e: Event ) {
    this.onClickFunction.emit( e );
  }

}
