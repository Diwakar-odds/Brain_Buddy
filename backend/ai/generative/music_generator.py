"""
Music Generation Module
Generative AI for creating personalized brainwave entrainment music
"""

import torch
import torch.nn as nn
from typing import Dict, Optional, Tuple
import numpy as np


class MusicVAE(nn.Module):
    """
    Variational Autoencoder for music generation
    Learns structured latent space for controlled music synthesis
    """
    
    def __init__(
        self,
        input_dim: int = 128,  # MIDI features or spectrogram bins
        latent_dim: int = 64,
        hidden_dim: int = 256
    ):
        super().__init__()
        
        # Encoder
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU()
        )
        
        self.fc_mu = nn.Linear(hidden_dim, latent_dim)
        self.fc_logvar = nn.Linear(hidden_dim, latent_dim)
        
        # Decoder
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, input_dim),
            nn.Sigmoid()  # Output in [0, 1]
        )
        
    def encode(self, x: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        """Encode input to latent distribution parameters"""
        h = self.encoder(x)
        mu = self.fc_mu(h)
        logvar = self.fc_logvar(h)
        return mu, logvar
    
    def reparameterize(self, mu: torch.Tensor, logvar: torch.Tensor) -> torch.Tensor:
        """Reparameterization trick for sampling"""
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mu + eps * std
    
    def decode(self, z: torch.Tensor) -> torch.Tensor:
        """Decode latent vector to music"""
        return self.decoder(z)
    
    def forward(self, x: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        """Full forward pass"""
        mu, logvar = self.encode(x)
        z = self.reparameterize(mu, logvar)
        reconstruction = self.decode(z)
        return reconstruction, mu, logvar


class BrainwaveEntrainmentGenerator:
    """
    Generates music with embedded brainwave entrainment frequencies
    Supports binaural beats and isochronic tones
    """
    
    def __init__(self, sample_rate: int = 44100):
        self.sample_rate = sample_rate
        self.vae = MusicVAE()
        
    def generate_binaural_beat(
        self,
        target_frequency: float,  # Target brainwave frequency (e.g., 10 Hz for alpha)
        carrier_frequency: float = 440.0,  # Base tone (A4)
        duration: float = 60.0  # seconds
    ) -> np.ndarray:
        """
        Generate binaural beat audio
        
        Args:
            target_frequency: Desired brainwave frequency (Hz)
            carrier_frequency: Base frequency for both ears
            duration: Length in seconds
        
        Returns:
            Stereo audio array [2, num_samples]
        """
        t = np.linspace(0, duration, int(self.sample_rate * duration))
        
        # Left ear: carrier frequency
        left = np.sin(2 * np.pi * carrier_frequency * t)
        
        # Right ear: carrier + target (creates perceived beat)
        right = np.sin(2 * np.pi * (carrier_frequency + target_frequency) * t)
        
        # Combine to stereo
        stereo = np.vstack([left, right])
        
        return stereo
    
    def generate_isochronic_tone(
        self,
        target_frequency: float,
        carrier_frequency: float = 440.0,
        duration: float = 60.0
    ) -> np.ndarray:
        """
        Generate isochronic tone (pulsed tone at target frequency)
        """
        t = np.linspace(0, duration, int(self.sample_rate * duration))
        
        # Carrier wave
        carrier = np.sin(2 * np.pi * carrier_frequency * t)
        
        # Amplitude modulation at target frequency
        modulation = (np.sin(2 * np.pi * target_frequency * t) + 1) / 2
        
        # Apply modulation
        tone = carrier * modulation
        
        return tone
    
    def generate_personalized_music(
        self,
        target_state: str,  # "focus", "relax", "creative", "sleep"
        user_preferences: Optional[Dict] = None,
        duration: float = 300.0  # 5 minutes default
    ) -> np.ndarray:
        """
        Generate personalized music using VAE
        
        TODO: Integrate with RLHF to learn user preferences
        """
        # Map states to frequencies
        state_to_frequency = {
            "sleep": 2.0,      # Delta
            "creative": 6.0,   # Theta
            "relax": 10.0,     # Alpha
            "focus": 15.0,     # Beta (low)
            "peak": 40.0       # Gamma
        }
        
        target_freq = state_to_frequency.get(target_state, 10.0)
        
        # Generate base entrainment
        entrainment = self.generate_binaural_beat(
            target_frequency=target_freq,
            duration=duration
        )
        
        # TODO: Use VAE to generate musical elements
        # TODO: Blend entrainment with generated music
        # TODO: Apply user preferences from RLHF
        
        return entrainment


class RLHFMusicTrainer:
    """
    Reinforcement Learning from Human Feedback for music personalization
    """
    
    def __init__(self, generator: BrainwaveEntrainmentGenerator):
        self.generator = generator
        self.user_feedback_history = []
        
    def collect_feedback(
        self,
        music_id: str,
        rating: float,  # 0-1 scale
        effectiveness: float,  # 0-1 scale (did it achieve the goal?)
        user_id: str
    ):
        """Store user feedback for training"""
        self.user_feedback_history.append({
            "music_id": music_id,
            "rating": rating,
            "effectiveness": effectiveness,
            "user_id": user_id
        })
        
    def update_model(self):
        """
        Fine-tune generator based on accumulated feedback
        
        TODO: Implement reward model and policy gradient update
        """
        if len(self.user_feedback_history) < 10:
            return  # Need minimum data
        
        # TODO: Train reward model on feedback
        # TODO: Update generator to maximize reward
        print(f"🎵 Updating music model with {len(self.user_feedback_history)} feedback samples")


# Example usage
if __name__ == "__main__":
    generator = BrainwaveEntrainmentGenerator()
    
    # Generate alpha-state music for focus
    music = generator.generate_personalized_music(
        target_state="focus",
        duration=10.0  # 10 seconds for testing
    )
    
    print(f"Generated music shape: {music.shape}")
    print(f"Duration: {music.shape[1] / generator.sample_rate:.2f} seconds")
