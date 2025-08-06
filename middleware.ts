import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  console.log("Logged In ===============", req.auth);

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/auth/signin",
    "/auth/signup",
    "/auth/signup/client",
    "/auth/signup/lawyer",
    "/browse",
    "/lawyer",
  ];

  // Auth routes that should redirect if already logged in
  const authRoutes = [
    "/auth/signin",
    "/auth/signup",
    "/auth/signup/client",
    "/auth/signup/lawyer",
  ];

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/booking", "/call"];

  // Admin routes
  const adminRoutes = ["/admin"];

  // Role-specific routes
  const clientRoutes = ["/dashboard/client", "/booking"];
  const lawyerRoutes = ["/dashboard/lawyer"];

  const isPublicRoute = publicRoutes.some(
    (route) =>
      nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/")
  );

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Redirect to signin if accessing protected route without authentication
  if (isProtectedRoute && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/auth/signin?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    // Redirect based on user role
    if (userRole === "LAWYER") {
      return NextResponse.redirect(new URL("/dashboard/lawyer", nextUrl));
    } else if (userRole === "CLIENT") {
      return NextResponse.redirect(new URL("/dashboard/client", nextUrl));
    } else {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  // // Handle dashboard route redirection based on role
  // if (nextUrl.pathname === "/dashboard" && isLoggedIn) {
  //   if (userRole === "LAWYER") {
  //     return NextResponse.redirect(new URL("/dashboard/lawyer", nextUrl));
  //   } else if (userRole === "CLIENT") {
  //     return NextResponse.redirect(new URL("/dashboard/client", nextUrl));
  //   }
  // }

  // Role-based access control
  if (isLoggedIn) {
    // Check client-specific routes
    if (clientRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
      if (userRole !== "CLIENT") {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }
    }

    // Check lawyer-specific routes
    if (lawyerRoutes.some((route) => nextUrl.pathname.startsWith(route))) {
      if (userRole !== "LAWYER") {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }
    }

    // Check admin routes
    if (isAdminRoute && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
