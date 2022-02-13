export interface IRespCitas {
    message: string;
    data: ICita[];
}

export interface IRespCita {
    message: string;
    data: ICita;
}

export type Estado = 'pendiente' | 'rechazado' | 'aceptado';
export type Cliente = 'cancelado' | 'no-cancelado';

export interface ICita {
    id: string;
    medico_id: string;
    name: string;
    description: string;
    sala_meet_cita: string;
    estado: Estado;
    created_at: Date;
    cliente: Cliente;
}

export interface CreateCitaDto extends Omit<ICita, 'id'> { }
export interface UpdateCitaDto extends Partial<CreateCitaDto> { }