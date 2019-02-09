// tslint:disable:no-expression-statement
// tslint:disable:no-unsafe-any
import test from 'ava'
import { lsPackages } from 'libnpmaccess'
import { config } from 'dotenv'
import { ls } from './ls'

config()

const { TEST_NPM_USER, TEST_NPM_READ_TOKEN } = process.env

test('Get user owned packages', async t => {
	const expected = await lsPackages(TEST_NPM_USER, {
		token: TEST_NPM_READ_TOKEN
	})
	const pkgs = await ls(TEST_NPM_USER, TEST_NPM_READ_TOKEN)
	t.deepEqual(pkgs, expected)
})

test('Invalid user', async t => {
	const pkgs = await ls(`${TEST_NPM_USER}____________`, TEST_NPM_READ_TOKEN)
	t.regex(pkgs.message, /Scope not found/)
})

test('Invalid token', async t => {
	const token = '000000'
	const pkgs = await ls(TEST_NPM_USER, token)
	t.regex(pkgs.message, /You must be logged in to publish packages/)
})
