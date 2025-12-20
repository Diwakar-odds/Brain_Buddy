# Sample Data Examples

This document shows what the seeded data looks like.

## Sample Training Session (Brainwave Module)

```json
{
  "id": "507f1f77bcf86cd799439011",
  "user_id": "demo_user_1@brainbuddy.com",
  "module_type": "brainwave",
  "brainwave_target": "alpha",
  "generated_content": {
    "carrier_frequency": 320.45,
    "binaural_beat_frequency": 10.5,
    "isochronic_tone_frequency": 21.0,
    "volume": 0.6,
    "tempo_bpm": 81,
    "harmonic_complexity": "moderate",
    "modulation_depth": 0.35,
    "pink_noise_level": 0.2
  },
  "user_rating": 4,
  "effectiveness_score": 0.82,
  "timestamp": "2024-09-15T14:30:00Z",
  "duration_seconds": 1800
}
```

## Sample Training Session (MOVERS Module)

```json
{
  "id": "507f1f77bcf86cd799439012",
  "user_id": "demo_user_2@brainbuddy.com",
  "module_type": "movers",
  "generated_content": {
    "meditation_duration": 12,
    "breathwork_cycles": 7,
    "visualization_script": "success_visualization_v1",
    "exercise_type": "yoga",
    "reading_topic": "neuroplasticity",
    "journal_prompt": "What am I grateful for today?"
  },
  "user_rating": 5,
  "effectiveness_score": 0.91,
  "timestamp": "2024-10-02T06:15:00Z",
  "duration_seconds": 2400
}
```

## Sample Training Session (PFC Gym Module)

```json
{
  "id": "507f1f77bcf86cd799439013",
  "user_id": "demo_user_3@brainbuddy.com",
  "module_type": "pfc_gym",
  "generated_content": {
    "protocol_type": "procrastination_breaker",
    "trigger_identified": "notification",
    "interrupt_technique": "breathing",
    "duration_seconds": 180,
    "focus_score": 0.76
  },
  "user_rating": 4,
  "effectiveness_score": 0.78,
  "timestamp": "2024-11-20T16:45:00Z",
  "duration_seconds": 180
}
```

## Sample Training Session (Mental Rehearsal Module)

```json
{
  "id": "507f1f77bcf86cd799439014",
  "user_id": "demo_user_1@brainbuddy.com",
  "module_type": "mental_rehearsal",
  "generated_content": {
    "skill_target": "public_speaking",
    "visualization_detail_level": "high",
    "sensory_channels": ["visual", "auditory", "kinesthetic", "emotional"],
    "repetitions": 7,
    "vividness_score": 0.88
  },
  "user_rating": 5,
  "effectiveness_score": 0.89,
  "timestamp": "2024-12-01T19:00:00Z",
  "duration_seconds": 900
}
```

## Sample Knowledge Entry (Binaural Beats)

```json
{
  "id": "607f1f77bcf86cd799439021",
  "stimulus_type": "binaural_beats",
  "stimulus_parameters": {
    "frequency_range": "4-8 Hz",
    "target_state": "theta",
    "carrier_frequency": "200-400 Hz"
  },
  "outcome": "increased_creativity",
  "evidence_strength": 0.72,
  "citations": [
    {
      "title": "The Effect of Binaural Beats on Visuospatial Working Memory and Cortical Connectivity",
      "authors": "Beauchene et al.",
      "year": "2016",
      "journal": "PLOS ONE"
    }
  ]
}
```

## Sample Knowledge Entry (Meditation)

```json
{
  "id": "607f1f77bcf86cd799439022",
  "stimulus_type": "meditation",
  "stimulus_parameters": {
    "type": "mindfulness",
    "duration_minutes": "10-20",
    "frequency": "daily"
  },
  "outcome": "increased_gray_matter_hippocampus",
  "evidence_strength": 0.85,
  "citations": [
    {
      "title": "Mindfulness practice leads to increases in regional brain gray matter density",
      "authors": "Hölzel et al.",
      "year": "2011",
      "journal": "Psychiatry Research: Neuroimaging"
    }
  ]
}
```

## Sample User Statistics Response

```json
{
  "total_sessions": 167,
  "total_hours": 78.5,
  "average_rating": 4.2,
  "sessions_by_module": {
    "movers": 42,
    "pfc_gym": 43,
    "mental_rehearsal": 40,
    "brainwave": 42
  },
  "sessions_by_brainwave": {
    "delta": 8,
    "theta": 9,
    "alpha": 10,
    "beta": 8,
    "gamma": 7
  },
  "recent_sessions": 12
}
```

## Sample API Response (List Sessions)

```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "user_id": "demo_user_1@brainbuddy.com",
    "module_type": "brainwave",
    "brainwave_target": "alpha",
    "generated_content": {
      "carrier_frequency": 320.45,
      "binaural_beat_frequency": 10.5,
      "volume": 0.6
    },
    "user_rating": 4,
    "effectiveness_score": 0.82,
    "timestamp": "2024-09-15T14:30:00Z",
    "duration_seconds": 1800
  },
  {
    "id": "507f1f77bcf86cd799439012",
    "user_id": "demo_user_1@brainbuddy.com",
    "module_type": "movers",
    "brainwave_target": null,
    "generated_content": {
      "meditation_duration": 12,
      "exercise_type": "yoga"
    },
    "user_rating": 5,
    "effectiveness_score": 0.91,
    "timestamp": "2024-10-02T06:15:00Z",
    "duration_seconds": 2400
  }
]
```

## Sample Recommendations Response

```json
{
  "module_type": "brainwave",
  "recommendations": [
    {
      "stimulus_type": "gamma_entrainment",
      "outcome": "enhanced_cognitive_performance",
      "evidence_strength": 0.73,
      "parameters": {
        "frequency": "40 Hz",
        "modality": "audiovisual",
        "duration_minutes": "30"
      },
      "key_citation": {
        "title": "Gamma entrainment frequency affects mood states and cognition",
        "authors": "Chaieb et al.",
        "year": "2015",
        "journal": "Frontiers in Human Neuroscience"
      }
    },
    {
      "stimulus_type": "neurofeedback",
      "outcome": "improved_attention",
      "evidence_strength": 0.76,
      "parameters": {
        "target_frequency": "alpha_8-13Hz",
        "feedback_modality": "auditory",
        "session_duration": "30"
      },
      "key_citation": {
        "title": "EEG Neurofeedback for Optimising Performance",
        "authors": "Gruzelier et al.",
        "year": "2014",
        "journal": "Neuroscience & Biobehavioral Reviews"
      }
    }
  ]
}
```

## Data Characteristics

### Timestamps
- Distributed over 6 months (180 days)
- Random times throughout the day
- Realistic usage patterns

### Ratings
- 80% of sessions have ratings
- Range: 1-5 stars
- Average: ~4.2

### Duration
- Minimum: 5 minutes (300s)
- Maximum: 1 hour (3600s)
- Average: ~30 minutes (1800s)

### Module Distribution
- MOVERS: ~25%
- PFC Gym: ~25%
- Mental Rehearsal: ~25%
- Brainwave: ~25%

### Brainwave States
- Delta: ~20%
- Theta: ~20%
- Alpha: ~20%
- Beta: ~20%
- Gamma: ~20%

### Music Parameters (Brainwave)
All frequencies are scientifically accurate:
- **Delta (0.5-4 Hz)**: Deep sleep
  - Carrier: 200-400 Hz
  - Beat: 0.5-4 Hz
  - Tempo: ~60-68 BPM

- **Theta (4-8 Hz)**: Meditation
  - Carrier: 200-400 Hz
  - Beat: 4-8 Hz
  - Tempo: ~68-76 BPM

- **Alpha (8-13 Hz)**: Relaxed focus
  - Carrier: 200-400 Hz
  - Beat: 8-13 Hz
  - Tempo: ~76-86 BPM

- **Beta (13-30 Hz)**: Active thinking
  - Carrier: 200-400 Hz
  - Beat: 13-30 Hz
  - Tempo: ~86-120 BPM

- **Gamma (30-100 Hz)**: Peak performance
  - Carrier: 200-400 Hz
  - Beat: 30-100 Hz
  - Tempo: ~120-260 BPM
