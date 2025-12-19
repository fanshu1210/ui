import React, { createContext, useContext, useEffect } from 'react'

// ??????????????
const ThemeContext = createContext()

// ???????????
export const ThemeProvider = ({ children, darkMode }) => {
  useEffect(() => {
    // ??????????????HTML????
    if (darkMode) {
      document.documentElement.classList.add('dark-theme')
    } else {
      document.documentElement.classList.remove('dark-theme')
    }
  }, [darkMode])

  const theme = {
    darkMode,
    colors: {
      background: darkMode ? 'var(--bg-primary)' : 'var(--bg-primary)',
      secondaryBackground: darkMode ? 'var(--bg-secondary)' : 'var(--bg-secondary)',
      text: darkMode ? 'var(--text-primary)' : 'var(--text-primary)',
      secondaryText: darkMode ? 'var(--text-secondary)' : 'var(--text-secondary)',
      accent: darkMode ? 'var(--accent-color)' : 'var(--accent-color)',
      border: darkMode ? 'var(--border-color)' : 'var(--border-color)',
    },
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

// ?????Hook????????????????????
const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeProvider

// ????useTheme????
export { useTheme }
