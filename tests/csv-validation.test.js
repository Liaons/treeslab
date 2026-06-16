// @vitest-environment node
import { describe, it, expect, beforeAll } from 'vitest'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import Papa from 'papaparse'
import { KNOWN_CATEGORIES } from '../js/team-utils.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const CURRENT_YEAR = new Date().getFullYear()

describe('peer_reviewed_scientific_articles.csv', () => {
  let publications

  beforeAll(() => {
    const csv = readFileSync(resolve(root, 'peer_reviewed_scientific_articles.csv'), 'utf8')
    const all = Papa.parse(csv, { header: true, skipEmptyLines: true }).data
    publications = all.filter(row => row.REF && row.REF.trim())
  })

  it('has at least one publication', () => {
    expect(publications.length).toBeGreaterThan(0)
  })

  it('every row has a non-empty REF field', () => {
    const missing = publications.filter(row => !row.REF || !row.REF.trim())
    expect(missing).toHaveLength(0)
  })

  it('all ANO values are valid 4-digit years within a reasonable range', () => {
    const invalid = publications.filter(row => {
      if (!row.ANO || !row.ANO.trim()) return false
      const year = parseInt(row.ANO)
      return isNaN(year) || year < 1900 || year > CURRENT_YEAR + 1
    })
    expect(invalid, `Invalid years: ${invalid.map(r => `${r.ANO}`).join(', ')}`).toHaveLength(0)
  })

  it('all LINK values are valid URLs if present', () => {
    const invalid = publications.filter(row => {
      if (!row.LINK || !row.LINK.trim()) return false
      try { new URL(row.LINK); return false }
      catch { return true }
    })
    expect(invalid, `Invalid URLs: ${invalid.map(r => r.LINK).join(', ')}`).toHaveLength(0)
  })
})

describe('trees_lab_people_clean.csv', () => {
  let members

  beforeAll(() => {
    const csv = readFileSync(resolve(root, 'trees_lab_people_clean.csv'), 'utf8')
    const all = Papa.parse(csv, { header: true, skipEmptyLines: true }).data
    members = all.filter(row => row.name && row.name.trim())
  })

  it('has at least one team member', () => {
    expect(members.length).toBeGreaterThan(0)
  })

  it('every row has a non-empty name', () => {
    const missing = members.filter(row => !row.name || !row.name.trim())
    expect(missing).toHaveLength(0)
  })

  it('all category values are from the known set', () => {
    const unknown = members.filter(row => row.category && !KNOWN_CATEGORIES.has(row.category))
    expect(
      unknown,
      `Unknown categories: ${unknown.map(r => `${r.name}→${r.category}`).join(', ')}`
    ).toHaveLength(0)
  })

  it('all social link URLs are valid if present', () => {
    const invalid = []
    members.forEach(member => {
      ['linkedin', 'researchgate', 'orcid'].forEach(field => {
        const url = member[field]
        if (!url || !url.trim()) return
        try { new URL(url) }
        catch { invalid.push({ name: member.name, field, url }) }
      })
    })
    expect(invalid, `Invalid URLs: ${JSON.stringify(invalid)}`).toHaveLength(0)
  })
})
