import { expect, test } from 'vitest'
import { Slug } from './slug'

test('create a slug from a string', () => {
  const slug = Slug.createFromText('How to create a slug')
  expect(slug.value).toEqual('how-to-create-a-slug')
})
