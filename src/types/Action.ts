import { ObjectValues } from "./types"

export const USER_ACTION = {
	Manage: 'manage',
	Create: 'create',
	Read: 'read',
	Update : 'update',
	Delete: 'delete',
} as const

export type UserAction = ObjectValues<typeof USER_ACTION>;

function action(action: UserAction) {

}

action(USER_ACTION.Create)
