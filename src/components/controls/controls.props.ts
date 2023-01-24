import { VideoState } from "../video/video.types"

export interface ControlsProps {
  /**
   * the state of video playback
   */
  state: VideoState

  /**
   * a function to handle the play event
   */
  onPlayPress(): void

  /**
   * a function to handle the pause event
   */
  onPausePress(): void
}

export interface ControlsRef {
  /**
   * display controls over video player
   */
  showControls(): void
}
