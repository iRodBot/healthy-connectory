import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ContactForm } from './ContactForm'
import { initialFormData } from '@/types/form'

describe('ContactForm', () => {
  const mockHandleInputChange = vi.fn()

  beforeEach(() => {
    mockHandleInputChange.mockClear()
  })

  it('should render all form fields', () => {
    render(
      <ContactForm 
        formData={initialFormData} 
        handleInputChange={mockHandleInputChange} 
      />
    )

    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument()
  })

  it('should display the correct heading', () => {
    render(
      <ContactForm 
        formData={initialFormData} 
        handleInputChange={mockHandleInputChange} 
      />
    )

    expect(screen.getByText('Contact Information')).toBeInTheDocument()
  })

  it('should display form data values', () => {
    const testFormData = {
      ...initialFormData,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890'
    }

    render(
      <ContactForm 
        formData={testFormData} 
        handleInputChange={mockHandleInputChange} 
      />
    )

    expect(screen.getByDisplayValue('John')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument()
  })

  it('should call handleInputChange when first name is changed', () => {
    render(
      <ContactForm 
        formData={initialFormData} 
        handleInputChange={mockHandleInputChange} 
      />
    )

    const firstNameInput = screen.getByPlaceholderText('First Name')
    fireEvent.change(firstNameInput, { target: { value: 'Jane', name: 'firstName' } })

    expect(mockHandleInputChange).toHaveBeenCalledTimes(1)
    // Verify that the event was called with the correct target name
    const callArgs = mockHandleInputChange.mock.calls[0][0]
    expect(callArgs.target.name).toBe('firstName')
  })

  it('should call handleInputChange when last name is changed', () => {
    render(
      <ContactForm 
        formData={initialFormData} 
        handleInputChange={mockHandleInputChange} 
      />
    )

    const lastNameInput = screen.getByPlaceholderText('Last Name')
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } })

    expect(mockHandleInputChange).toHaveBeenCalledTimes(1)
  })

  it('should call handleInputChange when email is changed', () => {
    render(
      <ContactForm 
        formData={initialFormData} 
        handleInputChange={mockHandleInputChange} 
      />
    )

    const emailInput = screen.getByPlaceholderText('Email Address')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    expect(mockHandleInputChange).toHaveBeenCalledTimes(1)
  })

  it('should call handleInputChange when phone is changed', () => {
    render(
      <ContactForm 
        formData={initialFormData} 
        handleInputChange={mockHandleInputChange} 
      />
    )

    const phoneInput = screen.getByPlaceholderText('Phone Number')
    fireEvent.change(phoneInput, { target: { value: '555-0123' } })

    expect(mockHandleInputChange).toHaveBeenCalledTimes(1)
  })

  it('should have correct input types', () => {
    render(
      <ContactForm 
        formData={initialFormData} 
        handleInputChange={mockHandleInputChange} 
      />
    )

    expect(screen.getByPlaceholderText('First Name')).toHaveAttribute('type', 'text')
    expect(screen.getByPlaceholderText('Last Name')).toHaveAttribute('type', 'text')
    expect(screen.getByPlaceholderText('Email Address')).toHaveAttribute('type', 'email')
    expect(screen.getByPlaceholderText('Phone Number')).toHaveAttribute('type', 'tel')
  })

  it('should have correct name attributes', () => {
    render(
      <ContactForm 
        formData={initialFormData} 
        handleInputChange={mockHandleInputChange} 
      />
    )

    expect(screen.getByPlaceholderText('First Name')).toHaveAttribute('name', 'firstName')
    expect(screen.getByPlaceholderText('Last Name')).toHaveAttribute('name', 'lastName')
    expect(screen.getByPlaceholderText('Email Address')).toHaveAttribute('name', 'email')
    expect(screen.getByPlaceholderText('Phone Number')).toHaveAttribute('name', 'phone')
  })
})