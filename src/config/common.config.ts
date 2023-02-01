import { normalizePort } from "../utils/normalizePort";

export default () => ({
	port: normalizePort(process.env.PORT) || 3000,
})