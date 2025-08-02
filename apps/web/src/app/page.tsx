"use client"

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { useFeatureFlags } from "@feature-flag/gatekeeper"
import { useUser } from "@/components/providers"

const tableData = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    price: "$150.25",
    change: "+2.5%",
    marketCap: "$2.4T",
    volume: "45.2M"
  },
  {
    symbol: "GOOGL",
    company: "Alphabet Inc.",
    price: "$2,750.80",
    change: "-1.2%",
    marketCap: "$1.8T",
    volume: "28.7M"
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corp.",
    price: "$420.15",
    change: "+0.8%",
    marketCap: "$3.1T",
    volume: "32.1M"
  }
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { flags, isLoading, isError } = useFeatureFlags({
    flags: ['showExtendedColumns']
  });
  const { toggleUser, hasFlag } = useUser();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-sm text-red-600">Error loading feature flags</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-[28px] font-semibold text-black mb-8">Feature Flags</h1>
          
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="text-sm text-gray-600">Flag OFF</span>
            <Switch 
              checked={hasFlag}
              onCheckedChange={toggleUser}
            />
            <span className="text-sm text-gray-600">Flag ON</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className="text-sm font-medium text-gray-900 transition-all duration-300">Symbol</TableHead>
                <TableHead className="text-sm font-medium text-gray-900 transition-all duration-300">Company</TableHead>
                <TableHead className="text-sm font-medium text-gray-900 transition-all duration-300">Price</TableHead>
                <TableHead className={`text-sm font-medium text-gray-900 transition-all duration-300 ${
                  flags.showExtendedColumns 
                    ? 'opacity-100 max-w-none w-auto' 
                    : 'opacity-0 max-w-0 w-0 p-0 overflow-hidden'
                }`}>
                  Market Cap
                </TableHead>
                <TableHead className={`text-sm font-medium text-gray-900 transition-all duration-300 ${
                  flags.showExtendedColumns 
                    ? 'opacity-100 max-w-none w-auto' 
                    : 'opacity-0 max-w-0 w-0 p-0 overflow-hidden'
                }`}>
                  Volume
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((stock) => (
                <TableRow key={stock.symbol} className="border-gray-200">
                  <TableCell className="text-sm font-medium text-black transition-all duration-300">{stock.symbol}</TableCell>
                  <TableCell className="text-sm text-gray-700 transition-all duration-300">{stock.company}</TableCell>
                  <TableCell className={`text-sm transition-all duration-300 ${
                    stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.price}
                  </TableCell>
                  <TableCell className={`text-sm text-gray-700 transition-all duration-300 ${
                    flags.showExtendedColumns 
                      ? 'opacity-100 max-w-none w-auto' 
                      : 'opacity-0 max-w-0 w-0 p-0 overflow-hidden'
                  }`}>
                    {stock.marketCap}
                  </TableCell>
                  <TableCell className={`text-sm text-gray-700 transition-all duration-300 ${
                    flags.showExtendedColumns 
                      ? 'opacity-100 max-w-none w-auto' 
                      : 'opacity-0 max-w-0 w-0 p-0 overflow-hidden'
                  }`}>
                    {stock.volume}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
