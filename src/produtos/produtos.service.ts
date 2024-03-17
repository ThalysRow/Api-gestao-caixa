import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { formateData } from 'src/utils/users.functions'
import { UpdateProdutoDto } from './dto/update-produto.dto'
import { CreateProdutoDto, ImagemDto } from './dto/create-produto.dto'
import { UploadedFile, deleteFile } from 'src/upload/upload-file'

@Injectable()
export class ProdutosService {
	constructor(private readonly prisma: PrismaService) {}

	async buscarProduto(id: string) {
		return await this.prisma.product.findFirst({ where: { id } })
	}

	async cadastrarProdutoImagem(data1: CreateProdutoDto, data2: ImagemDto) {
		const categoria = await this.prisma.category.findFirst({
			where: {
				id: Number(data1.categoria_id)
			}
		})

		if (!categoria) {
			throw new NotFoundException('Categoria não encontrada')
		}

		const imagem = await UploadedFile(data2)

		return this.prisma.product.create({
			data: {
				descricao: formateData(data1.descricao),
				quantidade_estoque: Number(data1.quantidade_estoque),
				valor: Number(data1.valor),
				categoria_id: Number(data1.categoria_id),
				produto_imagem: imagem.url
			}
		})
	}

	async cadastrarProduto(data: CreateProdutoDto) {
		const categoria = await this.prisma.category.findFirst({
			where: {
				id: Number(data.categoria_id)
			}
		})

		if (!categoria) {
			throw new NotFoundException('Categoria não encontrada')
		}

		return this.prisma.product.create({
			data: {
				descricao: formateData(data.descricao),
				quantidade_estoque: Number(data.quantidade_estoque),
				valor: Number(data.valor),
				categoria_id: Number(data.categoria_id),
				produto_imagem: null
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

	async detalharProduto(id: string) {
		const produto = await this.buscarProduto(id)

		if (!produto) {
			throw new NotFoundException('Produto não encontado')
		}

		return produto
	}

	async excluirProduto(id: string) {
		const produto = await this.buscarProduto(id)

		if (!produto) {
			throw new NotFoundException('Produto não encontrado')
		}

		const produtoEmPedido = await this.prisma.product_request.findFirst({
			where: {
				produto_id: id
			}
		})

		if (produtoEmPedido) {
			throw new BadRequestException('Este produto está vinculado em um pedido')
		}

		if (produto.produto_imagem !== null) {
			const imagem = produto.produto_imagem.split('/')[3]
			await deleteFile(imagem)
		}

		return await this.prisma.product.delete({
			where: {
				id
			}
		})
	}
}
