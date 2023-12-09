// import { NextRequest, NextResponse } from "next/server"
// import { getToken } from "next-auth/jwt"

// export default function middleware(request: NextRequest) {
//   console.log("Middleware")
//   const token = request.cookies.get("next-auth.session-token")?.value

//   const signInURL = new URL("/auth", request.url)
//   const dashboardURL = new URL("/dashboard", request.url)

//   if (!token) {

//     if (request.nextUrl.pathname == "/auth") {

//       return NextResponse.next()
//     }
//     return NextResponse.redirect(signInURL)
//   }

//   if(request.nextUrl.pathname == "/auth"){
//     return NextResponse.redirect(dashboardURL)
//   }
// }

// export const config = {
//   matcher: ["/auth", "/dashboard/:path*", "/products/:path*", "/users/:path*"],
// }
