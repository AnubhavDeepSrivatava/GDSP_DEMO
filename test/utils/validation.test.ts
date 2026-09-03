import { expect } from 'chai'
import { isValidEmailFormat } from '../../src/utils/validation.ts'

describe('isValidEmailFormat', () => {
  it('accepts a normal email address', () => {
    expect(isValidEmailFormat('jane@example.com')).to.equal(true)
  })

  it('rejects an email missing the "@" symbol', () => {
    expect(isValidEmailFormat('janeexample.com')).to.equal(false)
  })

  it('rejects an email missing a dot after the "@"', () => {
    expect(isValidEmailFormat('jane@examplecom')).to.equal(false)
  })

  it('rejects an email that contains a space', () => {
    expect(isValidEmailFormat('jane doe@example.com')).to.equal(false)
  })

  it('rejects an empty string', () => {
    expect(isValidEmailFormat('')).to.equal(false)
  })

  it('ignores leading and trailing whitespace', () => {
    expect(isValidEmailFormat('  jane@example.com  ')).to.equal(true)
  })
})
