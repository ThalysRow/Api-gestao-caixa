import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProdutoDto } from './dto/create-produto.dto'
import { PrismaService } from 'src/database/prisma.service'
import { formateData } from 'src/utils/users.functions'
import { UpdateProdutoDto } from './dto/update-produto.dto'

@Injectable()
export class ProdutosService {
	constructor(private readonly prisma: PrismaService) {}

	async buscarProduto(id: string) {
		return await this.prisma.product.findFirst({ where: { id } })
	}

	async cadastrarProduto(data: CreateProdutoDto) {
		const categoria = await this.prisma.category.findFirst({
			where: {
				id: data.categoria_id
			}
		})

		if (!categoria) {
			throw new NotFoundException('Categoria não encontrada')
		}

		return await this.prisma.product.create({
			data: {
				descricao: formateData(data.descricao),
				quantidade_estoque: data.quantidade_estoque,
				valor: data.valor,
				categoria_id: data.categoria_id
			}
		})
	}

	async editarProduto(id: string, data: UpdateProdutoDto) {
		const produto = await this.buscarProduto(id)
		const categoria = await this.prisma.category.findFirst({
			where: { id: data.categoria_id }
		})

		if (!produto) {
			throw new NotFoundException('Produto não encontrado')
		}

		if (!categoria) {
			throw new NotFoundException('Categoria não encontrada')
		}

		return await this.prisma.product.update({
			where: {
				id
			},
			data
		})
	}

	async listarProdutos() {
		return this.prisma.product.findMany()
	}

	async listarProdutosId(id: string) {
		const categoria = await this.prisma.category.findFirst({
			where: {
				id: Number(id)
			}
		})

		if (!categoria) {
			throw new NotFoundException('Categoria não encontrada')
		}

		return this.prisma.product.findMany({
			where: {
				categoria_id: Number(id)
			}
		})
	}
}
