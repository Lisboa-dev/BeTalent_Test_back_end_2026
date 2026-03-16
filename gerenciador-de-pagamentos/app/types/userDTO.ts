
export enum RoleEnum {
    ADMIN = 'admin',
    USER = 'user',
    MANAGER = 'manager',
    FINANCE = 'finance',
}

export type CreateUserDTO={
  fullName: string
  email: string
  password: string
}

export type UpdateUserDTO={
  fullName?: string 
  email?: string 
}


export type AdminUpdateUserDTO = {
  fullName?: string 
  email?: string
  role?: RoleEnum
}