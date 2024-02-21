import { Injectable } from '@nestjs/common'
import CreateCategoriaDto from './dto/create-categoria.dto'
import { PrismaService } from 'src/database/prisma.service'

@Injectable()
export class CategoriasService {
	constructor(private readonly prisma: PrismaService) {}

	async listarCategorias() {
		return await this.prisma.category.findMany()
	}

	async criarCategoria(data: CreateCategoriaDto) {
		return await this.prisma.category.create({ data })
	}
}
