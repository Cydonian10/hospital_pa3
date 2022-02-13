import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMedico } from '@models/medico.interface';
import { FormBuilder, Validators } from '@angular/forms';

@Component( {
  selector: 'app-udpate',
  templateUrl: './udpate.component.html',
  styles: [
  ]
} )
export class UdpateComponent implements OnInit {

  myForm = this.fb.group( {
    status: [ , [ Validators.required ] ]
  } );

  constructor(
    public dialogRef: MatDialogRef<UdpateComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: IMedico,
    private fb: FormBuilder
  ) { }

  ngOnInit (): void {
    this.myForm.reset( { status: this.data.status } );
  }

  handleSubmit () {
    this.dialogRef.close( this.myForm.value );
  }
}
