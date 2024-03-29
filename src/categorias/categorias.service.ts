import { Injectable } from '@nestjs/common'
import CreateCategoriaDto from './dto/create-categoria.dto'
import { PrismaService } from 'src/database/prisma.service'
import { formateData } from 'src/utils/users.functions'

@Injectable()
export class CategoriasService {
	constructor(private readonly prisma: PrismaService) {}

	async listarCategorias() {
		return this.prisma.category.findMany()
	}

	async criarCategoria(data: CreateCategoriaDto) {
		return this.prisma.category.create({
			data: {
				descricao: formateData(data.descricao)
			}
		})
	}

	async deletarCategoria(id: string) {
		return this.prisma.category.delete({
			where: {
				id: Number(id)
			}
		})
	}
}
