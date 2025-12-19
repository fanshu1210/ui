import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  padding: var(--spacing-xl) 0;
  border-top: 1px solid var(--border-color);
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
`

const FooterColumn = styled.div`
  & h3 {
    color: var(--text-primary);
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-lg);
  }
  
  & ul {
    list-style: none;
    padding: 0;
  }
  
  & li {
    margin-bottom: var(--spacing-sm);
  }
  
  & a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--accent-color);
    }
  }
`

const SocialIcons = styled.div`
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
`

const SocialIcon = styled.a`
  color: var(--text-secondary);
  font-size: var(--font-size-xl);
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--accent-color);
  }
`

const BottomFooter = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-md);
  border-top: 1px solid var(--border-color);
  text-align: center;
  font-size: var(--font-size-sm);
`

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <h3>????????</h3>
          <p>????????????????????????Web????????????????????????????¨®????</p>
        </FooterColumn>
        
        <FooterColumn>
          <h3>????????</h3>
          <ul>
            <li><a href="#home">???</a></li>
            <li><a href="#features">????</a></li>
            <li><a href="#gallery">?????</a></li>
            <li><a href="#about">????????</a></li>
            <li><a href="#contact">???????</a></li>
          </ul>
        </FooterColumn>
        
        <FooterColumn>
          <h3>???????</h3>
          <ul>
            <li>????: contact@modernweb.com</li>
            <li>?´Â: +86 123 4567 8910</li>
            <li>???: ?????§Ô???????????</li>
          </ul>
          <SocialIcons>
            <SocialIcon href="#" aria-label="???">
              <span role="img" aria-label="???">?</span>
            </SocialIcon>
            <SocialIcon href="#" aria-label="???">
              <span role="img" aria-label="???">?</span>
            </SocialIcon>
            <SocialIcon href="#" aria-label="GitHub">
              <span role="img" aria-label="GitHub">?</span>
            </SocialIcon>
            <SocialIcon href="#" aria-label="LinkedIn">
              <span role="img" aria-label="LinkedIn">?</span>
            </SocialIcon>
          </SocialIcons>
        </FooterColumn>
      </FooterContent>
      
      <BottomFooter>
        <p>&copy; {new Date().getFullYear()} ModernWeb. ?????????????</p>
      </BottomFooter>
    </FooterContainer>
  )
}

export default Footer
