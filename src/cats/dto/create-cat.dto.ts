import { IsNumber, IsString } from "class-validator";

export class CreateCatDto {
	@IsString()
	name: string;

	@IsString()
	age: number;

	@IsString()
	breed: string;
}