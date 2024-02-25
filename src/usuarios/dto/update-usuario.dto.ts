import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator'

export class UpdateUsuarioDto {
	@IsNotEmpty({ message: 'O campo nome é obrigatório' })
	@IsString({ message: 'O campo nome deve receber uma string' })
	@Matches(/[^ ]/, { message: 'O campo nome não pode estar vazio' })
	nome: string

	@IsNotEmpty({ message: 'O campo e-mail é obrigatório' })
	@IsEmail({}, { message: 'Formato de e-mail inválido' })
	email: string

	@IsNotEmpty({ message: 'A senha é obrigatória' })
	@IsString({ message: 'A senha deve receber uma string' })
	@Matches(/^\S+$/, { message: 'A senha não pode conter espaço em branco' })
	@Length(8, 30, {
		message: 'A senha deve ter no mínimo 8 caracteres e no máximo 30'
	})
	senha: string
}
