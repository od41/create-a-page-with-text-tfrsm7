import { useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import AnimatedBackground from './components/AnimatedBackground'
import LoveNYHero from './components/LoveNYHero'
import FloatingHearts from './components/FloatingHearts'
import InteractiveElements from './components/InteractiveElements'

function App() {
  const [message, setMessage] = useState("")

  return (
    <AnimatedBackground>
      {/* Floating Hearts Layer - background layer (z-20) */}
      <FloatingHearts />
      
      {/* Interactive Elements Layer - click-to-create hearts (z-30 overlay, z-40 hearts) */}
      <InteractiveElements />
      
      {/* Main Content Layer - hero and interactive elements (z-50) */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 relative z-50">
        {/* Hero Component - pointer-events-none to allow clicks through */}
        <div className="pointer-events-none">
          <LoveNYHero />
        </div>

        {/* Interactive Section - restore pointer events for button */}
        <div className="text-center space-y-6 max-w-2xl mt-8 pointer-events-auto">
          <div className="pt-8">
            <Button 
              onClick={() => setMessage("Welcome to the city of dreams! 💕")}
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Begin Your Journey
            </Button>
          </div>
          {message && (
            <p className="text-xl sm:text-2xl text-white drop-shadow-lg animate-in fade-in duration-500 pt-4 font-light">
              {message}
            </p>
          )}
        </div>
      </div>
    </AnimatedBackground>
  )
}

export default App