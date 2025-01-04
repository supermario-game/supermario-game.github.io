import { audioManager } from './audio-manager'

// Add this to your existing game code
document.addEventListener('DOMContentLoaded', () => {
  // Initialize audio system
  audioManager.initializeAudio()

  // Add sound toggle button handler
  const soundButton = document.querySelector('#sound-toggle')
  if (soundButton) {
    soundButton.addEventListener('click', () => {
      const isMuted = audioManager.toggleMute()
      // Update the sound button text
      soundButton.textContent = isMuted ? 'SOUND OFF' : 'SOUND ON'
    })
  }

  // Add these calls to your existing game event handlers:
  
  // When Mario jumps
  function onJump() {
    audioManager.playSound('jump')
  }

  // When Mario collects a coin
  function onCoinCollect() {
    audioManager.playSound('coin')
  }

  // When Mario gets a power up
  function onPowerUp() {
    audioManager.playSound('powerup')
  }

  // When Mario dies
  function onDeath() {
    audioManager.playSound('die')
    audioManager.stopSound('theme')
  }

  // When game over
  function onGameOver() {
    audioManager.playSound('gameover')
    audioManager.stopSound('theme')
  }
})

