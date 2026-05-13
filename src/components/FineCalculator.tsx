import { useState } from 'react';
import trafficData from '../data/traffic_laws.json';
import { Calculator, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function FineCalculator({ compact = false }: { compact?: boolean }) {
  const [violationType, setViolationType] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (!violationType || !selectedState || !vehicleType) return;

    const matchedLaw = trafficData.laws.find(law => law.id === violationType);
    if (matchedLaw) {
      setResult(matchedLaw);
    }
  };

  return (
    <div className={compact ? "" : "bg-white dark:bg-slate-800 p-2"}>
      {!compact && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="font-bold text-emerald-900 dark:text-white">Fine Calculator</h3>
            <p className="text-xs text-slate-500">Estimate traffic penalties</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1.5 ">Violation Type</label>
          <select 
            value={violationType}
            onChange={(e) => setViolationType(e.target.value)}
            className="w-full bg-emerald-50/50 dark:bg-slate-900 border-b-2 border-emerald-100 dark:border-emerald-900 py-2 text-sm outline-none focus:border-emerald-500 dark:text-white transition-colors"
          >
            <option value="">Select a violation</option>
            {trafficData.laws.map(law => (
              <option key={law.id} value={law.id}>{law.violation}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1.5">State</label>
            <select 
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-emerald-50/50 dark:bg-slate-900 border-b-2 border-emerald-100 dark:border-emerald-900 py-2 text-sm outline-none focus:border-emerald-500 dark:text-white transition-colors"
            >
              <option value="">Select State</option>
              {trafficData.states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1.5">Vehicle</label>
            <select 
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full bg-emerald-50/50 dark:bg-slate-900 border-b-2 border-emerald-100 dark:border-emerald-900 py-2 text-sm outline-none focus:border-emerald-500 dark:text-white transition-colors"
            >
              <option value="">Vehicle Type</option>
              {trafficData.vehicle_types.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={!violationType || !selectedState || !vehicleType}
          className="w-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-100 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-200 transition-all disabled:opacity-50 mt-2"
        >
          {compact ? "Calculate" : "Evaluate Penalties"}
        </button>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900"
        >
          <div className="flex items-start gap-3 mb-3">
            <AlertCircle className="text-orange-600 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-[10px] text-orange-800 dark:text-orange-300 font-bold uppercase tracking-wider mb-1">Estimate</p>
              <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">{result.fine}</p>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">SEC: {result.section}</p>
        </motion.div>
      )}
    </div>
  );
}
