import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreatePedidoDto } from './dto/create-pedido.dto'
import { ClientesService } from '../clientes/clientes.service'
import { ProdutosService } from 'src/produtos/produtos.service'
import * as sendGrid from '@sendgrid/mail'
import { formateData } from 'src/utils/users.functions'

@Injectable()
export class PedidosService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly cliente: ClientesService,
		private readonly produto: ProdutosService
	) {}

	async cadastrarPedido(data: CreatePedidoDto) {
		const cliente = await this.cliente.buscarClienteId(data.cliente_id)

		if (!cliente) {
			throw new NotFoundException('Cliente não encontrado')
		}

		let totalDoPedido = 0
		const itens = []

		for (const pedido of data.pedido_produtos) {
			const produto = await this.produto.buscarProduto(pedido.produto_id)

			if (!produto) {
				throw new NotFoundException('Produto não encontrado')
			}

			if (produto.quantidade_estoque < pedido.quantidade_produto) {
				throw new BadRequestException(
					`Quantidade de ${produto.descricao} excedida`
				)
			}

			await this.prisma.product.update({
				where: {
					id: produto.id
				},
				data: {
					quantidade_estoque: {
						decrement: pedido.quantidade_produto
					}
				}
			})

			itens.push({
				pedido: produto.descricao,
				quantidade: pedido.quantidade_produto,
				valorUnitario: produto.valor,
				produtoId: produto.id
			})

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			totalDoPedido += produto.valor * pedido.quantidade_produto
		}

		const pedidoId = await this.prisma.request.create({
			data: {
				cliente_id: data.cliente_id,
				observacao: formateData(data.observacao),
				valor_total: totalDoPedido
			}
		})

		for (const item of itens) {
			await this.prisma.product_request.create({
				data: {
					pedido_id: pedidoId.id,
					produto_id: item.produtoId,
					quantidade_produto: item.quantidade,
					valor_produto: item.valorUnitario
				}
			})
		}

		sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

		const mensagem = {
			to: cliente.email,
			from: process.env.MY_EMAIL,
			subject: 'Rogue Web Store',
			html: '<strong>Agradecemos pela sua compra!</strong>'
		}

		sendGrid.send(mensagem).catch(error => console.log(error))

		return
	}

	async listarPedidos() {
		const pedidos = await this.prisma.request.findMany({
			include: {
				Product_request: {
					include: {
						product: true
					}
				}
			}
		})

		const resultado = pedidos.map(pedido => {
			return {
				pedido: {
					id: pedido.id,
					valor_total: pedido.valor_total,
					observacao: formateData(pedido.observacao),
					cliente_id: pedido.cliente_id
				},
				pedido_produtos: pedido.Product_request.map(produto => {
					return {
						id: produto.id,
						quantidade_produto: produto.quantidade_produto,
						valor_produto: produto.valor_produto,
						pedido_id: produto.pedido_id,
						produto_id: produto.produto_id
					}
				})
			}
		})

		return resultado
	}

	async pedidosPorCliente(id: string) {
		const cliente = await this.cliente.buscarClienteId(id)

		if (!cliente) {
			throw new NotFoundException('Cliente não encontrado')
		}

		const pedidos = await this.prisma.request.findMany({
			where: {
				cliente_id: id
			},
			include: {
				Product_request: {
					include: {
						product: true
					}
				}
			}
		})

		const resultado = pedidos.map(pedido => {
			return {
				pedido: {
					id: pedido.id,
					valor_total: pedido.valor_total,
					observacao: formateData(pedido.observacao),
					cliente_id: pedido.cliente_id
				},
				pedido_produtos: pedido.Product_request.map(produto => {
					return {
						id: produto.id,
						quantidade_produto: produto.quantidade_produto,
						valor_produto: produto.valor_produto,
						pedido_id: produto.pedido_id,
						produto_id: produto.produto_id
					}
				})
			}
		})

		return resultado
	}
}
