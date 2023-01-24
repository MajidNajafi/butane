import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react"
import { PlayCircleIcon, PauseCircleIcon } from "@heroicons/react/24/solid"
import debounce from "lodash.debounce"
import { ControlsProps, ControlsRef } from "./controls.props"
import { FormatTime } from "../../utils/format-time"
import { ProgressBar } from "../progress-bar/progress-bar"
import { PlayerContext } from "../../context/player-context"

/**
 * custom controls to use with video component
 */
export const Controls = forwardRef<ControlsRef, ControlsProps>(
  ({ state, onPausePress, onPlayPress }, ref) => {
    const [controlsVisible, setControlsVisible] = useState(false)

    const { currentTime, duration } = useContext(PlayerContext)

    const debouncedChangeHandler = useMemo(
      () => debounce(() => setControlsVisible(false), 2000),
      []
    )

    useImperativeHandle(ref, () => ({
      showControls: () => setControlsVisible(true),
    }))

    const onPlayHandler = () => {
      onPlayPress()
      debouncedChangeHandler()
    }

    const onPauseHandler = () => {
      onPausePress()
      debouncedChangeHandler()
    }

    useEffect(() => {
      debouncedChangeHandler()
    }, [controlsVisible])

    if (!controlsVisible && state !== "idle") return null

    const renderPlayButton = () => {
      const Icon = state !== "play" ? PlayCircleIcon : PauseCircleIcon
      const onClick = state !== "play" ? onPlayHandler : onPauseHandler
      return (
        <>
          <button onClick={onClick} className="w-16 h-16">
            <Icon className="text-white" />
          </button>
        </>
      )
    }

    return (
      <div className="absolute bg-black bg-opacity-60 bottom-0 top-0 left-0 right-0 flex flex-col">
        <div className="flex flex-grow justify-center items-center">
          {renderPlayButton()}
        </div>

        <div className="p-4 pt-0 flex items-center">
          <div className="whitespace-nowrap text-xs font-mono text-white font-light mr-2">
            {FormatTime(currentTime)} / {FormatTime(duration)}
          </div>
          <ProgressBar />
        </div>
      </div>
    )
  }
)
