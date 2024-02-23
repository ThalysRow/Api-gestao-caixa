import {
	Controller,
	HttpStatus,
	Req,
	Res,
	UseGuards,
	Post
} from '@nestjs/common'
import { Request, Response } from 'express'
import { LocalAuthGuard } from './local-auth.guard'

@Controller()
export class AuthController {
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Req() req: Request, @Res() res: Response) {
		const { user } = req
		return res.status(HttpStatus.OK).json(user)
	}
}