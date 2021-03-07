/*
 * This is an auto-generated file. Changes made to this file will be ignored
 * next time the file gets generated.
 */

import { Connection } from "typeorm"

import { getUserRepository } from "./User/User.repository"
import { UserRepository } from "./User/User.repository.types"

export type Repositories = {
	user: UserRepository
}

export const getRepositories = (connection: Connection): Repositories => ({
	user: getUserRepository(connection),
})
