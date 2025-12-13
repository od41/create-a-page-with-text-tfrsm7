import { useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import AnimatedBackground from './components/AnimatedBackground'
import LoveNYHero from './components/LoveNYHero'

function App() {
  const [message, setMessage] = useState("")

  return (
    <AnimatedBackground>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero Component */}
        <LoveNYHero />

        {/* Interactive Section */}
        <div className="text-center space-y-6 max-w-2xl mt-8">
          <div className="pt-8">
            <Button 
              onClick={() => setMessage("Welcome to the city of dreams! 💕")}
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-6 text-lg shadow-xl"
            >
              Begin Your Journey
            </Button>
          </div>
          {message && (
            <p className="text-2xl text-white drop-shadow-lg animate-in fade-in duration-500 pt-4">
              {message}
            </p>
          )}
        </div>
      </div>
    </AnimatedBackground>
  )
}

export default App
