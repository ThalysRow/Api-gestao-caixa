import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator'

export class UpdateProdutoDto {
	@IsString({ message: 'O campo deve receber uma string' })
	@IsNotEmpty({ message: 'O campo descrição é obrigatório' })
	@Matches(/[^ ]/, { message: 'O campo descrição não pode estar vazio' })
	descricao: string

	@IsNotEmpty({ message: 'O campo quantidade é obrigatório' })
	quantidade_estoque: number | string

	@IsNotEmpty({ message: 'O campo valor é obrigatório' })
	valor: number | string

	@IsNotEmpty({ message: 'O campo categoria é obrigatório' })
	categoria_id: number | string

	@IsOptional()
	@IsString({ message: 'O campo produto_imagem deve receber um texto' })
	produto_imagem: string
}
