import { useState, useCallback } from 'react'
import { callClaude, API_ERRORS } from '../utils/anthropic'
import { buildRepurposePrompt } from '../utils/prompts'

const LOADING_STEPS = [
  'Reading your content...',
  'Identifying key insights...',
  'Crafting platform hooks...',
  'Writing LinkedIn post...',
  'Building Twitter thread...',
  'Scripting TikTok...',
  'Polishing outputs...',
]

export function useRepurpose() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [loadingStep, setLoadingStep] = useState(0)
  const [stepInterval, setStepInterval] = useState(null)

  const startLoadingSteps = useCallback(() => {
    let i = 0
    const interval = setInterval(() => {
      i = (i + 1) % LOADING_STEPS.length
      setLoadingStep(i)
    }, 1600)
    setStepInterval(interval)
    return interval
  }, [])

  const stopLoadingSteps = useCallback((interval) => {
    if (interval) clearInterval(interval)
    setStepInterval(null)
    setLoadingStep(0)
  }, [])

  const repurpose = useCallback(async (content, platforms) => {
    setStatus('loading')
    setError(null)
    setResults(null)

    const interval = startLoadingSteps()

    try {
      const prompt = buildRepurposePrompt(content, platforms)
      const output = await callClaude(prompt)

      stopLoadingSteps(interval)
      setResults(output)
      setStatus('success')
      return output
    } catch (err) {
      stopLoadingSteps(interval)
      const message = API_ERRORS[err.message] || err.message || 'Something went wrong. Please try again.'
      setError(message)
      setStatus('error')
      return null
    }
  }, [startLoadingSteps, stopLoadingSteps])

  const reset = useCallback(() => {
    setStatus('idle')
    setResults(null)
    setError(null)
    setLoadingStep(0)
    if (stepInterval) clearInterval(stepInterval)
  }, [stepInterval])

  return {
    status,
    results,
    error,
    loadingMessage: LOADING_STEPS[loadingStep],
    repurpose,
    reset,
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
  }
}
