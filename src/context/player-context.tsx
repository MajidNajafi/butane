import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { STEPS } from "../constants"

export const PlayerContext = createContext<{
  currentStep: number
  duration: number
  currentTime: number
  setDuration(value: number): void
  setCurrentTime(value: number): void
}>({
  currentStep: 0,
  currentTime: 0,
  duration: 0,
  setCurrentTime: () => {},
  setDuration: () => {},
})

export const PlayerProvider = ({ children }: PropsWithChildren) => {
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const stepLength = duration / STEPS

  useEffect(() => {
    const currentStep = Math.floor(currentTime / stepLength)
    setCurrentStep(currentStep)
  }, [currentTime])

  return (
    <PlayerContext.Provider
      value={{
        duration,
        setDuration,
        currentTime,
        setCurrentTime,
        currentStep,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
