// Audio files paths - make sure these files exist in your project
const AUDIO_FILES = {
  theme: 'audio/theme.mp3',
  jump: 'audio/jump.mp3',
  coin: 'audio/coin.mp3',
  die: 'audio/die.mp3',
  powerup: 'audio/powerup.mp3',
  gameover: 'audio/gameover.mp3'
}

class AudioManager {
  private audioElements: { [key: string]: HTMLAudioElement } = {}
  private muted: boolean = false

  constructor() {
    // Create audio elements for each sound
    Object.entries(AUDIO_FILES).forEach(([key, path]) => {
      const audio = new Audio(path)
      if (key === 'theme') {
        audio.loop = true
      }
      this.audioElements[key] = audio
    })

    // Add error handling for audio loading
    Object.values(this.audioElements).forEach(audio => {
      audio.addEventListener('error', (e) => {
        console.error('Error loading audio file:', e)
      })
    })
  }

  playSound(name: keyof typeof AUDIO_FILES) {
    if (!this.muted && this.audioElements[name]) {
      // For sound effects, reset to start to allow rapid replay
      if (name !== 'theme') {
        this.audioElements[name].currentTime = 0
      }
      this.audioElements[name].play().catch(e => {
        console.error('Error playing sound:', e)
      })
    }
  }

  stopSound(name: keyof typeof AUDIO_FILES) {
    if (this.audioElements[name]) {
      this.audioElements[name].pause()
      this.audioElements[name].currentTime = 0
    }
  }

  toggleMute() {
    this.muted = !this.muted
    Object.values(this.audioElements).forEach(audio => {
      audio.muted = this.muted
    })
    return this.muted
  }

  // Call this when the game starts
  initializeAudio() {
    // Many browsers require user interaction before playing audio
    const startAudio = () => {
      this.playSound('theme')
      document.removeEventListener('click', startAudio)
      document.removeEventListener('keydown', startAudio)
    }

    document.addEventListener('click', startAudio)
    document.addEventListener('keydown', startAudio)
  }
}

export const audioManager = new AudioManager()

