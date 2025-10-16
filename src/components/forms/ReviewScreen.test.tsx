import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ReviewScreen } from './ReviewScreen'
import { FormData } from '@/types/form'

const mockFormData: FormData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  medicalConditions: ['Hypertension', 'Diabetes'],
  medications: 'Metformin 500mg daily',
  allergies: 'Penicillin, Shellfish'
}

describe('ReviewScreen', () => {
  const mockOnEdit = vi.fn()
  const mockOnFinalSubmit = vi.fn()
  const mockOnBack = vi.fn()

  beforeEach(() => {
    mockOnEdit.mockClear()
    mockOnFinalSubmit.mockClear()
    mockOnBack.mockClear()
  })

  it('should render all form data correctly', () => {
    render(
      <ReviewScreen
        formData={mockFormData}
        onEdit={mockOnEdit}
        onFinalSubmit={mockOnFinalSubmit}
        onBack={mockOnBack}
      />
    )

    expect(screen.getByText('Review Your Information')).toBeInTheDocument()
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Doe')).toBeInTheDocument()
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    expect(screen.getByText('123-456-7890')).toBeInTheDocument()
    expect(screen.getByText('Hypertension')).toBeInTheDocument()
    expect(screen.getByText('Diabetes')).toBeInTheDocument()
    expect(screen.getByText('Metformin 500mg daily')).toBeInTheDocument()
    expect(screen.getByText('Penicillin, Shellfish')).toBeInTheDocument()
  })

  it('should call onBack when back button is clicked', () => {
    render(
      <ReviewScreen
        formData={mockFormData}
        onEdit={mockOnEdit}
        onFinalSubmit={mockOnFinalSubmit}
        onBack={mockOnBack}
      />
    )

    const backButton = screen.getByText('Back to Form')
    fireEvent.click(backButton)

    expect(mockOnBack).toHaveBeenCalledTimes(1)
  })

  it('should call onEdit when edit button is clicked', () => {
    render(
      <ReviewScreen
        formData={mockFormData}
        onEdit={mockOnEdit}
        onFinalSubmit={mockOnFinalSubmit}
        onBack={mockOnBack}
      />
    )

    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[0])

    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })

  it('should call onFinalSubmit when confirm button is clicked', () => {
    render(
      <ReviewScreen
        formData={mockFormData}
        onEdit={mockOnEdit}
        onFinalSubmit={mockOnFinalSubmit}
        onBack={mockOnBack}
      />
    )

    const confirmButton = screen.getByText('Confirm & Submit')
    fireEvent.click(confirmButton)

    expect(mockOnFinalSubmit).toHaveBeenCalledTimes(1)
  })

  it('should handle empty form data gracefully', () => {
    const emptyFormData: FormData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      medicalConditions: [],
      medications: '',
      allergies: ''
    }

    render(
      <ReviewScreen
        formData={emptyFormData}
        onEdit={mockOnEdit}
        onFinalSubmit={mockOnFinalSubmit}
        onBack={mockOnBack}
      />
    )

    expect(screen.getAllByText('Not provided')).toHaveLength(5)
    expect(screen.getByText('No conditions selected')).toBeInTheDocument()
  })
});