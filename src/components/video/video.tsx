import { useContext, useEffect, useRef, useState } from "react"
import ReactHlsPlayer from "react-hls-player"
import { VideoProps } from "./video.props"
import { VideoState } from "./video.types"
import { Controls } from "../controls/controls"
import { ControlsRef } from "../controls/controls.props"
import { PlayerContext } from "../../context/player-context"
import { STEPS } from "../../constants"

/**
 * a media component to play online videos
 *
 * using custom controls and preventing user to seek the progress
 */
export const Video = (props: VideoProps) => {
  const [state, setState] = useState<VideoState>("idle")

  /**
   * this state indicates if user is watching for the first time
   * or has watched one time and is now reviewing.
   * if this is `true`, user can proceed to last step
   */
  const [isReviewing, setIsReviewing] = useState(false)

  const { setDuration, setCurrentTime, currentStep, ...playerTime } =
    useContext(PlayerContext)

  const currentTime = useRef(0)

  const playerRef = useRef<HTMLVideoElement>(null!)

  const controlsRef = useRef<ControlsRef>(null!)

  const onLoad = (e: Event) => {
    setDuration(playerRef.current?.duration ?? 0)
  }

  const onSeek = (e: Event) => {
    if (!playerRef.current) return
    if (currentTime.current < playerRef.current?.currentTime) {
      playerRef.current.currentTime = currentTime.current
    }
  }

  const onPlay = () => {
    setState("play")
  }

  const onPause = () => {
    setState("pause")
  }

  const onEnd = () => {
    setState("end")
    setCurrentTime(playerTime.duration)
  }

  useEffect(() => {
    playerRef.current?.addEventListener("loadedmetadata", onLoad)
    playerRef.current?.addEventListener("seeking", onSeek)
    playerRef.current?.addEventListener("seeked", onSeek)
    playerRef.current?.addEventListener("play", onPlay)
    playerRef.current?.addEventListener("pause", onPause)
    playerRef.current?.addEventListener("ended", onEnd)

    // playerRef.current.playbackRate = 4

    const currentTimeInterval = setInterval(() => {
      const time = playerRef.current?.currentTime ?? 0
      currentTime.current = time
      setCurrentTime(time)
    }, 500)

    return () => {
      playerRef.current?.removeEventListener("loadedmetadata", onLoad)
      playerRef.current?.removeEventListener("seeking", onSeek)
      playerRef.current?.removeEventListener("seeked", onSeek)
      playerRef.current?.removeEventListener("play", onPlay)
      playerRef.current?.removeEventListener("pause", onPause)
      playerRef.current?.removeEventListener("ended", onEnd)
      clearInterval(currentTimeInterval)
    }
  }, [])

  useEffect(() => {
    if (currentStep === STEPS - 1 && !isReviewing) {
      setIsReviewing(true)
      const stepTwoTime = playerTime.duration / STEPS
      playerRef.current.currentTime = stepTwoTime
    }
  }, [currentStep])

  return (
    <div className="relative w-full">
      <ReactHlsPlayer
        playerRef={playerRef}
        src={props.uri}
        autoPlay={false}
        controls={false}
        className="w-full h-full object-cover"
        onClick={() => controlsRef.current.showControls()}
      />
      <Controls
        ref={controlsRef}
        state={state}
        onPlayPress={() => playerRef.current.play()}
        onPausePress={() => playerRef.current.pause()}
      />
    </div>
  )
}
