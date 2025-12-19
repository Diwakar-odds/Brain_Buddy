import { BookOpen, Brain, Waves, Info } from 'lucide-react';
import { BRAINWAVE_INFO, TARGET_STATES } from '../utils/brainwave';

export function Research() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Brainwave Research</h1>
        <p className="text-cyan-200">Learn about brainwave states and neural training</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Understanding Brainwaves</h2>
            </div>

            <p className="text-cyan-200 mb-6">
              Brainwaves are electrical impulses in the brain measured in Hertz (Hz). Different
              frequencies correspond to different mental states and activities. Our brain produces
              all frequencies simultaneously, but one usually dominates depending on our current state.
            </p>

            <div className="space-y-6">
              {Object.entries(BRAINWAVE_INFO).map(([band, info]) => (
                <div
                  key={band}
                  className="bg-white/5 border border-white/10 rounded-xl p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white capitalize mb-1">{band} Waves</h3>
                      <p className="text-sm text-cyan-300">{info.range}</p>
                    </div>
                    <div className={`px-3 py-1 bg-gradient-to-r ${info.color} text-white text-sm rounded-full`}>
                      {info.state}
                    </div>
                  </div>
                  <p className="text-cyan-200 text-sm">{info.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Waves className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Brainwave Entrainment</h2>
            </div>

            <p className="text-cyan-200 mb-4">
              Brainwave entrainment is the practice of using external stimuli (like music or light)
              to synchronize brainwave frequencies to a desired state. This phenomenon is based on
              the brain's natural tendency to match external rhythms.
            </p>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
              <h4 className="font-semibold text-white mb-2">How It Works</h4>
              <ul className="space-y-2 text-sm text-cyan-200">
                <li>• Binaural beats present different frequencies to each ear</li>
                <li>• The brain perceives a third frequency (the difference)</li>
                <li>• This can influence brainwave patterns over time</li>
                <li>• Regular practice can help train desired mental states</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Info className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">Training States</h2>
            </div>

            <div className="space-y-4">
              {Object.entries(TARGET_STATES).map(([state, config]) => (
                <div key={state} className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white capitalize">{state}</h4>
                    <div className="text-2xl">
                      {state === 'focus' && '🎯'}
                      {state === 'calm' && '🧘'}
                      {state === 'relax' && '🌊'}
                      {state === 'energize' && '⚡'}
                      {state === 'sleep' && '😴'}
                    </div>
                  </div>
                  <p className="text-sm text-cyan-200 mb-3">{config.description}</p>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="px-2 py-1 bg-white/10 rounded capitalize text-white">
                      {config.primary}
                    </span>
                    <span className="px-2 py-1 bg-white/10 rounded capitalize text-white">
                      {config.secondary}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 backdrop-blur-xl rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Quick Tips</h3>
            <ul className="space-y-3 text-sm text-cyan-100">
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Practice regularly for best results</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Use headphones for optimal entrainment</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Find a quiet environment</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Track your progress over time</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Be patient with results</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Scientific Background</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Neurofeedback</h4>
            <p className="text-sm text-cyan-200">
              Real-time monitoring and feedback of brain activity to help train specific patterns
              and improve mental performance.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Neuroplasticity</h4>
            <p className="text-sm text-cyan-200">
              The brain's ability to reorganize and form new neural connections throughout life,
              enabling learning and adaptation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Frequency Following Response</h4>
            <p className="text-sm text-cyan-200">
              The brain's natural tendency to synchronize its electrical activity with external
              rhythmic stimuli.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
