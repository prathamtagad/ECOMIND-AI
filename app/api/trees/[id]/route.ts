import { NextResponse } from 'next/server';
import { getTreeById } from '@/lib/data/trees';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tree = getTreeById(id);
  if (!tree) return NextResponse.json({ error: 'Tree not found' }, { status: 404 });
  return NextResponse.json(tree);
}
