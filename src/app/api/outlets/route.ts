import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const outlets = await prisma.outlet.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(outlets);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch outlets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { latitude, longitude, userName } = await request.json();

    const outlet = await prisma.outlet.create({
      data: {
        latitude,
        longitude,
        userId: session.user.id!,
        userName,
      },
    });

    return NextResponse.json(outlet);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create outlet' }, { status: 500 });
  }
} 