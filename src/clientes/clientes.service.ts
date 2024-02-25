import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import { CreateClienteDto } from './dto/create-cliente.dto'
import { formateData } from 'src/utils/users.functions'
import { UpdateClienteDto } from './dto/update-cliente.dto'

@Injectable()
export class ClientesService {
	constructor(private readonly prisma: PrismaService) {}

	async buscarClienteEmail(email: string) {
		return this.prisma.client.findFirst({ where: { email } })
	}

	async buscarClienteCpf(cpf: string) {
		return this.prisma.client.findFirst({ where: { cpf } })
	}

	async buscarClienteId(id: string) {
		return this.prisma.client.findFirst({ where: { id } })
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
			cep: data.cep !== undefined ? data.cep : null,
			rua: data.rua !== undefined ? formateData(data.rua) : null,
			numero: data.numero !== undefined ? data.numero : null,
			bairro: data.bairro !== undefined ? formateData(data.bairro) : null,
			cidade: data.cidade !== undefined ? formateData(data.cidade) : null,
			estado: data.estado !== undefined ? data.estado.toUpperCase() : null
		}

		return this.prisma.client.create({ data: dados })
	}

	async editarCliente(id: string, data: UpdateClienteDto) {
		const cliente = await this.buscarClienteId(id)
		const email = await this.buscarClienteEmail(data.email)
		const cpf = await this.buscarClienteCpf(data.cpf)

		if (!cliente) {
			throw new NotFoundException('Cliente não encontrado')
		}

		if (email && email.id !== id) {
			throw new BadRequestException('E-mail já cadastrado')
		}

		if (cpf && cpf.id !== id) {
			throw new BadRequestException('CPF já cadastrado')
		}

		const dados = {
			nome: formateData(data.nome),
			email: data.email,
			cpf: data.cpf,
			cep: data.cep !== undefined ? data.cep : cliente.cep,
			rua: data.rua !== undefined ? formateData(data.rua) : cliente.rua,
			numero: data.numero !== undefined ? data.numero : cliente.numero,
			bairro:
				data.bairro !== undefined ? formateData(data.bairro) : cliente.bairro,
			cidade:
				data.cidade !== undefined ? formateData(data.cidade) : cliente.cidade,
			estado:
				data.estado !== undefined ? data.estado.toUpperCase() : cliente.estado
		}

		return this.prisma.client.update({
			where: {
				id
			},
			data: dados
		})
	}

	async listarClientes() {
		return this.prisma.client.findMany()
	}

	async detalharCliente(id: string) {
		const cliente = await this.buscarClienteId(id)

		if (!cliente) {
			throw new NotFoundException('Cliente não encontrado')
		}

		return cliente
	}
}
