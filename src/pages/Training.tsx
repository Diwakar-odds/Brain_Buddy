import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Music, Brain, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
// ...existing code...
import { generateAdaptiveMusic, simulateBrainwaveAnalysis, TARGET_STATES } from '../utils/brainwave';

export function Training() {
  const { user } = useAuth();
  const [selectedState, setSelectedState] = useState<string>('focus');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentSession, setCurrentSession] = useState<any>(null);
  const [musicParams, setMusicParams] = useState<any>(null);
  const [realTimeBrainwaves, setRealTimeBrainwaves] = useState<any>(null);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);

        if (duration % 5 === 0) {
          const simulated = simulateBrainwaveAnalysis(musicParams);
          setRealTimeBrainwaves(simulated);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, musicParams]);

  const startTraining = async () => {
    if (!user) return;

    try {
      const music = generateAdaptiveMusic(selectedState);
      setMusicParams(music);

      // Mock session - replace with actual API call when backend is ready
      const session = {
        id: Date.now().toString(),
        user_id: user.email,
        session_type: 'training',
        target_state: selectedState,
        status: 'active',
        metadata: { music_params: music },
      };

      const generatedMusic = {
        id: Date.now().toString(),
        user_id: user.email,
        session_id: session.id,
        target_state: selectedState,
        duration: 0,
        parameters: music,
        model_version: 'v1.0',
      };

      setCurrentSession({ ...session, music_id: generatedMusic.id });
      setIsPlaying(true);
    } catch (error: any) {
      console.error('Error starting training:', error);
      alert('Error starting training: ' + error.message);
    }
  };

  const pauseTraining = () => {
    setIsPlaying(false);
  };

  const stopTraining = async () => {
    if (!currentSession) return;

    setIsPlaying(false);

    try {
      // Mock session update - replace with actual API call when backend is ready
      console.log('Session completed:', {
        id: currentSession.id,
        duration,
        status: 'completed',
        completed_at: new Date().toISOString(),
      });

      console.log('Music updated:', {
        id: currentSession.music_id,
        duration,
      });

      if (realTimeBrainwaves) {
        // Mock EEG data save - replace with actual API call
        console.log('EEG data:', {
          session_id: currentSession.id,
          delta: realTimeBrainwaves.delta,
          theta: realTimeBrainwaves.theta,
          alpha: realTimeBrainwaves.alpha,
          beta: realTimeBrainwaves.beta,
          gamma: realTimeBrainwaves.gamma,
        });
      }

      setDuration(0);
      setCurrentSession(null);
      setMusicParams(null);
      setRealTimeBrainwaves(null);
    } catch (error: any) {
      console.error('Error stopping training:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Adaptive Training</h1>
        <p className="text-cyan-200">Generate AI music tailored to your target brain state</p>
      </div>

      {!currentSession ? (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-cyan-100 mb-4">
              Select Target State
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(TARGET_STATES).map(([state, config]) => (
                <button
                  key={state}
                  onClick={() => setSelectedState(state)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedState === state
                      ? 'bg-cyan-500/20 border-cyan-500 shadow-lg shadow-cyan-500/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="text-2xl mb-2">
                    {state === 'focus' && '🎯'}
                    {state === 'calm' && '🧘'}
                    {state === 'relax' && '🌊'}
                    {state === 'energize' && '⚡'}
                    {state === 'sleep' && '😴'}
                  </div>
                  <h3 className="text-lg font-semibold text-white capitalize mb-2">{state}</h3>
                  <p className="text-sm text-cyan-200">{config.description}</p>
                  <div className="mt-3 flex items-center space-x-2 text-xs text-white/60">
                    <span className="px-2 py-1 bg-white/10 rounded capitalize">{config.primary}</span>
                    <span className="px-2 py-1 bg-white/10 rounded capitalize">{config.secondary}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startTraining}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Start Training Session</span>
          </button>
        </>
      ) : (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mb-4 animate-pulse">
                <Music className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 capitalize">
                {selectedState} Training
              </h2>
              <p className="text-cyan-200">
                {TARGET_STATES[selectedState as keyof typeof TARGET_STATES]?.description}
              </p>
            </div>

            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-white mb-2">{formatTime(duration)}</div>
              <div className="text-cyan-200">Session Duration</div>
            </div>

            <div className="flex items-center justify-center space-x-4">
              {isPlaying ? (
                <button
                  onClick={pauseTraining}
                  className="flex items-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                >
                  <Pause className="w-5 h-5" />
                  <span>Pause</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  <Play className="w-5 h-5" />
                  <span>Resume</span>
                </button>
              )}

              <button
                onClick={stopTraining}
                className="flex items-center space-x-2 px-8 py-4 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 rounded-xl transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                <span>End Session</span>
              </button>
            </div>
          </div>

          {musicParams && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-cyan-400" />
                <h3 className="text-lg font-semibold text-white">Music Parameters</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-sm text-cyan-200 mb-1">Tempo</div>
                  <div className="text-xl font-bold text-white">{musicParams.tempo.toFixed(0)} BPM</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-sm text-cyan-200 mb-1">Key</div>
                  <div className="text-xl font-bold text-white">{musicParams.key}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-sm text-cyan-200 mb-1">Mode</div>
                  <div className="text-xl font-bold text-white capitalize">{musicParams.mode}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-sm text-cyan-200 mb-1">Energy</div>
                  <div className="text-xl font-bold text-white">
                    {(musicParams.parameters.energy * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {realTimeBrainwaves && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Real-Time Brain Activity</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(realTimeBrainwaves).map(([band, value]: [string, any]) => (
                  <div key={band}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white capitalize">{band}</span>
                      <span className="text-sm text-white">{(value * 100).toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${value * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
