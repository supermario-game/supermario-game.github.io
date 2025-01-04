document.addEventListener('DOMContentLoaded', () => {
    const soundToggle = document.getElementById('sound-toggle');
    const onButton = document.getElementById('on-button');
    const offButton = document.getElementById('off-button');
    let isSoundOn = true;

    function toggleSound() {
        isSoundOn = !isSoundOn;
        
        // Update button visibility
        onButton.style.display = isSoundOn ? 'block' : 'none';
        offButton.style.display = isSoundOn ? 'none' : 'block';
        
        // Update main toggle button text
        const buttonText = soundToggle.querySelector('button');
        buttonText.textContent = isSoundOn ? 'SOUND ON' : 'SOUND OFF';
        
        // Toggle sound in your audio manager
        if (window.audioManager) {
            window.audioManager.toggleMute();
        }
    }

    // Add click handler to the sound toggle button
    soundToggle.querySelector('button').addEventListener('click', toggleSound);
    
    // Initialize sound state
    onButton.style.display = 'block';
    offButton.style.display = 'none';
});

