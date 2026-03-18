import { useState, useEffect } from 'react'

const FREE_LIMIT = 3
const STORAGE_KEY = 'rt_usage'

function getTodayKey() {
  return new Date().toISOString().split('T')[0] // YYYY-MM-DD
}

function getUsageData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { date: getTodayKey(), count: 0 }
    const data = JSON.parse(raw)
    // Reset if new day
    if (data.date !== getTodayKey()) {
      return { date: getTodayKey(), count: 0 }
    }
    return data
  } catch {
    return { date: getTodayKey(), count: 0 }
  }
}

export function useUsage() {
  const [usage, setUsage] = useState(getUsageData)

  const canUse = usage.count < FREE_LIMIT
  const remaining = Math.max(0, FREE_LIMIT - usage.count)
  const isAtLimit = usage.count >= FREE_LIMIT

  function increment() {
    const newData = { date: getTodayKey(), count: usage.count + 1 }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
    setUsage(newData)
    return newData.count
  }

  function reset() {
    const newData = { date: getTodayKey(), count: 0 }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
    setUsage(newData)
  }

  return {
    count: usage.count,
    remaining,
    canUse,
    isAtLimit,
    freeLimit: FREE_LIMIT,
    increment,
    reset,
  }
}
