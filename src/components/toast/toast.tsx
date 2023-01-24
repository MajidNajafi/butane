import { useContext, useEffect, useMemo, useState } from "react"
import debounce from "lodash.debounce"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { PlayerContext } from "../../context/player-context"

export const Toast = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState<string>()

  const { currentStep } = useContext(PlayerContext)

  const debouncedChangeHandler = useMemo(
    () => debounce(() => setIsVisible(false), 3000),
    []
  )

  useEffect(() => {
    debouncedChangeHandler()
  }, [isVisible])

  useEffect(() => {
    if (!currentStep || isVisible) return
    setMessage(`Step ${currentStep} completed!`)
    setIsVisible(true)
  }, [currentStep])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 px-4 py-3 rounded-md bg-blue-300 font-bold shadow-lg flex text-blue-900">
      <CheckCircleIcon className="h-6 mr-2" />
      <span>{message}</span>
    </div>
  )
}
