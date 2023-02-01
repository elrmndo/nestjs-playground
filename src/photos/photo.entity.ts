import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Photo {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	srcPath: string;

	@ManyToOne(type => User, user => user.photo)
	user: User;
}