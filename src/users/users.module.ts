import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSubscriber } from './user.subscriber';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [TypeOrmModule.forFeature([User]), ConfigModule],
	providers: [UsersService, UserSubscriber],
	controllers: [UsersController],
	exports: [UsersService]
})
export class UsersModule {}
