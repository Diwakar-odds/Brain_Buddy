import { useState, useEffect } from 'react';
import { FlaskConical, Play, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
// ...existing code...

const EXPERIMENT_TYPES = [
  {
    type: 'actual_vs_imagined',
    name: 'Actual vs Imagined Action',
    description: 'Compare brain activity when performing vs imagining an action',
    duration: '15 min',
    trials: 10,
    icon: '🧠',
  },
  {
    type: 'music_entrainment',
    name: 'Music Brainwave Entrainment',
    description: 'Train specific brainwave frequencies through rhythmic audio',
    duration: '20 min',
    trials: 5,
    icon: '🎵',
  },
  {
    type: 'emotion_mapping',
    name: 'Emotion-State Mapping',
    description: 'Correlate emotional states with brainwave patterns',
    duration: '10 min',
    trials: 8,
    icon: '😊',
  },
  {
    type: 'focus_training',
    name: 'Progressive Focus Training',
    description: 'Build sustained concentration through graduated challenges',
    duration: '25 min',
    trials: 6,
    icon: '🎯',
  },
];

export function Experiments() {
  const { user } = useAuth();
  const [experiments, setExperiments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [activeExperiment, setActiveExperiment] = useState<any>(null);

  useEffect(() => {
    loadExperiments();
  }, [user]);

  const loadExperiments = async () => {
    if (!user) return;

    try {
      // simple localStorage-backed experiments store
      const raw = localStorage.getItem('experiments');
      const all = raw ? JSON.parse(raw) : [];
      const userExps = all
        .filter((e: any) => e.user_id === user.id)
        .sort((a: any, b: any) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime());

      setExperiments(userExps || []);
    } catch (error) {
      console.error('Error loading experiments:', error);
    } finally {
      setLoading(false);
    }
  };

  const startExperiment = async (type: string) => {
    if (!user) return;

    const experimentConfig = EXPERIMENT_TYPES.find((e) => e.type === type);
    if (!experimentConfig) return;

    try {
      const protocol = {
        trials: experimentConfig.trials,
        duration_minutes: parseInt(experimentConfig.duration),
        instructions: `Complete ${experimentConfig.trials} trials of ${experimentConfig.name}`,
      };

      // store the new experiment in localStorage
      const raw = localStorage.getItem('experiments');
      const all = raw ? JSON.parse(raw) : [];
      const newExp = {
        id: Date.now().toString(),
        user_id: user.id,
        experiment_type: type,
        protocol,
        status: 'active',
        started_at: new Date().toISOString(),
      };
      all.push(newExp);
      localStorage.setItem('experiments', JSON.stringify(all));

      setActiveExperiment(newExp);
      setSelectedType(null);
    } catch (error: any) {
      console.error('Error starting experiment:', error);
      alert('Error starting experiment: ' + error.message);
    }
  };

  const completeExperiment = async () => {
    if (!activeExperiment) return;

    try {
      const raw = localStorage.getItem('experiments');
      const all = raw ? JSON.parse(raw) : [];
      const idx = all.findIndex((e: any) => e.id === activeExperiment.id);
      if (idx !== -1) {
        all[idx] = {
          ...all[idx],
          status: 'completed',
          completed_at: new Date().toISOString(),
        };
        localStorage.setItem('experiments', JSON.stringify(all));
      }

      setActiveExperiment(null);
      loadExperiments();
    } catch (error: any) {
      console.error('Error completing experiment:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  if (activeExperiment) {
    const config = EXPERIMENT_TYPES.find((e) => e.type === activeExperiment.experiment_type);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{config?.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2">{config?.name}</h2>
            <p className="text-cyan-200">{config?.description}</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-white">0/{config?.trials}</div>
                <div className="text-sm text-cyan-200">Trials Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{config?.duration}</div>
                <div className="text-sm text-cyan-200">Estimated Duration</div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-semibold text-white">Instructions</h3>
            <div className="bg-white/5 rounded-xl p-4 space-y-2">
              <p className="text-cyan-200">1. Find a quiet, comfortable space</p>
              <p className="text-cyan-200">2. Follow the on-screen prompts for each trial</p>
              <p className="text-cyan-200">3. Try to maintain focus throughout the experiment</p>
              <p className="text-cyan-200">4. Provide honest feedback after each trial</p>
            </div>
          </div>

          <button
            onClick={completeExperiment}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Complete Experiment</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Brain Training Experiments</h1>
        <p className="text-cyan-200">Participate in guided research protocols</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {EXPERIMENT_TYPES.map((experiment) => (
          <div
            key={experiment.type}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
          >
            <div className="text-5xl mb-4">{experiment.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{experiment.name}</h3>
            <p className="text-cyan-200 mb-4 text-sm">{experiment.description}</p>

            <div className="flex items-center space-x-4 mb-4 text-sm">
              <div className="flex items-center space-x-1 text-white/70">
                <Clock className="w-4 h-4" />
                <span>{experiment.duration}</span>
              </div>
              <div className="flex items-center space-x-1 text-white/70">
                <TrendingUp className="w-4 h-4" />
                <span>{experiment.trials} trials</span>
              </div>
            </div>

            <button
              onClick={() => startExperiment(experiment.type)}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Start Experiment</span>
            </button>
          </div>
        ))}
      </div>

      {experiments.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Your Experiment History</h2>
          <div className="space-y-3">
            {experiments.map((exp) => {
              const config = EXPERIMENT_TYPES.find((e) => e.type === exp.experiment_type);
              return (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{config?.icon}</div>
                    <div>
                      <div className="text-white font-medium">{config?.name}</div>
                      <div className="text-sm text-cyan-200">
                        {new Date(exp.started_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      exp.status === 'completed'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {exp.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
