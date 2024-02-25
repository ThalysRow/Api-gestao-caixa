import {
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	Matches
} from 'class-validator'

export class CreateProdutoDto {
	@IsString({ message: 'O campo deve receber uma string' })
	@IsNotEmpty({ message: 'O campo descrição é obrigatório' })
	@Matches(/[^ ]/, { message: 'O campo descrição não pode estar vazio' })
	descricao: string

	@IsNotEmpty({ message: 'O campo quantidade é obrigatório' })
	@IsNumber()
	@IsPositive({ message: 'O campo quantidade deve receber um número positivo' })
	quantidade_estoque: number

	@IsNotEmpty({ message: 'O campo valor é obrigatório' })
	@IsNumber()
	@IsPositive({ message: 'O campo valor deve receber um número positivo' })
	valor: number

	@IsNotEmpty({ message: 'O campo categoria é obrigatório' })
	@IsNumber()
	@IsPositive({ message: 'O campo categoria deve receber um número positivo' })
	categoria_id: number
}
