import { expect } from 'chai'
import { generateId } from '../../src/utils/id.ts'

describe('generateId', () => {
  it('returns a string', () => {
    const id = generateId()

    expect(id).to.be.a('string')
  })

  it('returns a non-empty value', () => {
    const id = generateId()

    expect(id.length).to.be.greaterThan(0)
  })

  it('returns a different value on each call', () => {
    const firstId = generateId()
    const secondId = generateId()

    expect(firstId).to.not.equal(secondId)
  })
})
