import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const cookieStore = await cookies()
    const cookie = cookieStore.has("session");
    if (request.nextUrl.pathname.startsWith('/dashboard') && !cookie) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    return NextResponse.next();
}