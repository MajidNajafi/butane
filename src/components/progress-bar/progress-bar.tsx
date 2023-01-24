import { useContext } from "react"
import { STEPS } from "../../constants"
import { PlayerContext } from "../../context/player-context"

export const ProgressBar = () => {
  const { currentTime, duration } = useContext(PlayerContext)

  const percent = duration > 0 ? Math.round((currentTime / duration) * 100) : 0

  const renderSeperator = (key: number) => {
    return <div key={key} className="h-full w-px bg-gray-400" />
  }

  return (
    <div className="relative w-full h-2 border border-gray-400 rounded-full overflow-hidden">
      <div className="bg-red-400 h-full" style={{ width: `${percent}%` }} />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-row justify-evenly">
        {Array(STEPS - 1)
          .fill("")
          .map((item, key) => renderSeperator(key))}
      </div>
    </div>
  )
}
