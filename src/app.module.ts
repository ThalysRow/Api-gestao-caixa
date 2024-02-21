import { Module } from '@nestjs/common'
import { CategoriasModule } from './categorias/categorias.module'
import { PrismaModule } from './database/prisma.module'

@Module({
	imports: [CategoriasModule, PrismaModule],
	controllers: [],
	providers: []
})
export class AppModule {}
