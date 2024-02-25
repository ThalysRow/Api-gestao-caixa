import {
	Controller,
	Post,
	Body,
	UseGuards,
	Res,
	HttpStatus,
	Put,
	Param
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
}
