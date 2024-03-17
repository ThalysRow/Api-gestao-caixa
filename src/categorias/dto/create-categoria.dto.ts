import { IsNotEmpty, IsString, Matches } from 'class-validator'

export default class CreateCategoriaDto {
	@IsNotEmpty({ message: 'O campo descrição é obrigatório' })
	@IsString({ message: 'O campo descrição deve receber uma string' })
	@Matches(/[^ ]/, { message: 'O campo descricao não pode estar vazio' })
	descricao: string
}
