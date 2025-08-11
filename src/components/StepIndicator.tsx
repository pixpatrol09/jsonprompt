import { Check } from 'lucide-react'
import { usePromptStore } from '../stores/promptStore'

const steps = [
  { id: 0, name: 'Basic Info', emoji: '📝' },
  { id: 1, name: 'Instructions', emoji: '⚙️' },
  { id: 2, name: 'Model Lock', emoji: '🔒' },
  { id: 3, name: 'Details', emoji: '✨' },
  { id: 4, name: 'Export', emoji: '📤' },
]

export function StepIndicator() {
  const { currentStep } = usePromptStore()

  return (
    <div className="steps">
      <div className="container">
        <ul className="steps-list">
          {steps.map((step) => (
            <li key={step.id} className="step">
              <div
                className={`step-number ${
                  currentStep > step.id
                    ? 'completed'
                    : currentStep === step.id
                    ? 'active'
                    : 'inactive'
                }`}
              >
                {currentStep > step.id ? (
                  <Check size={16} />
                ) : (
                  step.emoji
                )}
              </div>
              <span
                className={`step-label ${
                  currentStep >= step.id ? 'active' : 'inactive'
                }`}
              >
                {step.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
