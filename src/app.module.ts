import { Module } from '@nestjs/common'
import { CategoriasModule } from './categorias/categorias.module'
import { PrismaModule } from './database/prisma.module'
import { UsuariosModule } from './usuarios/usuarios.module'
import { AuthModule } from './auth/auth.module'
import { ProdutosModule } from './produtos/produtos.module'
import { ClientesModule } from './clientes/clientes.module'

@Module({
	imports: [
		CategoriasModule,
		PrismaModule,
		UsuariosModule,
		AuthModule,
		ProdutosModule,
		ClientesModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
