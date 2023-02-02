import { ObjectValues } from "./types";

export const LOG_LEVEL = {
	DEBUG: 'DEBUG',
	WARNING: 'WARNING',
	ERROR: 'ERROR'
} as const;

export type LogLevel = ObjectValues<typeof LOG_LEVEL>;

function log(level: LogLevel) {

}

log("DEBUG")