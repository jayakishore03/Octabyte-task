'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; // ✅ Direct import, no dynamic
import { SectorSummary } from '@/types/portfolio';
import { formatCurrency, formatPercent } from '@/lib/portfolio-utils';

interface SectorSummaryProps {
  sectors: SectorSummary[];
}

const sectorColors = {
  Technology: 'bg-cyan-500',
  Banking: 'bg-emerald-500',
  FMCG: 'bg-amber-500',
  Pharmaceuticals: 'bg-violet-500',
  Automotive: 'bg-rose-500',
  Energy: 'bg-orange-500',
  Metals: 'bg-slate-500',
};

export function SectorSummaryComponent({ sectors }: SectorSummaryProps) {
  return (
    <Card className="mb-6 bg-gradient-to-br from-white to-teal-50 border-teal-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-teal-900">
          Sector Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sectors.map((sector) => {
            const isPositive = sector.totalGainLoss >= 0;
            const colorClass =
              sectorColors[sector.sector as keyof typeof sectorColors] || 'bg-slate-500';

            return (
              <div key={sector.sector} className="space-y-2 p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${colorClass} shadow-md`} />
                    <span className="font-semibold text-slate-800">{sector.sector}</span>
                    <span className="text-sm text-slate-500 font-medium">
                      ({sector.stocks.length} stocks)
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900">
                      {formatCurrency(sector.totalValue)}
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        isPositive ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {formatPercent(sector.totalGainLossPercent)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={sector.weight} className="flex-1 h-2.5" />
                  <span className="text-sm text-teal-700 font-semibold min-w-[3rem]">
                    {sector.weight.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
