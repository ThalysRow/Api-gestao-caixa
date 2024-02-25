import {
	Controller,
	Post,
	Body,
	UseGuards,
	Res,
	HttpStatus,
	Put,
	Param,
	Get,
	Query
} from '@nestjs/common'
import { ProdutosService } from './produtos.service'
import { CreateProdutoDto } from './dto/create-produto.dto'

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { Response } from 'express'
import { UpdateProdutoDto } from './dto/update-produto.dto'

@UseGuards(JwtAuthGuard)
@Controller('produto')
export class ProdutosController {
	constructor(private readonly produtosService: ProdutosService) {}

	@Post()
	async create(@Body() data: CreateProdutoDto, @Res() res: Response) {
		await this.produtosService.cadastrarProduto(data)
		return res
			.status(HttpStatus.CREATED)
			.json({ message: 'Produto cadastrado com sucesso!' })
	}

	@Put(':id')
	async update(
		@Param('id') id: string,
		@Body() data: UpdateProdutoDto,
		@Res() res: Response
	) {
		await this.produtosService.editarProduto(id, data)
		return res.status(HttpStatus.NO_CONTENT).send()
	}

	@Get()
	async findAll(
		@Query('categoria_id') categoria_id: string,
		@Res() res: Response
	) {
		if (categoria_id) {
			const lista = await this.produtosService.listarProdutosId(categoria_id)
			return res.status(HttpStatus.OK).json(lista)
		}

		const lista = await this.produtosService.listarProdutos()

		return res.status(HttpStatus.OK).json(lista)
	}

	@Get(':id')
	async findeOne(@Param('id') id: string, @Res() res: Response) {
		const produto = await this.produtosService.detalharProduto(id)
		return res.status(HttpStatus.OK).json(produto)
	}
}
