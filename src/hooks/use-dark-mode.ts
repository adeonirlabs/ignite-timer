import { useState } from 'react'

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.querySelector('html')?.classList.toggle('dark')
  }

  return { isDarkMode, toggleDarkMode }
}
