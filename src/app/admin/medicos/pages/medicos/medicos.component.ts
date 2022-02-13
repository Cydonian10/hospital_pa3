import { Component, OnInit } from '@angular/core';
import { MedicoService } from '@services/medico.service';
import { IMedico } from '@models/medico.interface';
import { MatDialog } from '@angular/material/dialog';
import { UdpateComponent } from '../../components/udpate/udpate.component';

@Component( {
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: [ './medicos.component.scss' ]
} )
export class MedicosComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'especialidad', 'photo', 'status', 'acciones' ];
  public enviando: 'intial' | 'error' | 'success' = 'intial';

  medicos: IMedico[] = [];

  constructor(
    private medicoService: MedicoService,
    public dialog: MatDialog
  ) { }

  ngOnInit (): void {
    this.medicoService.medicos$.subscribe( resp => {
      this.medicos = resp;
    } );
  }

  openUpdate ( data: IMedico ) {
    const dialogRef = this.dialog.open( UdpateComponent, {
      width: '500px',
      data
    } );

    dialogRef.afterClosed().subscribe( result => {
      if ( result == undefined ) {
        return;
      }
      this.medicoService.update( result, data.id ).subscribe(
        {
          next: ( ( resp ) => {
            this.enviando = 'success';
          } ),
          complete: ( () => {
            setTimeout( () => {
              this.enviando = 'intial';
            }, 3000 );
          } )
        }
      );
    } );
  }


}
