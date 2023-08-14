
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    if (request.nextUrl.href.includes('/newdawn/_next')) {
        return NextResponse.rewrite(
            request.nextUrl.href.replace('/newdawn/_next', '/_next'),
        )
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/newdawn/:path*',
};

