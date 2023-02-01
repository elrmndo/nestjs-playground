import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		private dataSource: DataSource,
	) {}

	findByUsername(username: string): Promise<User | undefined> {
		return this.usersRepository.findOneBy({ username });
	}

	findAll(): Promise<User[]> {
		return this.usersRepository.find();
	}

	findOne(id: number): Promise<User> {
		return this.usersRepository.findOneBy({ id });
	}

	async createMany(users: User[]) {
		const queryRunner = this.dataSource.createQueryRunner();

		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			await queryRunner.manager.save([users[0]]);
			await queryRunner.manager.save([users[1]]);	


			await queryRunner.commitTransaction();
		} catch (error) {
			await queryRunner.rollbackTransaction();	
		} finally {
			await queryRunner.release();
		}
	}

	async remove(id: string): Promise<void> {
		await this.usersRepository.delete(id);
	}
}
