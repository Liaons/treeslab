import { describe, it, expect } from 'vitest'
import {
  filterValidPublications,
  groupPublicationsByYear,
  sortYearsDescending,
  calculatePublicationStats
} from '../js/publications-utils.js'

describe('filterValidPublications', () => {
  it('keeps rows with a non-empty REF', () => {
    const data = [
      { REF: 'Paper A', ANO: '2023' },
      { REF: '', ANO: '2022' },
      { ANO: '2021' },
      { REF: '   ', ANO: '2020' }
    ]
    const result = filterValidPublications(data)
    expect(result).toHaveLength(1)
    expect(result[0].REF).toBe('Paper A')
  })

  it('returns empty array for empty input', () => {
    expect(filterValidPublications([])).toEqual([])
  })

  it('returns all rows when every row has a REF', () => {
    const data = [{ REF: 'A' }, { REF: 'B' }]
    expect(filterValidPublications(data)).toHaveLength(2)
  })
})

describe('groupPublicationsByYear', () => {
  it('groups publications by year', () => {
    const pubs = [
      { REF: 'A', ANO: '2023' },
      { REF: 'B', ANO: '2023' },
      { REF: 'C', ANO: '2022' }
    ]
    const grouped = groupPublicationsByYear(pubs)
    expect(grouped['2023']).toHaveLength(2)
    expect(grouped['2022']).toHaveLength(1)
  })

  it('uses "Sem ano" for rows with missing ANO', () => {
    const pubs = [{ REF: 'A' }, { REF: 'B', ANO: '' }]
    const grouped = groupPublicationsByYear(pubs)
    expect(grouped['Sem ano']).toHaveLength(2)
  })

  it('returns empty object for empty input', () => {
    expect(groupPublicationsByYear([])).toEqual({})
  })
})

describe('sortYearsDescending', () => {
  it('sorts years newest first', () => {
    expect(sortYearsDescending(['2020', '2023', '2021'])).toEqual(['2023', '2021', '2020'])
  })

  it('places "Sem ano" at the end', () => {
    const sorted = sortYearsDescending(['2023', 'Sem ano', '2022'])
    expect(sorted[sorted.length - 1]).toBe('Sem ano')
  })

  it('does not mutate the input array', () => {
    const input = ['2020', '2023']
    const copy = [...input]
    sortYearsDescending(input)
    expect(input).toEqual(copy)
  })

  it('handles a single element', () => {
    expect(sortYearsDescending(['2022'])).toEqual(['2022'])
  })
})

describe('calculatePublicationStats', () => {
  const publications = [
    { REF: 'Paper in Nature', ANO: '2023' },
    { REF: 'Another paper', ANO: '2024' },
    { REF: 'Old paper', ANO: '2010' },
    { REF: 'Paper in Science', ANO: '2015' },
    { REF: 'No year paper' }
  ]

  it('counts total publications', () => {
    expect(calculatePublicationStats(publications).total).toBe(5)
  })

  it('counts publications from 2023–2024', () => {
    expect(calculatePublicationStats(publications).recentPubs).toBe(2)
  })

  it('counts high-impact publications by keyword', () => {
    expect(calculatePublicationStats(publications).highImpact).toBe(2)
  })

  it('calculates years active as max − min + 1', () => {
    expect(calculatePublicationStats(publications).yearsActive).toBe(15)
  })

  it('returns 0 yearsActive when no valid year exists', () => {
    expect(calculatePublicationStats([{ REF: 'A', ANO: 'N/A' }]).yearsActive).toBe(0)
  })

  it('is case-insensitive for high-impact keyword matching', () => {
    const pubs = [{ REF: 'nature communications', ANO: '2022' }]
    expect(calculatePublicationStats(pubs).highImpact).toBe(1)
  })

  it('returns all zeros for an empty array', () => {
    const stats = calculatePublicationStats([])
    expect(stats.total).toBe(0)
    expect(stats.recentPubs).toBe(0)
    expect(stats.highImpact).toBe(0)
    expect(stats.yearsActive).toBe(0)
  })

  it('single publication: yearsActive is 1', () => {
    expect(calculatePublicationStats([{ REF: 'A', ANO: '2020' }]).yearsActive).toBe(1)
  })
})
