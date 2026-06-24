import { describe, it, expect } from 'vitest'
import {
  filterValidMembers,
  groupMembersByCategory,
  sortedCategories,
  getRoleLabel,
  calculateTeamStats,
  CATEGORY_ORDER,
  KNOWN_CATEGORIES
} from '../js/team-utils.js'

describe('filterValidMembers', () => {
  it('keeps rows with a non-empty name', () => {
    const data = [
      { name: 'Ana', category: 'leaders' },
      { name: '', category: 'phd' },
      { category: 'master' },
      { name: '   ', category: 'postdocs' }
    ]
    const result = filterValidMembers(data)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Ana')
  })

  it('returns empty array for empty input', () => {
    expect(filterValidMembers([])).toEqual([])
  })
})

describe('groupMembersByCategory', () => {
  it('groups members by category', () => {
    const members = [
      { name: 'A', category: 'leaders' },
      { name: 'B', category: 'phd' },
      { name: 'C', category: 'leaders' }
    ]
    const grouped = groupMembersByCategory(members)
    expect(grouped['leaders']).toHaveLength(2)
    expect(grouped['phd']).toHaveLength(1)
  })

  it('defaults to "collaborators" for missing category', () => {
    const grouped = groupMembersByCategory([{ name: 'X' }])
    expect(grouped['collaborators']).toHaveLength(1)
  })

  it('returns empty object for empty input', () => {
    expect(groupMembersByCategory([])).toEqual({})
  })
})

describe('sortedCategories', () => {
  it('returns only categories present in groupedMembers, in canonical order', () => {
    const grouped = { phd: [], leaders: [], master: [], postdocs: [] }
    expect(sortedCategories(grouped)).toEqual(['leaders', 'postdocs', 'phd', 'master'])
  })

  it('excludes categories with no entries', () => {
    expect(sortedCategories({ leaders: [] })).toEqual(['leaders'])
  })

  it('ignores unknown categories not in CATEGORY_ORDER', () => {
    const grouped = { unknown_cat: [], leaders: [] }
    expect(sortedCategories(grouped)).toEqual(['leaders'])
  })

  it('returns empty array when grouped is empty', () => {
    expect(sortedCategories({})).toEqual([])
  })
})

describe('getRoleLabel', () => {
  it.each([
    ['leaders', 'Líder de Pesquisa'],
    ['postdocs', 'Pós-Doutorando'],
    ['phd', 'Doutorando'],
    ['master', 'Mestrando'],
    ['undergrad', 'Graduando'],
    ['collaborators', 'Colaborador'],
    ['former', 'Ex-Membro']
  ])('maps "%s" to "%s"', (category, expected) => {
    expect(getRoleLabel(category)).toBe(expected)
  })

  it('returns "Pesquisador" for unknown category', () => {
    expect(getRoleLabel('unknown')).toBe('Pesquisador')
  })

  it('returns "Pesquisador" for empty string', () => {
    expect(getRoleLabel('')).toBe('Pesquisador')
  })

  it('returns "Pesquisador" for null/undefined', () => {
    expect(getRoleLabel(null)).toBe('Pesquisador')
    expect(getRoleLabel(undefined)).toBe('Pesquisador')
  })
})

describe('calculateTeamStats', () => {
  const members = [
    { name: 'A', category: 'leaders' },
    { name: 'B', category: 'postdocs' },
    { name: 'C', category: 'phd' },
    { name: 'D', category: 'master' },
    { name: 'E', category: 'undergrad' },
    { name: 'F', category: 'collaborators' }
  ]

  it('counts total members', () => {
    expect(calculateTeamStats(members).total).toBe(6)
  })

  it('counts leaders', () => {
    expect(calculateTeamStats(members).leaders).toBe(1)
  })

  it('counts postdocs', () => {
    expect(calculateTeamStats(members).postdocs).toBe(1)
  })

  it('counts phd + master + undergrad as students', () => {
    expect(calculateTeamStats(members).students).toBe(3)
  })

  it('returns zeros for empty array', () => {
    const stats = calculateTeamStats([])
    expect(stats).toEqual({ total: 0, leaders: 0, postdocs: 0, students: 0 })
  })
})

describe('KNOWN_CATEGORIES', () => {
  it('contains all seven expected category keys', () => {
    const expected = ['leaders', 'postdocs', 'phd', 'master', 'undergrad', 'collaborators', 'former']
    expected.forEach(cat => expect(KNOWN_CATEGORIES.has(cat)).toBe(true))
  })
})
