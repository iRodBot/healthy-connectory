import { describe, it, expect } from 'vitest'
import { initialFormData, commonIllnesses, type FormData } from './form'

describe('Form types and constants', () => {
  describe('initialFormData', () => {
    it('should have all required properties', () => {
      expect(initialFormData).toHaveProperty('firstName')
      expect(initialFormData).toHaveProperty('lastName')
      expect(initialFormData).toHaveProperty('email')
      expect(initialFormData).toHaveProperty('phone')
      expect(initialFormData).toHaveProperty('medicalConditions')
      expect(initialFormData).toHaveProperty('medications')
      expect(initialFormData).toHaveProperty('allergies')
    })

    it('should have correct initial values', () => {
      expect(initialFormData.firstName).toBe('')
      expect(initialFormData.lastName).toBe('')
      expect(initialFormData.email).toBe('')
      expect(initialFormData.phone).toBe('')
      expect(initialFormData.medicalConditions).toEqual([])
      expect(initialFormData.medications).toBe('')
      expect(initialFormData.allergies).toBe('')
    })

    it('should be a valid FormData type', () => {
      const formData: FormData = initialFormData
      expect(formData).toBeDefined()
    })
  })

  describe('commonIllnesses', () => {
    it('should be an array of strings', () => {
      expect(Array.isArray(commonIllnesses)).toBe(true)
      commonIllnesses.forEach(illness => {
        expect(typeof illness).toBe('string')
      })
    })

    it('should contain expected medical conditions', () => {
      const expectedConditions = [
        'Hypertension',
        'Diabetes',
        'Asthma',
        'Arthritis',
        'Depression',
        'Anxiety',
        'Heart Disease',
        'Chronic Pain',
        'Migraines',
        'Sleep Disorders'
      ]
      
      expectedConditions.forEach(condition => {
        expect(commonIllnesses).toContain(condition)
      })
    })

    it('should have at least 10 conditions', () => {
      expect(commonIllnesses.length).toBeGreaterThanOrEqual(10)
    })

    it('should not contain empty strings', () => {
      commonIllnesses.forEach(illness => {
        expect(illness.trim()).not.toBe('')
      })
    })
  })
})