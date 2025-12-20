import { useEffect, useState } from 'react';
import { Activity, TrendingUp, Music, Brain, Zap, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
// ...existing code...
import { BrainwaveChart } from '../components/BrainwaveChart';
import { StatsCard } from '../components/StatsCard';

interface SessionStats {
  totalSessions: number;
  totalDuration: number;
  averageRating: number;
  improvementTrend: number;
}

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<SessionStats>({
    totalSessions: 0,
    totalDuration: 0,
    averageRating: 0,
    improvementTrend: 0,
  });
  const [recentBrainwaves, setRecentBrainwaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      // Mock data - replace with actual API calls to backend when ready
      const sessions = [
        { id: '1', duration: 600, started_at: new Date().toISOString() },
        { id: '2', duration: 900, started_at: new Date(Date.now() - 86400000).toISOString() },
      ];
      
      const feedback = [
        { rating: 4, effectiveness: 0.8 },
        { rating: 5, effectiveness: 0.9 },
      ];
      
      const eegData = [
        { delta: 0.2, theta: 0.3, alpha: 0.4, beta: 0.5, gamma: 0.1, timestamp: new Date().toISOString() },
      ];

      const totalDuration = sessions?.reduce((acc, s) => acc + (s.duration || 0), 0) || 0;
      const avgRating = feedback?.length
        ? feedback.reduce((acc, f) => acc + (f.rating || 0), 0) / feedback.length
        : 0;

      setStats({
        totalSessions: sessions?.length || 0,
        totalDuration,
        averageRating: avgRating,
        improvementTrend: Math.random() * 20 + 5,
      });

      setRecentBrainwaves(eegData || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Neural Dashboard</h1>
        <p className="text-cyan-200">Track your brain training progress and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={Activity}
          label="Total Sessions"
          value={stats.totalSessions.toString()}
          trend={stats.improvementTrend}
          color="from-cyan-500 to-blue-500"
        />
        <StatsCard
          icon={Clock}
          label="Training Time"
          value={`${Math.floor(stats.totalDuration / 60)}m`}
          color="from-blue-500 to-indigo-500"
        />
        <StatsCard
          icon={TrendingUp}
          label="Avg Rating"
          value={stats.averageRating.toFixed(1)}
          trend={stats.improvementTrend}
          color="from-green-500 to-emerald-500"
        />
        <StatsCard
          icon={Zap}
          label="Improvement"
          value={`${stats.improvementTrend.toFixed(0)}%`}
          trend={stats.improvementTrend}
          color="from-yellow-500 to-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Brainwave Activity</h2>
              <p className="text-sm text-cyan-200">Recent measurements</p>
            </div>
          </div>
          <BrainwaveChart data={recentBrainwaves} />
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Quick Start</h2>
              <p className="text-sm text-cyan-200">Begin your training session</p>
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries({
              focus: { icon: '🎯', desc: 'Enhance concentration' },
              calm: { icon: '🧘', desc: 'Reduce stress & anxiety' },
              energize: { icon: '⚡', desc: 'Boost energy levels' },
              sleep: { icon: '😴', desc: 'Prepare for deep sleep' },
            }).map(([state, config]) => (
              <button
                key={state}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{config.icon}</span>
                  <div className="text-left">
                    <div className="text-white font-medium capitalize">{state}</div>
                    <div className="text-sm text-cyan-200">{config.desc}</div>
                  </div>
                </div>
                <div className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        {stats.totalSessions === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-cyan-400" />
            </div>
            <p className="text-white/70 mb-2">No sessions yet</p>
            <p className="text-sm text-cyan-200">Start your first training session to see activity here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {Array.from({ length: Math.min(5, stats.totalSessions) }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Training Session</div>
                    <div className="text-sm text-cyan-200">
                      {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{Math.floor(Math.random() * 20 + 10)}m</div>
                  <div className="text-sm text-green-400">Completed</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
