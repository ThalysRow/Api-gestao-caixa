import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProdutoDto } from './dto/create-produto.dto'
import { PrismaService } from 'src/database/prisma.service'
import { formateData } from 'src/utils/users.functions'

@Injectable()
export class ProdutosService {
	constructor(private readonly prisma: PrismaService) {}

	async cadastrarProduto(data: CreateProdutoDto) {
		const categoria = await this.prisma.category.findFirst({
			where: {
				id: data.categoria_id
			}
		})

		if (!categoria) {
			throw new NotFoundException('Categoria não encontrada')
		}

		return this.prisma.product.create({
			data: {
				descricao: formateData(data.descricao),
				quantidade_estoque: data.quantidade_estoque,
				valor: data.valor,
				categoria_id: data.categoria_id
			}
		})
	}
}
