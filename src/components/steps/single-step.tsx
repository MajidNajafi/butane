import { useEffect, useState } from "react"
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  Bars2Icon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/solid"
import { STEPS } from "../../constants"

interface SingleStepProps {
  step: number
  current: number
}

export const SingleStep = ({ step, current }: SingleStepProps) => {
  const [playCount, setPlayCount] = useState(0)
  const isFirstStep = step === 0
  const isLastStep = step === STEPS - 1
  const isCurrentStep = step === current
  const isFinished = step === current - 1

  const isCompleted =
    ((isFirstStep || isLastStep) && playCount > 0) ||
    (!isFirstStep && !isLastStep && playCount > 1)

  const isHalfCompleted = !isFirstStep && !isLastStep && playCount === 1

  const Icon = isCurrentStep
    ? ArrowRightCircleIcon
    : isCompleted || isHalfCompleted
    ? CheckCircleIcon
    : ExclamationCircleIcon

  const color = isCurrentStep
    ? "orange"
    : isCompleted
    ? "teal"
    : isHalfCompleted
    ? "skyblue"
    : "gray"

  useEffect(() => {
    if (isFinished) setPlayCount(playCount + 1)
  }, [current])

  return (
    <div className="w-full sm:w-44 border-b p-4 font-bold flex">
      <Icon
        className="h-6 mr-2"
        style={{
          color,
        }}
      />
      <span>Step {step + 1}</span>
    </div>
  )
}
