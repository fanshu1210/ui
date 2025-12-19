import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: var(--spacing-md) 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-fast);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  &.scrolled {
    box-shadow: var(--shadow-md);
  }
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  
  @media (max-width: 768px) {
    padding: var(--spacing-sm);
  }
`

const Logo = styled.div`
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  transition: transform var(--transition-fast);
  
  &:hover {
    transform: scale(1.05);
  }
  
  span:first-child {
    font-weight: 900;
    background: linear-gradient(45deg, var(--accent-color), var(--primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

const NavLinks = styled.nav`
  display: flex;
  gap: var(--spacing-lg);
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const NavLink = styled.a`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast), transform var(--transition-fast);
  position: relative;
  padding: var(--spacing-sm) 0;
  
  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--accent-color);
    transition: width var(--transition-fast);
  }
  
  &:hover {
    color: var(--accent-color);
    transform: translateY(-2px);
    
    &::after {
      width: 100%;
    }
  }
`

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: var(--font-size-xl);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm);
  border-radius: 50%;
  transition: background-color var(--transition-fast), transform var(--transition-slow), color var(--transition-fast);
  background-color: var(--bg-secondary);
  box-shadow: var(--shadow-sm);
  
  &:hover {
    background-color: var(--accent-color);
    color: white;
    transform: rotate(180deg);
  }
`

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: var(--font-size-xl);
  cursor: pointer;
  display: none;
  padding: var(--spacing-sm);
  border-radius: 50%;
  background-color: var(--bg-secondary);
  transition: color var(--transition-fast), transform var(--transition-fast);
  
  &:hover {
    color: var(--accent-color);
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: var(--bg-primary);
  z-index: 200;
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-xl);
  transform: translateX(100%);
  transition: transform var(--transition-normal);
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  
  ${({ $isOpen }) => $isOpen && `
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  `}
  
  @media (min-width: 769px) {
    display: none;
  }
`

const MobileNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
  padding: 0;
  flex: 1;
`

const MobileNavLink = styled.a`
  color: var(--text-primary);
  text-decoration: none;
  font-size: var(--font-size-lg);
  font-weight: 500;
  transition: color var(--transition-fast), transform var(--transition-fast);
  padding: var(--spacing-md) 0;
  border-radius: var(--border-radius-md);
  
  &:hover {
    color: var(--accent-color);
    transform: translateX(5px);
    background-color: var(--bg-secondary);
    padding-left: var(--spacing-md);
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: var(--spacing-xl);
  right: var(--spacing-xl);
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: var(--font-size-xl);
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: 50%;
  background-color: var(--bg-secondary);
  transition: color var(--transition-fast), transform var(--transition-fast);
  
  &:hover {
    color: var(--accent-color);
    transform: rotate(90deg);
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index: 99;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-normal), visibility var(--transition-normal);
  pointer-events: none;
  
  ${({ $isOpen }) => $isOpen && `
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  `}
  
  @media (min-width: 769px) {
    display: none;
  }
`

const Header = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // ?§Ý???????
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden'
  }
  
  // ????????????????
  const handleMobileNavClick = () => {
    setMobileMenuOpen(false)
    document.body.style.overflow = 'auto'
  }
  
  // ????????§¹??
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header')
      if (window.scrollY > 10) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <span>?</span>
          <span>ModernWeb</span>
        </Logo>
        
        <NavLinks>
          <NavLink href="#home">???</NavLink>
          <NavLink href="#features">????</NavLink>
          <NavLink href="#gallery">?????</NavLink>
          <NavLink href="#about">????????</NavLink>
          <NavLink href="#contact">???????</NavLink>
        </NavLinks>
        
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
          <ThemeToggle onClick={toggleTheme} aria-label={theme === 'dark' ? '?§Ý????????' : '?§Ý????????'}>
             {theme === 'dark' ? '?' : '?'}
            </ThemeToggle>
          <MobileMenuButton aria-label="???" onClick={toggleMobileMenu}>
            ?
          </MobileMenuButton>
        </div>
      </HeaderContent>
      
      <Overlay $isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />
      
      <MobileMenu $isOpen={mobileMenuOpen}>
        <CloseButton onClick={toggleMobileMenu} aria-label="?????">
          ?
        </CloseButton>
        
        <MobileNavLinks>
          <MobileNavLink href="#home" onClick={handleMobileNavClick}>???</MobileNavLink>
          <MobileNavLink href="#features" onClick={handleMobileNavClick}>????</MobileNavLink>
          <MobileNavLink href="#gallery" onClick={handleMobileNavClick}>?????</MobileNavLink>
          <MobileNavLink href="#about" onClick={handleMobileNavClick}>????????</MobileNavLink>
          <MobileNavLink href="#contact" onClick={handleMobileNavClick}>???????</MobileNavLink>
        </MobileNavLinks>
        
        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <ThemeToggle onClick={toggleTheme} aria-label={theme === 'dark' ? '?§Ý????????' : '?§Ý????????'} style={{ width: '100%' }}>
             {theme === 'dark' ? '? ?§Ý????????' : '? ?§Ý????????'}
            </ThemeToggle>
        </div>
      </MobileMenu>
    </HeaderContainer>
  )
}

export default Header
