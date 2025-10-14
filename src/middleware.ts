import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { LINKS, STATIC_KEYS } from './lib/constant';

const publicRoutes = ['/login', '/sign-up'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const token = (await cookies()).get(STATIC_KEYS.TOKEN)?.value;

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL(`/${LINKS.LOGIN}`, req.nextUrl));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL(`/${LINKS.DASHBOARD}`, req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
