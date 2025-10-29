'use client';

import { RotateCw, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RefreshIndicatorProps {
  loading: boolean;
  lastUpdated: Date | null;
  onRefresh: () => void;
}

export function RefreshIndicator({ loading, lastUpdated, onRefresh }: RefreshIndicatorProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-100 rounded-xl border-2 border-teal-200 shadow-md">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Timer className="h-5 w-5 text-teal-600" />
          <span className="text-sm text-teal-900 font-semibold">
            Last updated: {lastUpdated ? formatTime(lastUpdated) : 'N/A'}
          </span>
        </div>
        <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300 font-semibold">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>Live</span>
          </div>
        </Badge>
      </div>
      
      <Button
        onClick={onRefresh}
        disabled={loading}
        variant="outline"
        size="sm"
        className="bg-white hover:bg-teal-50 border-teal-300 text-teal-800 font-semibold shadow-sm"
      >
        <RotateCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Updating...' : 'Refresh'}
      </Button>
    </div>
  );
}