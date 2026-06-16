import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

function animateCounter(id, target) {
  const element = document.getElementById(id)
  if (!element) return
  let current = 0
  const increment = target / 30
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current)
  }, 50)
  return timer
}

describe('animateCounter', () => {
  beforeEach(() => {
    document.body.innerHTML = '<span id="counter">0</span>'
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('sets the element to the exact target value after all ticks', () => {
    animateCounter('counter', 100)
    vi.runAllTimers()
    expect(document.getElementById('counter').textContent).toBe('100')
  })

  it('displays 0 when target is 0', () => {
    animateCounter('counter', 0)
    vi.runAllTimers()
    expect(document.getElementById('counter').textContent).toBe('0')
  })

  it('does not throw when the element does not exist', () => {
    expect(() => animateCounter('nonexistent', 50)).not.toThrow()
  })

  it('displays only integer values during intermediate ticks', () => {
    animateCounter('counter', 10)
    vi.advanceTimersByTime(50)
    const value = document.getElementById('counter').textContent
    expect(String(Math.floor(Number(value)))).toBe(value)
  })

  it('starts from 0', () => {
    animateCounter('counter', 50)
    expect(document.getElementById('counter').textContent).toBe('0')
  })

  it('advances toward target on each tick', () => {
    animateCounter('counter', 60)
    vi.advanceTimersByTime(50)
    const after1 = Number(document.getElementById('counter').textContent)
    vi.advanceTimersByTime(50)
    const after2 = Number(document.getElementById('counter').textContent)
    expect(after2).toBeGreaterThanOrEqual(after1)
  })
})
