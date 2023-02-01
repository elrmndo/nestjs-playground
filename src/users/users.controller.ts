import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
	constructor(private configService: ConfigService) {}

	@Get()
	find() {
		console.log(this.configService.get('database.host'));

		return {
			username: 'THIS_IS_A_USERNAME',
			password: 'THIS_IS_A_PASSWORD'
		}
	}
}
