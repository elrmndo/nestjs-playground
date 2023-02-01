import { Photo } from "src/photos/photo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column({ default: true })
	isActive: boolean;

	@OneToMany(type => Photo, photo => photo.user)
	photo: Photo[];
}