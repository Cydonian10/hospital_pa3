export interface IRespUsuarios {
    message: string;
    data: IUsuario[];
}

export interface IRespUsuario {
    message: string;
    data: IUsuario;
}

export interface IUsuario {
    id: string,
    name: string,
    last_name: string,
    email: string,
    rol: string,
    telefono: string,
    photo: null,
    status: string,
    created_at: Date,
    updated_at: Date,
    // created_at: Date,
    // updated_at: Date,
}

export interface CreateUsuarioDto extends Omit<IUsuario, 'id'> { }
export interface UpdateUsuarioDto extends Partial<CreateUsuarioDto> { }