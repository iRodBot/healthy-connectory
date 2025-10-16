import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Index from './Index'

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}))

describe('Index Page - Review Flow', () => {
  it('should show review screen after form submission', async () => {
    render(<Index />)

    // Fill out the required form fields
    const firstNameInput = screen.getByPlaceholderText('First Name')
    const lastNameInput = screen.getByPlaceholderText('Last Name')
    const emailInput = screen.getByPlaceholderText('Email Address')
    const phoneInput = screen.getByPlaceholderText('Phone Number')

    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '123-456-7890' } })

    // Submit the form
    const submitButton = screen.getByText('Review & Submit')
    fireEvent.click(submitButton)

    // Should now show the review screen
    await waitFor(() => {
      expect(screen.getByText('Review Your Information')).toBeInTheDocument()
    })

    // Should show the submitted data
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Doe')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByText('123-456-7890')).toBeInTheDocument()
  })

  it('should allow going back to form from review screen', async () => {
    render(<Index />)

    // Fill out and submit form
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } })
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'john.doe@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '123-456-7890' } })
    
    fireEvent.click(screen.getByText('Review & Submit'))

    // Wait for review screen
    await waitFor(() => {
      expect(screen.getByText('Review Your Information')).toBeInTheDocument()
    })

    // Click back button
    const backButton = screen.getByText('Back to Form')
    fireEvent.click(backButton)

    // Should be back to the form
    await waitFor(() => {
      expect(screen.getByText('Your Health Journey Starts Here')).toBeInTheDocument()
    })
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
  })

  it('should allow editing from review screen', async () => {
    render(<Index />)

    // Fill out and submit form
    fireEvent.change(screen.getByPlaceholderText('First Name'), { target: { value: 'John' } })
    fireEvent.change(screen.getByPlaceholderText('Last Name'), { target: { value: 'Doe' } })
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'john.doe@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), { target: { value: '123-456-7890' } })
    
    fireEvent.click(screen.getByText('Review & Submit'))

    // Wait for review screen
    await waitFor(() => {
      expect(screen.getByText('Review Your Information')).toBeInTheDocument()
    })

    // Click edit button
    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[0])

    // Should be back to the form
    await waitFor(() => {
      expect(screen.getByText('Your Health Journey Starts Here')).toBeInTheDocument()
    })
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
  })
});