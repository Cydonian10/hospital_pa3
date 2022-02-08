import { Component, Input, OnInit } from '@angular/core';
import { IMedico } from '@models/medico.interface';
import { IUsuario } from '@models/usuario.interface';

@Component( {
  selector: 'app-card-medico',
  template: `
   <article class="shadow-lg p-4" >
        <div class="flex items-center justify-between">
            <h2>{{medico.name}}</h2>
            <span
                  class="bg-indigo-400 text-white rounded-full px-2 text-xs py-1">
                {{medico.especialidad | titlecase}}
            </span>
        </div>

        <figure class="p-2 rounded-sm overflow-hidden">
            <img class="rounded-sm object-cover w-full h-48" [src]="medico.photo" alt="">
        </figure>

        <div class="pt-2 flex items-center gap-2">
            <button (click)="toogleModal()" [routerLink]="['/usuarios','create-citas',medico.id]" class="text-indigo-500 border border-indigo-400 w-full py-1">Detalle</button>
            <button class="text-rose-500 border border-rose-400 w-full py-1">Generar Cita</button>
        </div>
    </article>

    <app-modal-info [medico]="medico" [show]="showModal" (onClose)="toogleModal()" >
    </app-modal-info>
  `,
  styles: [
  ]
} )
export class CardMedicoComponent {

  @Input() medico!: IMedico;
  @Input() usuario: IUsuario = {} as IUsuario;
  public showModal: boolean = false;

  toogleModal () {
    this.showModal = !this.showModal;
  }

}
