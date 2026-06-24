import { describe, it, expect } from 'vitest'
import { truncateText, getInitials } from '../js/utils.js'

describe('truncateText', () => {
  it('returns "" for null', () => {
    expect(truncateText(null, 10)).toBe('')
  })

  it('returns "" for undefined', () => {
    expect(truncateText(undefined, 10)).toBe('')
  })

  it('returns "" for non-string values', () => {
    expect(truncateText(42, 10)).toBe('')
    expect(truncateText([], 10)).toBe('')
    expect(truncateText({}, 10)).toBe('')
    expect(truncateText(true, 10)).toBe('')
  })

  it('returns "" for empty string', () => {
    expect(truncateText('', 10)).toBe('')
  })

  it('returns text unchanged when length < maxLength', () => {
    expect(truncateText('hello', 10)).toBe('hello')
  })

  it('returns text unchanged when length equals maxLength', () => {
    expect(truncateText('hello', 5)).toBe('hello')
  })

  it('truncates text that exceeds maxLength and appends ellipsis', () => {
    expect(truncateText('hello world', 5)).toBe('hello...')
  })

  it('trims trailing whitespace before appending ellipsis', () => {
    // 'ab  cd' cut at 3 gives 'ab ' → trimmed to 'ab' → 'ab...'
    expect(truncateText('ab  cd', 3)).toBe('ab...')
  })

  it('works for maxLength of 1', () => {
    const result = truncateText('abc', 1)
    expect(result).toBe('a...')
  })
})

describe('getInitials', () => {
  it('returns first two uppercase initials from a full name', () => {
    expect(getInitials('João Silva')).toBe('JS')
  })

  it('returns a single initial for a single-word name', () => {
    expect(getInitials('Maria')).toBe('M')
  })

  it('caps at 2 characters for names with many words', () => {
    expect(getInitials('Ana Beatriz Costa Souza')).toBe('AB')
  })

  it('returns "" for null', () => {
    expect(getInitials(null)).toBe('')
  })

  it('returns "" for undefined', () => {
    expect(getInitials(undefined)).toBe('')
  })

  it('returns "" for empty string', () => {
    expect(getInitials('')).toBe('')
  })

  it('returns "" for whitespace-only string', () => {
    expect(getInitials('   ')).toBe('')
  })

  it('uppercases the result', () => {
    expect(getInitials('ana silva')).toBe('AS')
  })

  it('handles names with multiple consecutive spaces', () => {
    expect(getInitials('Ana  Silva')).toBe('AS')
  })
})
