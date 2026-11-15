import { expect, test } from 'bun:test'

import { greet } from '../src/index'

test('greet returns a greeting', () => {
  expect(greet('world')).toBe('Hello, world')
})
