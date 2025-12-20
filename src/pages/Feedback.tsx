import { useState, useEffect } from 'react';
import { MessageSquare, Star, ThumbsUp, Activity, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
// ...existing code...

const EMOTIONS = [
  { value: 'anxious', label: 'Anxious', emoji: '😰' },
  { value: 'stressed', label: 'Stressed', emoji: '😤' },
  { value: 'neutral', label: 'Neutral', emoji: '😐' },
  { value: 'calm', label: 'Calm', emoji: '😌' },
  { value: 'relaxed', label: 'Relaxed', emoji: '😊' },
  { value: 'focused', label: 'Focused', emoji: '🎯' },
  { value: 'energized', label: 'Energized', emoji: '⚡' },
  { value: 'sleepy', label: 'Sleepy', emoji: '😴' },
];

export function Feedback() {
  const { user } = useAuth();
  const [recentSessions, setRecentSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [effectiveness, setEffectiveness] = useState(0);
  const [emotionBefore, setEmotionBefore] = useState('');
  const [emotionAfter, setEmotionAfter] = useState('');
  const [focusLevel, setFocusLevel] = useState(5);
  const [calmnessLevel, setCalmnessLevel] = useState(5);
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadRecentSessions();
  }, [user]);

  const loadRecentSessions = async () => {
    if (!user) return;

    try {
      // Mock sessions - replace with actual API call
      const sessions = [
        {
          id: '1',
          user_id: user.email,
          status: 'completed',
          target_state: 'focus',
          duration: 600,
          completed_at: new Date().toISOString(),
          generated_music: [{ id: 'm1', parameters: {} }],
        },
      ];

      const sessionsWithFeedback = sessions.map((session) => ({
        ...session,
        has_feedback: false,
      }));

      setRecentSessions(sessionsWithFeedback);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!user || !selectedSession) return;

    if (!rating || !effectiveness || !emotionBefore || !emotionAfter) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const musicId = selectedSession.generated_music?.[0]?.id;

      // Mock feedback submission - replace with actual API call
      console.log('Feedback submitted:', {
        user_id: user.email,
        session_id: selectedSession.id,
        music_id: musicId,
        rating,
        effectiveness,
        emotion_before: emotionBefore,
        emotion_after: emotionAfter,
        focus_level: focusLevel,
        calmness_level: calmnessLevel,
        comments,
      });

      alert('Feedback submitted successfully!');
      resetForm();
      loadRecentSessions();
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedSession(null);
    setRating(0);
    setEffectiveness(0);
    setEmotionBefore('');
    setEmotionAfter('');
    setFocusLevel(5);
    setCalmnessLevel(5);
    setComments('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Training Feedback</h1>
        <p className="text-cyan-200">Help improve the AI by sharing your experience</p>
      </div>

      {!selectedSession ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Sessions</h2>
          {recentSessions.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center">
              <Activity className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <p className="text-white mb-2">No completed sessions yet</p>
              <p className="text-sm text-cyan-200">Complete a training session to provide feedback</p>
            </div>
          ) : (
            recentSessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setSelectedSession(session)}
                disabled={session.has_feedback}
                className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all ${
                  session.has_feedback
                    ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium capitalize">
                      {session.target_state} Training
                    </div>
                    <div className="text-sm text-cyan-200">
                      {new Date(session.completed_at).toLocaleString()}
                    </div>
                    <div className="text-sm text-white/60">{session.duration}s duration</div>
                  </div>
                </div>
                <div>
                  {session.has_feedback ? (
                    <span className="flex items-center space-x-2 text-green-400 text-sm">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Feedback Submitted</span>
                    </span>
                  ) : (
                    <span className="text-cyan-400">Provide Feedback →</span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white capitalize">
                {selectedSession.target_state} Session
              </h3>
              <button onClick={resetForm} className="text-cyan-400 hover:text-cyan-300">
                Cancel
              </button>
            </div>
            <p className="text-cyan-200">
              {new Date(selectedSession.completed_at).toLocaleString()} • {selectedSession.duration}s
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-cyan-100 mb-3">
                Overall Rating <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setRating(value)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        value <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-white/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-100 mb-3">
                Effectiveness <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setEffectiveness(value)}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      value <= effectiveness
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-cyan-100 mb-3">
                  Emotion Before <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {EMOTIONS.map((emotion) => (
                    <button
                      key={emotion.value}
                      onClick={() => setEmotionBefore(emotion.value)}
                      className={`p-3 rounded-xl border transition-all text-left ${
                        emotionBefore === emotion.value
                          ? 'bg-cyan-500/20 border-cyan-500'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xl mr-2">{emotion.emoji}</span>
                      <span className="text-sm text-white">{emotion.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-100 mb-3">
                  Emotion After <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {EMOTIONS.map((emotion) => (
                    <button
                      key={emotion.value}
                      onClick={() => setEmotionAfter(emotion.value)}
                      className={`p-3 rounded-xl border transition-all text-left ${
                        emotionAfter === emotion.value
                          ? 'bg-purple-500/20 border-purple-500'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-xl mr-2">{emotion.emoji}</span>
                      <span className="text-sm text-white">{emotion.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-cyan-100 mb-3">
                  Focus Level: {focusLevel}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={focusLevel}
                  onChange={(e) => setFocusLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-100 mb-3">
                  Calmness Level: {calmnessLevel}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={calmnessLevel}
                  onChange={(e) => setCalmnessLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-100 mb-3">
                Additional Comments
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Share any thoughts about your experience..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition resize-none"
                rows={4}
              />
            </div>

            <button
              onClick={handleSubmitFeedback}
              disabled={submitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
