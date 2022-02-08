export interface IRespMedicos {
    message: string;
    data: IMedico[];
}

export interface IRespMedico {
    message: string;
    data: IMedico;
}

export interface IMedico {
    id: number;
    especialidad_id: number;
    name: string;
    email: string;
    last_name: string;
    rol: string;
    photo: string;
    telefono: string;
    status: string;
    titulo_medico: string;
    created_at: Date;
    updated_at: Date;
    email_verified_at: null;
    horarios: string;
    especialidad: string;
}

export interface CreateMedicoDto extends Omit<IMedico, 'id' | 'especialidad_id'> {
    especialidad_id: number;
}
export interface UpdateMedicoDto extends Partial<CreateMedicoDto> { }