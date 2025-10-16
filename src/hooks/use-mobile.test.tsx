import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from './use-mobile'

// Mock window.matchMedia
const mockMatchMedia = vi.fn()

describe('useIsMobile hook', () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockMatchMedia.mockClear()
    
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return false for desktop width', () => {
    // Mock desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const mockMql = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMql)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })

  it('should return true for mobile width', () => {
    // Mock mobile width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    })

    const mockMql = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMql)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it('should add and remove event listeners', () => {
    const mockMql = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMql)

    const { unmount } = renderHook(() => useIsMobile())

    expect(mockMql.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))

    unmount()

    expect(mockMql.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should respond to window resize events', () => {
    let changeHandler: () => void

    const mockMql = {
      matches: false,
      addEventListener: vi.fn((event, handler) => {
        if (event === 'change') {
          changeHandler = handler
        }
      }),
      removeEventListener: vi.fn(),
    }
    mockMatchMedia.mockReturnValue(mockMql)

    // Start with desktop width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)

    // Simulate window resize to mobile width
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 600,
      })
      changeHandler()
    })

    expect(result.current).toBe(true)
  })

  it('should use correct breakpoint (768px)', () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    renderHook(() => useIsMobile())

    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })
})