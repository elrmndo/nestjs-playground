import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, SetMetadata, UseGuards, UseInterceptors, } from '@nestjs/common';
import { LoggingInterceptor } from 'src/logging.interceptor';
import { Roles } from 'src/roles.decorator';
import { RoleGuard } from 'src/roles.guard';
import { TransformInterceptor } from 'src/transform.interceptor';
import { ValidationPipe } from 'src/validation.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
	constructor(private catsService: CatsService) {}

	@Post()
	create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
		this.catsService.create(createCatDto);
	}

	@Get()
	async findAll(): Promise<Cat[]> {
		const isError = true;

		if (isError) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

		return this.catsService.findAll();
	}	

	@Get('/secret')
	@UseGuards(RoleGuard)
	@Roles('admin')
	secret() {
		return 'This is a secret cat route';
	}

	@Get('/intercepted')
	@UseInterceptors(LoggingInterceptor, TransformInterceptor)
	intercepted() {
		return 'This is a intercepted cat route';
	}

	@Get(':id')
	findOne(@Param('id') id: { id: number}): string {
		return `This action returns a cat w/ id: ${id}`
	}

	@Put(':id')
	update(@Param() { id}: { id: string}): string {
		return `This action updates a cat w/ id :${id}`;
	}


	@Delete(':id')
	remove(@Param() { id}: { id: string}): string {
		return `This action removes a cat w/ id :${id}`;
	}

}
