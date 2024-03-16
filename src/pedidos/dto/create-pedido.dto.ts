import {
	IsArray,
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches
} from 'class-validator'

export class CreatePedidoDto {
	@IsNotEmpty({ message: 'O campo cliente_id é obrigatório' })
	@IsString({ message: 'Formato do cliente_id inválido' })
	@Matches(/[^ ]/, { message: 'O campo cliente_id não pode estar vazio' })
	cliente_id: string

	@IsOptional()
	@IsString({ message: 'O campo observação deve receber um texto' })
	observacao: string
	@IsArray({
		message: 'O campo pedido_produtos deve receber uma array de produtos'
	})
	pedido_produtos: {
		produto_id: string
		quantidade_produto: number
	}[]
}
