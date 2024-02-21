import { IsNotEmpty, IsString } from 'class-validator'

export default class CreateCategoriaDto {
	@IsNotEmpty({ message: 'O campo descrição é obrigatório' })
	@IsString({ message: 'O campo descrição deve receber uma string' })
	descricao: string
}
