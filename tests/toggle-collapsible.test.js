import { describe, it, expect, beforeEach } from 'vitest'

function toggleCollapsible(button) {
  const content = button.nextElementSibling
  const isActive = button.classList.contains('active')

  document.querySelectorAll('.collapsible').forEach(col => {
    col.classList.remove('active')
    col.nextElementSibling.classList.remove('active')
  })

  if (!isActive) {
    button.classList.add('active')
    content.classList.add('active')
  }
}

describe('toggleCollapsible', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <button class="collapsible">Section 1</button>
        <div class="collapsible-content">Content 1</div>
        <button class="collapsible">Section 2</button>
        <div class="collapsible-content">Content 2</div>
        <button class="collapsible">Section 3</button>
        <div class="collapsible-content">Content 3</div>
      </div>
    `
  })

  it('opens a closed collapsible', () => {
    const [btn] = document.querySelectorAll('.collapsible')
    toggleCollapsible(btn)
    expect(btn.classList.contains('active')).toBe(true)
    expect(btn.nextElementSibling.classList.contains('active')).toBe(true)
  })

  it('closes an already open collapsible on second click', () => {
    const [btn] = document.querySelectorAll('.collapsible')
    toggleCollapsible(btn)
    toggleCollapsible(btn)
    expect(btn.classList.contains('active')).toBe(false)
    expect(btn.nextElementSibling.classList.contains('active')).toBe(false)
  })

  it('closes other open sections when opening a new one', () => {
    const [btn1, btn2] = document.querySelectorAll('.collapsible')
    toggleCollapsible(btn1)
    toggleCollapsible(btn2)
    expect(btn1.classList.contains('active')).toBe(false)
    expect(btn1.nextElementSibling.classList.contains('active')).toBe(false)
    expect(btn2.classList.contains('active')).toBe(true)
    expect(btn2.nextElementSibling.classList.contains('active')).toBe(true)
  })

  it('only one section is active at any given time', () => {
    const buttons = document.querySelectorAll('.collapsible')
    toggleCollapsible(buttons[0])
    toggleCollapsible(buttons[2])

    const active = [...document.querySelectorAll('.collapsible')].filter(b =>
      b.classList.contains('active')
    )
    expect(active).toHaveLength(1)
  })

  it('leaves all sections closed when the open one is clicked again', () => {
    const [btn] = document.querySelectorAll('.collapsible')
    toggleCollapsible(btn)
    toggleCollapsible(btn)

    const active = [...document.querySelectorAll('.collapsible')].filter(b =>
      b.classList.contains('active')
    )
    expect(active).toHaveLength(0)
  })
})
