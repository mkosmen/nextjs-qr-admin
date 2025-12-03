import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getLocale } from 'next-intl/server';
import { LINKS } from './lib/constant';
import { getToken } from './lib/services/token.service';
import { isPublicRoute } from './lib/utils';
import { routing } from './i18n/routing';

const i18nMiddleware = (req: NextRequest) => {
  return createMiddleware(routing)(req);
};

async function authMiddleware(req: NextRequest, response: NextResponse) {
  const path = req.nextUrl.pathname;
  const token = await getToken();
  const locale = await getLocale();
  const isPublic = isPublicRoute(path, locale);

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL(`/${locale}/${LINKS.WEB.LOGIN}`, req.nextUrl));
  }

  if (token && isPublic) {
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

export const config = {
  matcher: [
    /**
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|media|fonts|favicon.ico|favicon.png).*)',
      missing: [
        // Exclude Server Actions
        { type: 'header', key: 'next-action' },
      ],
    },
  ],
};
