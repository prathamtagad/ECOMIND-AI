'use client';

import { useState, useCallback } from 'react';
import PageHeader from '@/components/layout/page-header';
import { Brain, Upload, Loader2, CheckCircle, AlertTriangle, XCircle, Shield, Sparkles } from 'lucide-react';
import { AIAnalysisResult } from '@/lib/types';

const classificationConfig: Record<string, { color: string; bg: string; icon: typeof CheckCircle; label: string }> = {
  healthy: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle, label: 'Healthy' },
  stressed: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', icon: AlertTriangle, label: 'Stressed' },
  diseased: { color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', icon: XCircle, label: 'Diseased' },
  critical: { color: 'text-red-500', bg: 'bg-red-600/10 border-red-600/20', icon: Shield, label: 'Critical' },
};

export default function AIAnalysisPage() {
  const [dragActive, setDragActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    setAnalyzing(true);
    setResult(null);
    setProgress(0);

    // Simulate progressive AI analysis
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) { clearInterval(interval); return 90; }
        return p + Math.random() * 15;
      });
    }, 200);

    fetch('/api/ai/analyze', { method: 'POST' })
      .then(r => r.json())
      .then(data => {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setResult(data);
          setAnalyzing(false);
        }, 500);
      });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  }, [handleFile]);

  const reset = () => { setResult(null); setPreview(null); setProgress(0); };

  const config = result ? classificationConfig[result.classification] : null;
  const ResultIcon = config?.icon || CheckCircle;

  return (
    <div>
      <PageHeader title="AI Tree Health Analysis" subtitle="Upload a tree or leaf image for instant AI-powered health assessment">
        {result && (
          <button onClick={reset} className="px-4 py-2 bg-surface-300/50 border border-primary-800/20 rounded-xl text-sm text-gray-300 hover:border-primary-600/30 transition-all">
            New Analysis
          </button>
        )}
      </PageHeader>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload Area */}
        <div className="glass-card p-6 animate-slide-up stagger-1">
          <div className="flex items-center gap-2 mb-4">
            <Brain size={18} className="text-cyan-400" />
            <h3 className="font-semibold text-white">Image Input</h3>
          </div>

          {!preview ? (
            <label
              onDragOver={e => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center h-72 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                dragActive ? 'border-primary-400 bg-primary-600/5' : 'border-primary-800/20 hover:border-primary-600/30'
              }`}
            >
              <Upload size={40} className="text-gray-600 mb-4" />
              <p className="text-sm text-gray-400 mb-1">Drag & drop a tree/leaf image</p>
              <p className="text-xs text-gray-600">or click to browse</p>
              <p className="text-[10px] text-gray-700 mt-3">Supports JPG, PNG, WebP</p>
              <input type="file" accept="image/*" className="hidden" onChange={handleInput} />
            </label>
          ) : (
            <div className="relative h-72 rounded-2xl overflow-hidden bg-surface-300">
              <img src={preview} alt="Uploaded tree" className="w-full h-full object-cover" />
              {analyzing && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-2 border-primary-500/30 rounded-full" />
                    <div className="absolute inset-0 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
                    <Sparkles size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-400" />
                  </div>
                  <p className="text-sm text-white font-medium mb-2">Analyzing with AI...</p>
                  <div className="w-48 h-1.5 bg-surface-300 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{Math.round(progress)}% complete</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="glass-card p-6 animate-slide-up stagger-2">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-primary-400" />
            <h3 className="font-semibold text-white">Analysis Results</h3>
          </div>

          {!result && !analyzing && (
            <div className="flex flex-col items-center justify-center h-72 text-center">
              <Brain size={48} className="text-gray-700 mb-4" />
              <p className="text-sm text-gray-500">Upload an image to begin analysis</p>
              <p className="text-xs text-gray-600 mt-1">Our AI will classify tree health and provide recommendations</p>
            </div>
          )}

          {analyzing && !result && (
            <div className="flex flex-col items-center justify-center h-72">
              <Loader2 size={32} className="text-primary-400 animate-spin mb-4" />
              <p className="text-sm text-gray-400">Processing image through AI model...</p>
            </div>
          )}

          {result && config && (
            <div className="space-y-5 animate-fade-in">
              {/* Classification */}
              <div className={`p-4 rounded-xl border ${config.bg} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <ResultIcon size={28} className={config.color} />
                  <div>
                    <p className="text-xs text-gray-500">Classification</p>
                    <p className={`text-xl font-bold ${config.color}`}>{config.label}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Confidence</p>
                  <p className="text-2xl font-black text-white">{result.confidence}%</p>
                </div>
              </div>

              {/* Confidence bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Confidence Level</span>
                  <span>{result.confidence}%</span>
                </div>
                <div className="h-2 bg-surface-300 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${
                    result.confidence > 85 ? 'bg-emerald-500' : result.confidence > 70 ? 'bg-amber-500' : 'bg-red-500'
                  }`} style={{ width: `${result.confidence}%` }} />
                </div>
              </div>

              {/* Findings */}
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">Key Findings</p>
                <div className="space-y-2">
                  {result.findings.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-surface-300/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 shrink-0" />
                      <p className="text-sm text-gray-300">{f}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendation */}
              <div className="p-4 rounded-xl bg-primary-600/5 border border-primary-600/15">
                <p className="text-xs text-primary-400 font-medium mb-1">AI Recommendation</p>
                <p className="text-sm text-gray-300 leading-relaxed">{result.recommendation}</p>
              </div>

              <p className="text-[10px] text-gray-600 text-center">Processed in {result.processingTime}ms · Model: EcoMind-Vision v2.1</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
