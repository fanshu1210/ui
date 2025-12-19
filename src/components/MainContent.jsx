import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

// ??????
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

// ???????
const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

// ???N??
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

// ????????????????????
const AnimationObserver = ({ children, className, delay = 0 }) => {
  const ref = useRef(null)
  const [isAnimated, setIsAnimated] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // ????????????????§Ή??
          const timeoutId = setTimeout(() => {
            setIsAnimated(true)
            observer.unobserve(entry.target)
          }, delay)
          
          return () => clearTimeout(timeoutId)
        }
      },
      { threshold: 0.1 }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])
  
  return (
    <div 
      ref={ref} 
      className={`${className} ${isAnimated ? 'animate' : ''}`}
      style={{
        opacity: isAnimated ? 1 : 0,
        transform: isAnimated ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out, transform 0.6s ease-out ${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

// Hero???????
const HeroSection = styled.section`
  padding: var(--spacing-2xl) 0;
  background-color: var(--bg-secondary);
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, var(--accent-color) 0%, transparent 70%);
    opacity: 0.05;
    z-index: 0;
    animation: ${pulse} 8s ease-in-out infinite;
  }
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  line-height: 1.2;
  position: relative;
  z-index: 1;
  
  span {
    background: linear-gradient(45deg, var(--accent-color), #6610f2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto var(--spacing-xl);
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-base);
  }
`

const CTAButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
  font-weight: 600;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  margin-right: var(--spacing-md);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left var(--transition-fast);
  }
  
  &:hover {
    background-color: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    &::before {
      left: 100%;
    }
  }
  
  @media (max-width: 768px) {
    font-size: var(--font-size-base);
    padding: var(--spacing-sm) var(--spacing-lg);
    margin-right: 0;
    margin-bottom: var(--spacing-sm);
  }
`

const SecondaryButton = styled.button`
  background-color: transparent;
  color: var(--accent-color);
  border: 2px solid var(--accent-color);
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--font-size-lg);
  font-weight: 600;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:hover {
    background-color: var(--accent-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    font-size: var(--font-size-base);
    padding: var(--spacing-sm) var(--spacing-lg);
  }
`

// ??????????
const FeaturesSection = styled.section`
  padding: var(--spacing-2xl) 0;
`

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: var(--spacing-xl);
  color: var(--text-primary);
  
  span {
    background: linear-gradient(45deg, var(--accent-color), #6610f2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
`

const FeatureCard = styled.div`
  background-color: var(--bg-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-light);
  transition: all var(--transition-normal);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, var(--accent-color), #6610f2);
  }
  
  &:hover {
    box-shadow: var(--shadow-medium);
    transform: translateY(-5px);
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.03);
      opacity: 0;
      animation: flash 0.3s ease;
    }
  }
  
  @keyframes flash {
    0% { opacity: 0.3; }
    100% { opacity: 0; }
  }
`

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--accent-color);
  transition: transform var(--transition-fast);
  
  ${FeatureCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`

const FeatureTitle = styled.h3`
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
`

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`

// ????????????
const GallerySection = styled.section`
  padding: var(--spacing-2xl) 0;
  background-color: var(--bg-secondary);
`

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
`

const GalleryItem = styled.div`
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-light);
  transition: transform var(--transition-normal);
  cursor: pointer;
  
  &:hover {
    transform: scale(1.03);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`

const GalleryImage = styled.div`
  height: 220px;
  background-color: var(--accent-color);
  background-image: linear-gradient(45deg, var(--accent-color) 0%, #6610f2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left var(--transition-slow);
  }
  
  ${GalleryItem}:hover &::before {
    left: 100%;
  }
`

const GalleryContent = styled.div`
  padding: var(--spacing-md);
  background-color: var(--bg-primary);
`

const GalleryTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
  transition: color var(--transition-fast);
  
  ${GalleryItem}:hover & {
    color: var(--accent-color);
  }
`

const GalleryDescription = styled.p`
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
`

const ViewProjectLink = styled.span`
  display: inline-flex;
  align-items: center;
  color: var(--accent-color);
  font-weight: 600;
  font-size: var(--font-size-sm);
  margin-top: var(--spacing-sm);
  cursor: pointer;
  transition: color var(--transition-fast);
  
  &:hover {
    color: #6610f2;
  }
  
  &::after {
    content: ' ??';
    margin-left: 4px;
    transition: transform var(--transition-fast);
  }
  
  &:hover::after {
    transform: translateX(3px);
  }
`

const MainContent = () => {
  // ????????????
  const features = [
    {
      icon: '?',
      title: '?????????',
      description: '???????????????????????????????????????????§³?'
    },
    {
      icon: '?',
      title: '????????',
      description: '????????????υτ?????????????????????????????????ξ•'
    },
    {
      icon: '?',
      title: '??????',
      description: '????????????????????????????????????????????ξ•'
    },
    {
      icon: '?',
      title: '?????',
      description: '????????????????????????????????????????'
    },
    {
      icon: '?',
      title: '???????',
      description: '????????????????????????????????????????'
    },
    {
      icon: '?',
      title: '????????',
      description: '???????????????????????????????????????ξ•'
    }
  ];
  
  // ?????????
  const projects = [
    {
      icon: '?',
      title: '??????????',
      description: '?????????????????ο…????????????',
      index: 1
    },
    {
      icon: '?',
      title: '????????????',
      description: '????????????????????????????????',
      index: 2
    },
    {
      icon: '?',
      title: '?????????',
      description: '?iOS??Android?????????????',
      index: 3
    },
    {
      icon: '?',
      title: '?????',
      description: '???????????ο…?????????',
      index: 4
    },
    {
      icon: '?',
      title: '??????????',
      description: '?????????????????¦Γ????',
      index: 5
    },
    {
      icon: '?',
      title: '?????????',
      description: '????????????????????????',
      index: 6
    }
  ];
  
  // ???????????
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // ??????????
  const handleProjectClick = (title) => {
    // ???????????????????????
    console.log(`?????: ${title}`);
    alert(`?????: ${title}`);
  };
  
  return (
    <main>
      {/* Hero Section */}
      <AnimationObserver>
        <HeroSection id="home">
          <div className="container">
            <HeroTitle>????<span>???</span>????? Web ????????</HeroTitle>
            <HeroSubtitle>
              ?????????? Web ????????????????????????????????????????¨®???
            </HeroSubtitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              <CTAButton onClick={() => scrollToSection('features')}>??????</CTAButton>
              <SecondaryButton onClick={() => scrollToSection('gallery')}>??????</SecondaryButton>
            </div>
          </div>
        </HeroSection>
      </AnimationObserver>

      {/* Features Section */}
      <FeaturesSection id="features">
        <div className="container">
          <AnimationObserver>
            <SectionTitle>????<span>????????</span></SectionTitle>
          </AnimationObserver>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <AnimationObserver key={index} delay={index * 100}>
                <FeatureCard onClick={() => alert(`????????: ${feature.title}`)}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>
                    {feature.description}
                  </FeatureDescription>
                </FeatureCard>
              </AnimationObserver>
            ))}
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      {/* Gallery Section */}
      <GallerySection id="gallery">
        <div className="container">
          <AnimationObserver>
            <SectionTitle>???<span>?????</span></SectionTitle>
          </AnimationObserver>
          <GalleryGrid>
            {projects.map((project, index) => (
              <AnimationObserver key={index} delay={index * 100}>
                <GalleryItem onClick={() => handleProjectClick(project.title)}>
                  <GalleryImage>{project.icon}</GalleryImage>
                  <GalleryContent>
                    <GalleryTitle>{project.title}</GalleryTitle>
                    <GalleryDescription>{project.description}</GalleryDescription>
                    <ViewProjectLink>?????</ViewProjectLink>
                  </GalleryContent>
                </GalleryItem>
              </AnimationObserver>
            ))}
          </GalleryGrid>
        </div>
      </GallerySection>
    </main>
  )
}

export default MainContent
