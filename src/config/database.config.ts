import { registerAs } from "@nestjs/config";

export default registerAs('database', () => ({
	type: process.env.DATABASE_TYPE,
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	name: process.env.DATABASE_NAME,
	autoLoadEntities: process.env.DATABASE_AUTOLOAD_ENTITIES,
	synchronize: process.env.DATABASE_SYNCHRONIZE,
}))