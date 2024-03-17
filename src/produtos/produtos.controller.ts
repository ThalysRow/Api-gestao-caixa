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
	Query,
	Delete,
	UseInterceptors,
	UploadedFile
} from '@nestjs/common'
import { ProdutosService } from './produtos.service'
import { CreateProdutoDto, ImagemDto } from './dto/create-produto.dto'

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { Response } from 'express'
import { UpdateProdutoDto } from './dto/update-produto.dto'
import { FileInterceptor } from '@nestjs/platform-express'

@UseGuards(JwtAuthGuard)
@Controller('produto')
export class ProdutosController {
	constructor(private readonly produtosService: ProdutosService) {}

	@Post()
	@UseInterceptors(FileInterceptor('produto_imagem'))
	async create(
		@UploadedFile() produto_imagem: ImagemDto,
		@Body() data: CreateProdutoDto,
		@Res() res: Response
	) {
		if (produto_imagem) {
			const produtoCadastrado =
				await this.produtosService.cadastrarProdutoImagem(data, produto_imagem)

			return res.status(HttpStatus.CREATED).json(produtoCadastrado)
		}
		const produtoCadastrado = await this.produtosService.cadastrarProduto(data)
		return res.status(HttpStatus.CREATED).json(produtoCadastrado)
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

	@Delete(':id')
	async del(@Param('id') id: string, @Res() res: Response) {
		await this.produtosService.excluirProduto(id)
		return res.status(HttpStatus.NO_CONTENT).send()
	}
}
