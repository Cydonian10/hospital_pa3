export interface ILoginData {
    email: string;
    password: string;
}

export interface IResAuth {
    message: string;
    token: string;
}

export interface IRegistroPaciente {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface IRegistroMedico {
    name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    especialidad_id: number;
}