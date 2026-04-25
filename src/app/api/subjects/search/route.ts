import { NextRequest, NextResponse } from 'next/server'
import { searchModules } from '@/lib/api'

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? ''
  if (q.length < 2) return NextResponse.json([])
  const results = await searchModules(q)
  return NextResponse.json(results)
}
