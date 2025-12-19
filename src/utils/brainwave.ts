export interface BrainwaveState {
  delta: number;
  theta: number;
  alpha: number;
  beta: number;
  gamma: number;
}

export interface EmotionState {
  emotion: string;
  confidence: number;
  valence: number;
  arousal: number;
}

export const BRAINWAVE_INFO = {
  delta: {
    range: '0.5-4 Hz',
    state: 'Deep Sleep',
    description: 'Associated with deep, dreamless sleep and healing',
    color: 'from-indigo-500 to-purple-600',
  },
  theta: {
    range: '4-8 Hz',
    state: 'Meditation',
    description: 'Deep relaxation, meditation, and creativity',
    color: 'from-purple-500 to-pink-600',
  },
  alpha: {
    range: '8-13 Hz',
    state: 'Relaxed Focus',
    description: 'Calm, relaxed, yet alert state',
    color: 'from-blue-500 to-cyan-600',
  },
  beta: {
    range: '13-30 Hz',
    state: 'Active Thinking',
    description: 'Active concentration, problem-solving, decision making',
    color: 'from-green-500 to-emerald-600',
  },
  gamma: {
    range: '30-100 Hz',
    state: 'Peak Performance',
    description: 'High-level information processing and peak mental activity',
    color: 'from-yellow-500 to-orange-600',
  },
};

export const TARGET_STATES = {
  focus: { primary: 'beta', secondary: 'gamma', description: 'Enhanced concentration and mental clarity' },
  calm: { primary: 'alpha', secondary: 'theta', description: 'Peaceful, relaxed state of mind' },
  relax: { primary: 'theta', secondary: 'alpha', description: 'Deep relaxation and stress relief' },
  energize: { primary: 'beta', secondary: 'gamma', description: 'Increased alertness and energy' },
  sleep: { primary: 'delta', secondary: 'theta', description: 'Deep, restorative sleep' },
};

export function simulateBrainwaveAnalysis(audioFeatures?: any): BrainwaveState {
  const tempo = audioFeatures?.tempo || Math.random() * 140 + 60;
  const energy = audioFeatures?.energy || Math.random();

  let delta = 0.1 + Math.random() * 0.1;
  let theta = 0.15 + Math.random() * 0.15;
  let alpha = 0.25 + Math.random() * 0.15;
  let beta = 0.3 + Math.random() * 0.2;
  let gamma = 0.1 + Math.random() * 0.1;

  if (tempo < 80) {
    delta += 0.15;
    theta += 0.1;
    alpha += 0.05;
  } else if (tempo > 120) {
    beta += 0.15;
    gamma += 0.1;
  } else {
    alpha += 0.15;
    beta += 0.05;
  }

  if (energy < 0.3) {
    delta += 0.1;
    theta += 0.1;
  } else if (energy > 0.7) {
    beta += 0.1;
    gamma += 0.1;
  }

  const total = delta + theta + alpha + beta + gamma;

  return {
    delta: delta / total,
    theta: theta / total,
    alpha: alpha / total,
    beta: beta / total,
    gamma: gamma / total,
  };
}

export function analyzeEmotionFromBrainwaves(brainwaves: BrainwaveState): EmotionState {
  const { delta, theta, alpha, beta, gamma } = brainwaves;

  const arousal = (beta + gamma) / (theta + delta + 0.01);
  const valence = (alpha + theta) / (beta + 0.01);

  let emotion = 'neutral';
  let confidence = 0.7;

  if (delta > 0.35) {
    emotion = 'sleepy';
    confidence = 0.8;
  } else if (theta > 0.3 && alpha > 0.25) {
    emotion = 'calm';
    confidence = 0.85;
  } else if (alpha > 0.35) {
    emotion = 'relaxed';
    confidence = 0.9;
  } else if (beta > 0.35) {
    emotion = 'focused';
    confidence = 0.85;
  } else if (gamma > 0.2) {
    emotion = 'excited';
    confidence = 0.8;
  }

  return {
    emotion,
    confidence,
    valence: Math.min(valence, 1),
    arousal: Math.min(arousal, 1),
  };
}

export function extractAudioFeatures(duration: number): any {
  return {
    tempo: Math.random() * 100 + 60,
    key: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][Math.floor(Math.random() * 12)],
    mode: Math.random() > 0.5 ? 'major' : 'minor',
    energy: Math.random(),
    valence: Math.random(),
    mfcc: Array.from({ length: 13 }, () => Math.random() * 2 - 1),
    spectral_features: {
      centroid: Math.random() * 4000 + 1000,
      rolloff: Math.random() * 8000 + 2000,
      bandwidth: Math.random() * 2000 + 500,
    },
    rhythm_features: {
      onset_strength: Math.random(),
      beat_strength: Math.random(),
      rhythmic_complexity: Math.random(),
    },
  };
}

export function generateAdaptiveMusic(targetState: string): {
  tempo: number;
  key: string;
  mode: string;
  parameters: any;
} {
  const stateConfig = TARGET_STATES[targetState as keyof typeof TARGET_STATES] || TARGET_STATES.focus;

  let tempo = 100;
  let energy = 0.5;

  if (targetState === 'focus' || targetState === 'energize') {
    tempo = 100 + Math.random() * 40;
    energy = 0.6 + Math.random() * 0.3;
  } else if (targetState === 'calm' || targetState === 'relax') {
    tempo = 60 + Math.random() * 30;
    energy = 0.2 + Math.random() * 0.3;
  } else if (targetState === 'sleep') {
    tempo = 40 + Math.random() * 20;
    energy = 0.1 + Math.random() * 0.2;
  }

  return {
    tempo,
    key: ['C', 'D', 'E', 'G', 'A'][Math.floor(Math.random() * 5)],
    mode: targetState === 'calm' || targetState === 'sleep' ? 'minor' : 'major',
    parameters: {
      target_state: targetState,
      primary_band: stateConfig.primary,
      secondary_band: stateConfig.secondary,
      energy,
      binaural_freq: Math.random() * 10 + 5,
      harmonic_complexity: Math.random() * 0.5 + 0.3,
    },
  };
}

export function getDominantBrainwave(brainwaves: BrainwaveState): {
  band: string;
  value: number;
} {
  const entries = Object.entries(brainwaves);
  const [band, value] = entries.reduce((max, curr) =>
    curr[1] > max[1] ? curr : max
  );

  return { band, value };
}
