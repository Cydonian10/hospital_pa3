import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMedico } from '@models/medico.interface';

@Component( {
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: [ './modal-info.component.scss' ]
} )
export class ModalInfoComponent implements OnInit {

  @Input() show: boolean = false;
  @Input() medico!: IMedico;
  @Output() onClose = new EventEmitter<boolean>();

  get horarios () {
    return JSON.parse( this.medico.horarios );
  }

  constructor() { }

  ngOnInit (): void {
  }

  closeModal () {
    this.onClose.emit( !this.show );
  }

  toArray () {
    console.log( this.medico.horarios );
  }
}
