import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookies) {
          cookies.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({ request });

          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims.sub) {
    const redirect = NextResponse.redirect(new URL("/login", request.url));

    response.cookies.getAll().forEach((cookie) => {
      redirect.cookies.set(cookie);
    });

    redirect.headers.set("Cache-Control", "private, no-store");

    return redirect;
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/talent/:path*",
    "/pipeline/:path*",
    "/finance/:path*",
    "/deal/:path*",
  ],
};
