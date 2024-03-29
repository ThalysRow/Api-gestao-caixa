import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator'

export class CreateProdutoDto {
	@IsString({ message: 'O campo deve receber uma string' })
	@IsNotEmpty({ message: 'O campo descrição é obrigatório' })
	@Matches(/[^ ]/, { message: 'O campo descrição não pode estar vazio' })
	descricao: string

	@IsNotEmpty({ message: 'O campo quantidade é obrigatório' })
	// @IsNumber()
	// @IsPositive({ message: 'O campo quantidade deve receber um número positivo' })
	quantidade_estoque: string | number

	@IsNotEmpty({ message: 'O campo valor é obrigatório' })
	// @IsNumber()
	// @IsPositive({ message: 'O campo valor deve receber um número positivo' })
	valor: string | number

	@IsNotEmpty({ message: 'O campo categoria é obrigatório' })
	// @IsNumber()
	// @IsPositive({ message: 'O campo categoria deve receber um número positivo' })
	categoria_id: string | number

	@IsOptional()
	@IsString({ message: 'Deve ser enviado o link da imagem' })
	produto_imagem: string
}

export class ImagemDto {
	fieldname: string
	originalname: string
	mimetype: string
	buffer: Buffer
}
