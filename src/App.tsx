import { Steps, Toast, Video } from "./components"
import { PlayerProvider } from "./context/player-context"

function App() {
  return (
    <PlayerProvider>
      <div className="sm:container mx-4 sm:mx-auto my-4 rounded-xl min-h-full overflow-hidden flex:col sm:flex shadow-xl">
        <Video uri="https://butaneacademy.arvanvod.ir/mQM89Y8xyW/nol1XW6BRr/h_,140_13,k.mp4.list/master.m3u8" />
        <Steps />
      </div>
      <Toast />
    </PlayerProvider>
  )
}

export default App
