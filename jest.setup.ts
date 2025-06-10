// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { ImageProps } from 'next/image'
import React from 'react'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({ src, alt, ...props }: any) {
    return {
      src,
      alt,
      ...props
    }
  }
}))

// Extend expect matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null && received !== undefined
    return {
      pass,
      message: () => `expected ${received} to be in the document`,
    }
  },
  toHaveAttribute(received, attr, value) {
    const element = received as HTMLElement
    const hasAttr = element.hasAttribute(attr)
    const attrValue = element.getAttribute(attr)
    const pass = value ? hasAttr && attrValue === value : hasAttr
    return {
      pass,
      message: () => `expected ${received} to have attribute ${attr}${value ? ` with value ${value}` : ''}`,
    }
  },
  toBeInvalid(received) {
    const element = received as HTMLElement
    const pass = element.hasAttribute('aria-invalid') || element.hasAttribute('data-invalid')
    return {
      pass,
      message: () => `expected ${received} to be invalid`,
    }
  },
}) 