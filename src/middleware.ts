import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import createMiddleware from 'next-intl/middleware';
import { getLocale } from 'next-intl/server';
import { LINKS, STATIC_KEYS } from './lib/constant';
import { DEFAULT_LOCALE, LOCALES } from './lib/constant';

const publicRoutes = ['/login', '/signup'];

const i18nMiddleware = (req: NextRequest) => {
  return createMiddleware({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  })(req);
};

async function authMiddleware(req: NextRequest, response: NextResponse) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.some((p) => path.endsWith(p));
  const token = (await cookies()).get(STATIC_KEYS.TOKEN)?.value;
  const locale = await getLocale();

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL(`/${locale}/${LINKS.WEB.LOGIN}`, req.nextUrl));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL(`/${locale}/${LINKS.WEB.DASHBOARD}`, req.nextUrl));
  }

  return response;
}

export default async function middleware(request: NextRequest) {
  const response = i18nMiddleware(request);

  if (response && !response.ok) {
    return response;
  }

  return await authMiddleware(request, response);
}

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

export const config = {
  // Match only internationalized pathnames
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
