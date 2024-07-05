'use client'

import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { lusitana } from '@/app/ui/fonts';

export interface Revenue {
    month: string;
    revenue: number;
  }

export default function BarChart({ revenue }: { revenue: Revenue[] }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const newChart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: revenue.map((item: Revenue) => item.month),
          datasets: [{
            label: 'Revenue',
            data: revenue.map((item: Revenue) => item.revenue),
          }]
        }
      });

      return () => newChart.destroy();
    }
  }, [revenue]);

  return (
    <>
      <div className="w-full md:col-span-4">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Recent Revenue
        </h2>
        <div className={`relative w-full overflow-hidden md:col-span-4`}>
      <div className='rounded-xl bg-gray-50 p-4'>
      <canvas ref={chartRef}></canvas>
      </div>
      </div>
      </div>
      
      
    </>
  );
}