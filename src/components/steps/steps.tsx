import { useContext } from "react"
import { STEPS } from "../../constants"
import { PlayerContext } from "../../context/player-context"
import { SingleStep } from "./single-step"

export const Steps = () => {
  const { currentStep } = useContext(PlayerContext)
  return (
    <div className="bg-white">
      {Array(STEPS)
        .fill("")
        .map((item, key) => (
          <SingleStep key={key} step={key} current={currentStep} />
        ))}
    </div>
  )
}
