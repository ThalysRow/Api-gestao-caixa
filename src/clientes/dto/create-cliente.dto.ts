import {
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	Length,
	Matches
} from 'class-validator'

export class CreateClienteDto {
	@IsString({ message: 'O campo nome deve receber um texto' })
	@IsNotEmpty({ message: 'O campo nome é obrigatório' })
	@Matches(/[^ ]/, { message: 'O campo nome não pode estar vazio' })
	nome: string

	@IsNotEmpty({ message: 'O campo e-mail é obrigatório' })
	@IsEmail({}, { message: 'Formato de e-mail inválido' })
	email: string

	@IsNotEmpty({ message: 'O campo CPF é obrigatório' })
	@Length(11, 11, { message: 'O campo CPF deve conter 11 números' })
	@Matches(/^[0-9]+$/, { message: 'O CPF deve conter apenas números' })
	cpf: string

	@IsOptional()
	@IsString({ message: 'Formato inválido' })
	@Length(9, 9, { message: `O CEP deve ser inserido: '88070-101'` })
	cep?: string

	@IsOptional()
	@IsString({ message: 'Formato inválido' })
	@Matches(/[^ ]/, { message: 'O campo rua não pode estar vazio' })
	rua?: string

	@IsOptional()
	@IsNumber({}, { message: 'O campo número deve receber um número' })
	@IsPositive({ message: 'O campo número deve receber um número positivo' })
	numero?: number

	@IsOptional()
	@IsString({ message: 'Formato inválido' })
	@Matches(/[^ ]/, { message: 'O campo bairro não pode estar vazio' })
	bairro?: string

	@IsOptional()
	@IsString({ message: 'Formato inválido' })
	@Matches(/[^ ]/, { message: 'O campo cidade não pode estar vazio' })
	cidade?: string

	@IsOptional()
	@IsString({ message: 'Formato inválido' })
	@Matches(/[^ ]/, { message: 'O campo estado não pode estar vazio' })
	@Length(2, 2, { message: `O campo estado deve ser inserido como: 'SC'` })
	estado?: string
}
