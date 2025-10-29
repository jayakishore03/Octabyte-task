'use client';

import React from 'react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { SectorSummary } from '@/types/portfolio';
import { formatCurrency, formatPercent } from '@/lib/portfolio-utils';

interface StockTableProps {
  sectors: SectorSummary[];
}

export function StockTable({ sectors }: StockTableProps) {
  const [expandedSectors, setExpandedSectors] = useState<Set<string>>(
    new Set(sectors.map(s => s.sector))
  );

  const toggleSector = (sector: string) => {
    const newExpanded = new Set(expandedSectors);
    if (newExpanded.has(sector)) {
      newExpanded.delete(sector);
    } else {
      newExpanded.add(sector);
    }
    setExpandedSectors(newExpanded);
  };

  const sectorColors = {
    Technology: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    Banking: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    FMCG: 'bg-amber-100 text-amber-800 border-amber-300',
    Pharmaceuticals: 'bg-violet-100 text-violet-800 border-violet-300',
    Automotive: 'bg-rose-100 text-rose-800 border-rose-300',
    Energy: 'bg-orange-100 text-orange-800 border-orange-300',
    Metals: 'bg-slate-100 text-slate-800 border-slate-300',
  };

  return (
    <Card className="bg-white border-teal-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-teal-900">
          Portfolio Holdings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-teal-50 to-cyan-50">
                <TableHead className="font-bold text-teal-800">Stock</TableHead>
                <TableHead className="font-bold text-teal-800">Qty</TableHead>
                <TableHead className="font-bold text-teal-800">Avg Price</TableHead>
                <TableHead className="font-bold text-teal-800">CMP</TableHead>
                <TableHead className="font-bold text-teal-800">Change</TableHead>
                <TableHead className="font-bold text-teal-800">Market Value</TableHead>
                <TableHead className="font-bold text-teal-800">P&L</TableHead>
                <TableHead className="font-bold text-teal-800">P/E</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectors.map((sector) => (
                <React.Fragment key={sector.sector}>
                  <TableRow className="bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 border-t-2 border-teal-200">
                    <TableCell colSpan={8}>
                      <Button
                        variant="ghost"
                        onClick={() => toggleSector(sector.sector)}
                        className="flex items-center space-x-3 p-0 h-auto font-bold text-teal-900"
                      >
                        {expandedSectors.has(sector.sector) ? (
                          <ChevronDown className="h-5 w-5" />
                        ) : (
                          <ChevronRight className="h-5 w-5" />
                        )}
                        <Badge 
                          variant="outline" 
                          className={`${sectorColors[sector.sector as keyof typeof sectorColors] || 'bg-slate-100 text-slate-800'} font-semibold px-3 py-1`}
                        >
                          {sector.sector}
                        </Badge>
                        <span className="text-sm text-slate-700 font-medium">
                          {formatCurrency(sector.totalValue)} • {formatPercent(sector.totalGainLossPercent)}
                        </span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedSectors.has(sector.sector) &&
                    sector.stocks.map((stock) => {
                      const isPositive = (stock.gainLoss || 0) >= 0;
                      const isPricePositive = (stock.change || 0) >= 0;
                      
                      return (
                        <TableRow 
                          key={stock.symbol} 
                          className="hover:bg-teal-50/50 transition-colors"
                        >
                          <TableCell>
                            <div>
                              <div className="font-semibold text-slate-900">{stock.name}</div>
                              <div className="text-sm text-slate-600 font-medium">{stock.symbol}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-slate-800 font-medium">{stock.quantity}</TableCell>
                          <TableCell className="text-slate-800 font-medium">
                            {formatCurrency(stock.avgPrice)}
                          </TableCell>
                          <TableCell className="text-slate-800 font-medium">
                            {stock.currentPrice ? formatCurrency(stock.currentPrice) : '-'}
                          </TableCell>
                          <TableCell>
                            {stock.change !== undefined ? (
                              <div className={`flex items-center space-x-1 ${
                                isPricePositive ? 'text-emerald-600' : 'text-rose-600'
                              }`}>
                                {isPricePositive ? (
                                  <ArrowUpRight className="h-4 w-4" />
                                ) : (
                                  <ArrowDownRight className="h-4 w-4" />
                                )}
                                <span className="text-sm font-semibold">
                                  {formatPercent(stock.changePercent || 0)}
                                </span>
                              </div>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell className="font-bold text-slate-900">
                            {stock.marketValue ? formatCurrency(stock.marketValue) : '-'}
                          </TableCell>
                          <TableCell>
                            {stock.gainLoss !== undefined ? (
                              <div className={`${
                                isPositive ? 'text-emerald-600' : 'text-rose-600'
                              }`}>
                                <div className="font-bold">
                                  {formatCurrency(stock.gainLoss)}
                                </div>
                                <div className="text-sm font-semibold">
                                  {formatPercent(stock.gainLossPercent || 0)}
                                </div>
                              </div>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell className="text-slate-800 font-medium">
                            {stock.peRatio ? stock.peRatio.toFixed(1) : '-'}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}