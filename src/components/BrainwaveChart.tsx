import { BRAINWAVE_INFO } from '../utils/brainwave';

interface BrainwaveChartProps {
  data: any[];
}

export function BrainwaveChart({ data }: BrainwaveChartProps) {
  const latestData = data[0] || {
    delta: 0.15,
    theta: 0.20,
    alpha: 0.35,
    beta: 0.25,
    gamma: 0.05,
  };

  const bands = [
    { name: 'delta', value: latestData.delta || 0 },
    { name: 'theta', value: latestData.theta || 0 },
    { name: 'alpha', value: latestData.alpha || 0 },
    { name: 'beta', value: latestData.beta || 0 },
    { name: 'gamma', value: latestData.gamma || 0 },
  ];

  const maxValue = Math.max(...bands.map((b) => b.value), 0.4);

  return (
    <div className="space-y-4">
      {bands.map((band) => {
        const info = BRAINWAVE_INFO[band.name as keyof typeof BRAINWAVE_INFO];
        const percentage = (band.value / maxValue) * 100;

        return (
          <div key={band.name}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white capitalize">{band.name}</span>
                <span className="text-xs text-cyan-200">{info.range}</span>
              </div>
              <span className="text-sm text-white">{(band.value * 100).toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${info.color} transition-all duration-500 rounded-full`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
