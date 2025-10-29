'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Wallet, Target } from 'lucide-react';
import { PortfolioSummary } from '@/types/portfolio';
import { formatCurrency, formatPercent } from '@/lib/portfolio-utils';

interface PortfolioSummaryProps {
  summary: PortfolioSummary;
}

export function PortfolioSummaryComponent({ summary }: PortfolioSummaryProps) {
  const isPositive = summary.totalGainLoss >= 0;
  const isDayPositive = summary.dayChange >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-teal-50 to-cyan-100 border-teal-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-teal-800">
            Total Portfolio Value
          </CardTitle>
          <div className="p-2 bg-teal-500 rounded-lg">
            <Wallet className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-teal-900">
            {formatCurrency(summary.totalValue)}
          </div>
          <p className="text-xs text-teal-600 mt-1 font-medium">
            Investment: {formatCurrency(summary.totalInvestment)}
          </p>
        </CardContent>
      </Card>

      <Card className={`bg-gradient-to-br shadow-lg hover:shadow-xl transition-shadow ${
        isPositive 
          ? 'from-emerald-50 to-emerald-100 border-emerald-200' 
          : 'from-rose-50 to-rose-100 border-rose-200'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-semibold ${
            isPositive ? 'text-emerald-800' : 'text-rose-800'
          }`}>
            Total Gain/Loss
          </CardTitle>
          <div className={`p-2 rounded-lg ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`}>
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4 text-white" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-white" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            isPositive ? 'text-emerald-900' : 'text-rose-900'
          }`}>
            {formatCurrency(summary.totalGainLoss)}
          </div>
          <p className={`text-xs mt-1 font-medium ${
            isPositive ? 'text-emerald-600' : 'text-rose-600'
          }`}>
            {formatPercent(summary.totalGainLossPercent)}
          </p>
        </CardContent>
      </Card>

      <Card className={`bg-gradient-to-br shadow-lg hover:shadow-xl transition-shadow ${
        isDayPositive 
          ? 'from-cyan-50 to-blue-100 border-cyan-200' 
          : 'from-amber-50 to-orange-100 border-amber-200'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-semibold ${
            isDayPositive ? 'text-cyan-800' : 'text-amber-800'
          }`}>
            Day Change
          </CardTitle>
          <div className={`p-2 rounded-lg ${isDayPositive ? 'bg-cyan-500' : 'bg-amber-500'}`}>
            {isDayPositive ? (
              <ArrowUpRight className="h-4 w-4 text-white" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-white" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            isDayPositive ? 'text-cyan-900' : 'text-amber-900'
          }`}>
            {formatCurrency(summary.dayChange)}
          </div>
          <p className={`text-xs mt-1 font-medium ${
            isDayPositive ? 'text-cyan-600' : 'text-amber-600'
          }`}>
            {formatPercent(summary.dayChangePercent)}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-violet-50 to-purple-100 border-violet-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-violet-800">
            Portfolio Diversity
          </CardTitle>
          <div className="p-2 bg-violet-500 rounded-lg">
            <Target className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-violet-900">
            {Math.round((summary.totalValue / summary.totalInvestment) * 100) || 0}%
          </div>
          <p className="text-xs text-violet-600 mt-1 font-medium">
            Return Ratio
          </p>
        </CardContent>
      </Card>
    </div>
  );
}