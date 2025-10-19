import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Settings from './Settings'

// Mock the toast hook
const mockToast = vi.fn()
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast
  })
}))

// Wrapper component for router context
const SettingsWrapper = () => (
  <BrowserRouter>
    <Settings />
  </BrowserRouter>
)

describe('Settings', () => {
  beforeEach(() => {
    mockToast.mockClear()
  })

  it('should render the settings page with correct title and description', () => {
    render(<SettingsWrapper />)
    
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Manage your account settings and personal information.')).toBeInTheDocument()
  })

  it('should render the personal information card', () => {
    render(<SettingsWrapper />)
    
    expect(screen.getByText('Personal Information')).toBeInTheDocument()
    expect(screen.getByText('Update your personal details and contact information.')).toBeInTheDocument()
  })

  it('should render all form fields with correct labels', () => {
    render(<SettingsWrapper />)
    
    expect(screen.getByLabelText('First Name *')).toBeInTheDocument()
    expect(screen.getByLabelText('Last Name *')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address *')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone Number *')).toBeInTheDocument()
  })

  it('should render all form fields with correct placeholders', () => {
    render(<SettingsWrapper />)
    
    expect(screen.getByPlaceholderText('Enter your first name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your last name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your phone number')).toBeInTheDocument()
  })

  it('should render the save button', () => {
    render(<SettingsWrapper />)
    
    expect(screen.getByRole('button', { name: /save settings/i })).toBeInTheDocument()
  })

  it('should render the back to home link', () => {
    render(<SettingsWrapper />)
    
    const backLink = screen.getByRole('link', { name: /back to home/i })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/')
  })

  it('should update form fields when user types', () => {
    render(<SettingsWrapper />)
    
    const firstNameInput = screen.getByLabelText('First Name *')
    const lastNameInput = screen.getByLabelText('Last Name *')
    const emailInput = screen.getByLabelText('Email Address *')
    const phoneInput = screen.getByLabelText('Phone Number *')

    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '123-456-7890' } })

    expect(firstNameInput).toHaveValue('John')
    expect(lastNameInput).toHaveValue('Doe')
    expect(emailInput).toHaveValue('john.doe@example.com')
    expect(phoneInput).toHaveValue('123-456-7890')
  })

  it('should show validation error when required fields are empty', async () => {
    render(<SettingsWrapper />)
    
    const saveButton = screen.getByRole('button', { name: /save settings/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
    })
  })

  it('should show validation error for invalid email', async () => {
    render(<SettingsWrapper />)
    
    const firstNameInput = screen.getByLabelText('First Name *')
    const lastNameInput = screen.getByLabelText('Last Name *')
    const emailInput = screen.getByLabelText('Email Address *')
    const phoneInput = screen.getByLabelText('Phone Number *')

    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.change(phoneInput, { target: { value: '123-456-7890' } })

    const saveButton = screen.getByRole('button', { name: /save settings/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      })
    })
  })

  it('should show validation error for invalid phone number', async () => {
    render(<SettingsWrapper />)
    
    const firstNameInput = screen.getByLabelText('First Name *')
    const lastNameInput = screen.getByLabelText('Last Name *')
    const emailInput = screen.getByLabelText('Email Address *')
    const phoneInput = screen.getByLabelText('Phone Number *')

    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.change(phoneInput, { target: { value: 'invalid-phone' } })

    const saveButton = screen.getByRole('button', { name: /save settings/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid phone number',
        variant: 'destructive',
      })
    })
  })

  it('should show success message when form is submitted with valid data', async () => {
    render(<SettingsWrapper />)
    
    const firstNameInput = screen.getByLabelText('First Name *')
    const lastNameInput = screen.getByLabelText('Last Name *')
    const emailInput = screen.getByLabelText('Email Address *')
    const phoneInput = screen.getByLabelText('Phone Number *')

    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '1234567890' } })

    const saveButton = screen.getByRole('button', { name: /save settings/i })
    fireEvent.click(saveButton)

    // Button should show loading state
    expect(screen.getByRole('button', { name: /saving.../i })).toBeInTheDocument()

    // Wait for success message
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Settings Saved',
        description: 'Your settings have been updated successfully.',
      })
    }, { timeout: 2000 })
  })

  it('should disable save button while loading', async () => {
    render(<SettingsWrapper />)
    
    const firstNameInput = screen.getByLabelText('First Name *')
    const lastNameInput = screen.getByLabelText('Last Name *')
    const emailInput = screen.getByLabelText('Email Address *')
    const phoneInput = screen.getByLabelText('Phone Number *')

    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '1234567890' } })

    const saveButton = screen.getByRole('button', { name: /save settings/i })
    fireEvent.click(saveButton)

    const loadingButton = screen.getByRole('button', { name: /saving.../i })
    expect(loadingButton).toBeDisabled()
  })

  it('should accept valid phone number formats', async () => {
    render(<SettingsWrapper />)
    
    const firstNameInput = screen.getByLabelText('First Name *')
    const lastNameInput = screen.getByLabelText('Last Name *')
    const emailInput = screen.getByLabelText('Email Address *')
    const phoneInput = screen.getByLabelText('Phone Number *')

    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '+1 (555) 123-4567' } })

    const saveButton = screen.getByRole('button', { name: /save settings/i })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Settings Saved',
        description: 'Your settings have been updated successfully.',
      })
    }, { timeout: 2000 })
  })

  it('should have correct input types', () => {
    render(<SettingsWrapper />)
    
    expect(screen.getByLabelText('First Name *')).toHaveAttribute('type', 'text')
    expect(screen.getByLabelText('Last Name *')).toHaveAttribute('type', 'text')
    expect(screen.getByLabelText('Email Address *')).toHaveAttribute('type', 'email')
    expect(screen.getByLabelText('Phone Number *')).toHaveAttribute('type', 'tel')
  })

  it('should have required attributes on all inputs', () => {
    render(<SettingsWrapper />)
    
    expect(screen.getByLabelText('First Name *')).toBeRequired()
    expect(screen.getByLabelText('Last Name *')).toBeRequired()
    expect(screen.getByLabelText('Email Address *')).toBeRequired()
    expect(screen.getByLabelText('Phone Number *')).toBeRequired()
  })
})