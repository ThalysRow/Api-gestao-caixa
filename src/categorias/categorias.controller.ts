import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common'
import { CategoriasService } from './categorias.service'
import CreateCategoriaDto from './dto/create-categoria.dto'
import { Response } from 'express'

@Controller('categorias')
export class CategoriasController {
	constructor(private readonly categoriasService: CategoriasService) {}

	@Post()
	async create(@Body() data: CreateCategoriaDto, @Res() res: Response) {
		await this.categoriasService.criarCategoria(data)
		return res
			.status(HttpStatus.CREATED)
			.json({ message: 'Categoria criada com sucesso!' })
	}

	@Get()
	async findAll(@Res() res: Response) {
		const categorias = await this.categoriasService.listarCategorias()
		return res.status(HttpStatus.OK).json({ categorias })
	}
}
