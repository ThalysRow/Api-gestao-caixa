import { Injectable } from '@nestjs/common'
import { CreateCategoriaDto } from './dto/create-categoria.dto'

@Injectable()
export class CategoriasService {
	create(createCategoriaDto: CreateCategoriaDto) {
		return 'This action adds a new categoria'
	}

	findAll() {
		return `This action returns all categorias`
	}

	findOne(id: number) {
		return `This action returns a #${id} categoria`
	}
}
