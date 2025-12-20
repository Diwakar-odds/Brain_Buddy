import { useState } from 'react';
import { Upload as UploadIcon, Mic, Music, Activity, Check, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
// ...existing code...
import { extractAudioFeatures, simulateBrainwaveAnalysis } from '../utils/brainwave';

export function Upload() {
  const { user } = useAuth();
  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<'audio' | 'eeg'>('audio');
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setAnalysisResult(null);
    }
  };

  const startRecording = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecording(true);

      setTimeout(() => {
        stopRecording();
      }, 5000);
    } catch (error) {
      alert('Microphone access denied. Please allow microphone access to record.');
    }
  };

  const stopRecording = () => {
    setRecording(false);
    const mockFile = new File([''], 'recording.wav', { type: 'audio/wav' });
    setFile(mockFile);
  };

  const handleAnalyze = async () => {
    if (!file || !user) return;

    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      const duration = Math.random() * 180 + 30;

      // Mock session - replace with actual API call
      const session = {
        id: Date.now().toString(),
        user_id: user.email,
        session_type: 'upload',
        target_state: 'focus',
        duration: Math.floor(duration),
        status: 'active',
      };

      // Mock recording - replace with actual API call
      const recording = {
        id: Date.now().toString(),
        user_id: user.email,
        session_id: session.id,
        recording_type: selectedType,
        duration,
        sample_rate: 44100,
        metadata: { filename: file.name },
      };

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const audioFeatures = extractAudioFeatures(duration);

      // Mock audio features save
      console.log('Audio features:', {
        recording_id: recording.id,
        tempo: audioFeatures.tempo,
        key: audioFeatures.key,
        mode: audioFeatures.mode,
        energy: audioFeatures.energy,
        valence: audioFeatures.valence,
        mfcc: audioFeatures.mfcc,
        spectral_features: audioFeatures.spectral_features,
        rhythm_features: audioFeatures.rhythm_features,
      });

      const brainwaves = simulateBrainwaveAnalysis(audioFeatures);

      // Mock brainwave data save
      console.log('Brainwaves:', {
        recording_id: recording.id,
        session_id: session.id,
        delta: brainwaves.delta,
        theta: brainwaves.theta,
        alpha: brainwaves.alpha,
        beta: brainwaves.beta,
        gamma: brainwaves.gamma,
      });

      const dominantBand = Object.entries(brainwaves).reduce((a, b) =>
        b[1] > a[1] ? b : a
      );

      const emotionMap: Record<string, string> = {
        delta: 'sleepy',
        theta: 'relaxed',
        alpha: 'calm',
        beta: 'focused',
        gamma: 'excited',
      };

      const predictedEmotion = emotionMap[dominantBand[0]];

      // Mock predictions save
      console.log('Predictions:', {
        session_id: session.id,
        recording_id: recording.id,
        predicted_state: dominantBand[0],
        confidence: dominantBand[1],
        emotion_pred: predictedEmotion,
        emotion_confidence: 0.75 + Math.random() * 0.2,
        model_version: 'v1.0',
        features_used: { audio_features: true, brainwaves: true },
      });

      // Mock session completion
      console.log('Session completed:', { 
        id: session.id, 
        status: 'completed', 
        completed_at: new Date().toISOString() 
      });

      setAnalysisResult({
        brainwaves,
        audioFeatures,
        predictedState: dominantBand[0],
        emotion: predictedEmotion,
        confidence: dominantBand[1],
      });
    } catch (error: any) {
      console.error('Analysis error:', error);
      alert('Error analyzing data: ' + error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Upload & Analyze</h1>
        <p className="text-cyan-200">Record or upload audio/EEG data for brain state analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setSelectedType('audio')}
          className={`p-6 rounded-2xl border-2 transition-all ${
            selectedType === 'audio'
              ? 'bg-cyan-500/20 border-cyan-500 shadow-lg shadow-cyan-500/20'
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}
        >
          <Music className="w-12 h-12 text-cyan-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">Audio Recording</h3>
          <p className="text-sm text-cyan-200">Analyze music or ambient sounds</p>
        </button>

        <button
          onClick={() => setSelectedType('eeg')}
          className={`p-6 rounded-2xl border-2 transition-all ${
            selectedType === 'eeg'
              ? 'bg-purple-500/20 border-purple-500 shadow-lg shadow-purple-500/20'
              : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}
        >
          <Activity className="w-12 h-12 text-purple-400 mb-3" />
          <h3 className="text-lg font-semibold text-white mb-1">EEG Data</h3>
          <p className="text-sm text-cyan-200">Upload brainwave measurements</p>
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-cyan-100 mb-3">
              {selectedType === 'audio' ? 'Record or Upload Audio' : 'Upload EEG Data'}
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedType === 'audio' && (
                <button
                  onClick={recording ? stopRecording : startRecording}
                  disabled={analyzing}
                  className={`flex items-center justify-center space-x-3 p-6 rounded-xl border-2 transition-all ${
                    recording
                      ? 'bg-red-500/20 border-red-500 animate-pulse'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  } disabled:opacity-50`}
                >
                  <Mic className="w-6 h-6 text-cyan-400" />
                  <span className="text-white font-medium">
                    {recording ? 'Recording...' : 'Record Audio'}
                  </span>
                </button>
              )}

              <label className="flex items-center justify-center space-x-3 p-6 rounded-xl border-2 border-dashed border-white/20 hover:bg-white/5 cursor-pointer transition-all">
                <UploadIcon className="w-6 h-6 text-cyan-400" />
                <span className="text-white font-medium">
                  {file ? file.name : 'Upload File'}
                </span>
                <input
                  type="file"
                  accept={selectedType === 'audio' ? 'audio/*' : '.csv,.edf'}
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={analyzing}
                />
              </label>
            </div>

            {file && (
              <div className="mt-4 flex items-center justify-between p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-white">{file.name}</span>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!file || analyzing}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {analyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <span>Analyze Brain State</span>
            )}
          </button>
        </div>
      </div>

      {analysisResult && (
        <div className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-white mb-6">Analysis Results</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
              <div className="text-sm text-cyan-200 mb-2">Predicted State</div>
              <div className="text-3xl font-bold text-white capitalize mb-2">
                {analysisResult.predictedState}
              </div>
              <div className="text-sm text-cyan-300">
                Confidence: {(analysisResult.confidence * 100).toFixed(1)}%
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
              <div className="text-sm text-purple-200 mb-2">Emotion</div>
              <div className="text-3xl font-bold text-white capitalize mb-2">
                {analysisResult.emotion}
              </div>
              <div className="text-sm text-purple-300">
                Based on brainwave patterns
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Brainwave Bands</h4>
            {Object.entries(analysisResult.brainwaves).map(([band, value]: [string, any]) => (
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

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-sm text-cyan-200 mb-1">Tempo</div>
              <div className="text-xl font-bold text-white">
                {analysisResult.audioFeatures.tempo.toFixed(0)} BPM
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-sm text-cyan-200 mb-1">Key</div>
              <div className="text-xl font-bold text-white">
                {analysisResult.audioFeatures.key}
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-sm text-cyan-200 mb-1">Energy</div>
              <div className="text-xl font-bold text-white">
                {(analysisResult.audioFeatures.energy * 100).toFixed(0)}%
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <div className="text-sm text-cyan-200 mb-1">Valence</div>
              <div className="text-xl font-bold text-white">
                {(analysisResult.audioFeatures.valence * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
