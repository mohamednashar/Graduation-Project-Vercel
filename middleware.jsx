export { default } from "next-auth/middleware"

export const config = { matcher: ["/main", "/quizzes/:path*","/assignments/:path*","/posts/:path*"] }