import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/roles.decorator';
import { RoleGuard } from 'src/roles.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard, RoleGuard)
	@Get('profile')
	@Roles('admin')
	profile(@Request() req) {
		return { message: 'Welcome to your profile!', user: req.user }
	}
}
