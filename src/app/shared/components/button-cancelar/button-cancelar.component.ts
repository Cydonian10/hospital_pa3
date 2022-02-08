import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component( {
  selector: 'app-button-cancelar',
  template: `
    <button (click)="handleClick()" [type]="type" class="bg-red-400 px-6 py-1 active:scale-95 text-white shadow-md shadow-green-500/30">
        <ng-content></ng-content>
    </button>
  `,
  styles: []
} )
export class ButtonCancelarComponent {


  @Input() type: string = "button";
  @Output() onClick = new EventEmitter();

  handleClick () {
    this.onClick.emit();
  }

}
