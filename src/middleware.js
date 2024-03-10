import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/search", "/explore", "/sign-in", "sign-up"],
  afterAuth(auth, req, evt) {
    console.log(req.url);
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      console.log("triggered history");
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    // If the user is signed in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      console.log("triggered authenticated already");
      return NextResponse.next();
    }
    if (!auth.userId && auth.isPublicRoute) {
      console.log("triggered public");
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
