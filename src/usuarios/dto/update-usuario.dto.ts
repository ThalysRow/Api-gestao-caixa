import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UpdateUsuarioDto {
	@IsNotEmpty({ message: 'O campo nome é obrigatório' })
	@IsString({ message: 'O campo nome deve receber uma string' })
	nome: string

	@IsNotEmpty({ message: 'O campo e-mail é obrigatório' })
	@IsEmail({}, { message: 'Formato de e-mail inválido' })
	email: string

	@IsNotEmpty({ message: 'O campo senha é obrigatório' })
	@IsString({ message: 'O campo senha deve receber uma string' })
	senha: string
}
