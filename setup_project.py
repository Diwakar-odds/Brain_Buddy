import os
from pathlib import Path

def setup():
    # Base directory
    base_dir = Path("Brain_Buddy")
    
    # Directory Structure from Part VII
    dirs = [
        "backend/app/api",
        "backend/app/core",
        "backend/app/services/audio_engine",
        "backend/app/services/llm_engine",
        "backend/app/models",
        "backend/tests",
        "frontend/src/components",
        "frontend/src/screens",
        "frontend/src/services",
        "ai_research/experiments",
        "ai_research/data",
    ]
    
    print(f"Initializing Brain Buddy Protocol in {os.getcwd()}...")
    
    # Create Directories
    for d in dirs:
        path = base_dir / d
        path.mkdir(parents=True, exist_ok=True)
        print(f"  [DIR]  {path}")
        
    # Create Essential Files
    files = {
        "backend/app/main.py": 
"""from fastapi import FastAPI
from fastapi.responses import Response
from app.services.audio_engine.binaural import generate_binaural_beat

app = FastAPI(title="Brain Buddy Cortex")

@app.get("/")
def health_check():
    return {"status": "active", "system": "cortex_v1", "phase": "static_mirror"}

@app.get("/audio/binaural/{state}")
async def get_binaural_beat(state: str):
    # Frequencies from Part V Data Repository
    states = {
        "delta": 2.0,  # Deep Sleep
        "theta": 5.5,  # Meditation/Creativity
        "alpha": 10.0, # Focus
        "beta": 20.0,  # Alertness
        "gamma": 40.0  # Insight
    }
    target_hz = states.get(state.lower(), 10.0)
    
    audio_buffer = generate_binaural_beat(frequency_hz=target_hz)
    return Response(content=audio_buffer.read(), media_type="audio/wav")
""",
        "backend/requirements.txt": 
"""fastapi==0.109.0
uvicorn==0.27.0
pydantic==2.6.0
sqlalchemy==2.0.25
python-dotenv==1.0.1
numpy==1.26.3
scipy==1.12.0
pytest==8.0.0
""",
        "docker-compose.yml":
"""version: '3.8'

services:
  cortex:
    build: ./backend
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
""",
        "README.md":
"""# Brain Buddy
**The Neuro-Algorithmic Symbiosis**

## Phase 1: The Static Mirror
Run `docker-compose up` to start the Cortex.
""",
        "backend/app/services/audio_engine/__init__.py": "",
        "backend/app/services/audio_engine/binaural.py":
"""import io
import numpy as np
from scipy.io.wavfile import write

def generate_binaural_beat(
    frequency_hz: float,
    duration_sec: int = 300,
    base_freq_hz: float = 200.0,
    sample_rate: int = 44100,
    volume: float = 0.5
) -> io.BytesIO:
    \"\"\"
    Generates a stereo binaural beat WAV file in memory.
    Left Ear: Base Frequency
    Right Ear: Base + Target Frequency
    \"\"\"
    t = np.linspace(0, duration_sec, int(sample_rate * duration_sec), endpoint=False)
    
    # Generate sine waves
    left_wave = np.sin(2 * np.pi * base_freq_hz * t)
    right_wave = np.sin(2 * np.pi * (base_freq_hz + frequency_hz) * t)
    
    # Stereo signal
    stereo_signal = np.vstack((left_wave, right_wave)).T
    
    # Normalize to 16-bit PCM
    audio_data = (stereo_signal * volume * 32767).astype(np.int16)
    
    buffer = io.BytesIO()
    write(buffer, sample_rate, audio_data)
    buffer.seek(0)
    
    return buffer
""",
        "frontend/src/components/BreathPacer.js":
"""import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';

const BreathPacer = ({ mode = 'box_breathing' }) => {
  const breathAnim = useRef(new Animated.Value(0)).current; // 0=Empty, 1=Full

  const protocols = {
    box_breathing: {
      name: "Box Breathing",
      sequence: [
        { toValue: 1, duration: 4000 }, // Inhale
        { delay: 4000 },                // Hold
        { toValue: 0, duration: 4000 }, // Exhale
        { delay: 4000 }                 // Hold
      ],
      color: '#66D9EF'
    },
    relax_4_7_8: {
      name: "4-7-8 Relax",
      sequence: [
        { toValue: 1, duration: 4000 },
        { delay: 7000 },
        { toValue: 0, duration: 8000 }
      ],
      color: '#A6E22E'
    }
  };

  const active = protocols[mode] || protocols.box_breathing;

  useEffect(() => {
    const runSequence = () => {
      const animations = active.sequence.map(step => {
        if (step.delay) return Animated.delay(step.delay);
        return Animated.timing(breathAnim, {
          toValue: step.toValue,
          duration: step.duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false
        });
      });
      Animated.sequence(animations).start(({ finished }) => {
        if (finished) runSequence();
      });
    };
    runSequence();
  }, [mode]);

  const size = breathAnim.interpolate({ inputRange: [0, 1], outputRange: [100, 300] });
  return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Animated.View style={{width:size, height:size, borderRadius:150, backgroundColor:active.color}} /></View>;
};
export default BreathPacer;
""",
        "backend/tests/test_audio.py":
"""import io
import wave
import pytest
from app.services.audio_engine.binaural import generate_binaural_beat

def test_binaural_beat_format():
    # Generate 1 second of Alpha (10Hz)
    buffer = generate_binaural_beat(frequency_hz=10.0, duration_sec=1)
    
    with wave.open(buffer, 'rb') as wav:
        assert wav.getnchannels() == 2  # Stereo
        assert wav.getsampwidth() == 2  # 16-bit
        assert wav.getframerate() == 44100
        assert wav.getnframes() == 44100
""",
        "frontend/src/services/nback_logic.js":
"""export class NBackEngine {
    constructor(n = 2) {
        this.n = n;
        this.trials = 20 + n;
        this.gridPositions = [0, 1, 2, 3, 5, 6, 7, 8]; // Center (4) excluded
        this.letters = ['C', 'D', 'G', 'K', 'P', 'Q', 'T', 'V'];
        this.sequence = [];
    }

    generateSession() {
        let visual = [];
        let audio = [];
        
        // Random fill
        for (let i = 0; i < this.trials; i++) {
            visual.push(this.gridPositions[Math.floor(Math.random() * this.gridPositions.length)]);
            audio.push(this.letters[Math.floor(Math.random() * this.letters.length)]);
        }

        // Inject Targets (~30%)
        const targetCount = 6;
        for (let k = 0; k < targetCount; k++) {
            // Visual Target
            let vIdx = Math.floor(Math.random() * (this.trials - this.n)) + this.n;
            visual[vIdx] = visual[vIdx - this.n];
            
            // Audio Target
            let aIdx = Math.floor(Math.random() * (this.trials - this.n)) + this.n;
            audio[aIdx] = audio[aIdx - this.n];
        }

        this.sequence = visual.map((v, i) => ({ visual: v, audio: audio[i] }));
        return this.sequence;
    }

    checkAnswer(index, type) {
        if (index < this.n) return false;
        const current = this.sequence[index];
        const target = this.sequence[index - this.n];
        
        if (type === 'visual') return current.visual === target.visual;
        if (type === 'audio') return current.audio === target.audio;
        return false;
    }
}
"""
    }
    
    for file_path, content in files.items():
        path = base_dir / file_path
        if not path.exists():
            with open(path, "w") as f:
                f.write(content)
            print(f"  [FILE] {path}")

    print("\nInitialization Complete. The Cortex is ready.")

if __name__ == "__main__":
    setup()