import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateClienteDto } from './dto/create-cliente.dto'
import { formateData } from 'src/utils/users.functions'

@Injectable()
export class ClientesService {
	constructor(private readonly prisma: PrismaService) {}

	async buscarClienteEmail(email: string) {
		return this.prisma.client.findFirst({ where: { email } })
	}

	async buscarClienteCpf(cpf: string) {
		return this.prisma.client.findFirst({ where: { cpf } })
	}

	async cadastrarCliente(data: CreateClienteDto) {
		const email = await this.buscarClienteEmail(data.email)
		const cpf = await this.buscarClienteCpf(data.cpf)

		if (email) {
			throw new BadRequestException('E-mail já em uso')
		}

		if (cpf) {
			throw new BadRequestException('CPF já em uso')
		}

		const dados = {
			nome: formateData(data.nome),
			email: data.email,
			cpf: data.cpf,
			cep: data.cep !== undefined ? data.cep : 'undefined',
			rua: data.rua !== undefined ? formateData(data.rua) : 'undefined',
			numero: data.numero !== undefined ? data.numero : 0,
			bairro:
				data.bairro !== undefined ? formateData(data.bairro) : 'undefined',
			cidade:
				data.cidade !== undefined ? formateData(data.cidade) : 'undefined',
			estado:
				data.estado !== undefined ? data.estado.toUpperCase() : 'undefined'
		}

		return this.prisma.client.create({ data: dados })
	}
}
