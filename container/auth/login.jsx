"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

export function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      alert("Invalid email or password");
    } else {
      router.push("/movies");
    }
  };

  return (
    <div className="min-h-screen w-screen flex justify-center items-center auth-gradient-bg relative overflow-hidden py-8">
      <div
        className="floating-shape floating-shape-1 w-72 h-72 bg-linear-to-br from-violet-600/20 to-purple-800/20"
        style={{ top: "5%", left: "3%" }}
      />
      <div
        className="floating-shape floating-shape-2 w-80 h-80 bg-linear-to-br from-indigo-500/15 to-cyan-600/15"
        style={{ bottom: "10%", right: "5%" }}
      />
      <div
        className="floating-shape floating-shape-3 w-40 h-40 bg-linear-to-br from-fuchsia-600/20 to-pink-700/20"
        style={{ top: "70%", left: "10%" }}
      />
      <div
        className="floating-shape floating-shape-1 w-28 h-28 bg-linear-to-br from-cyan-500/20 to-teal-600/20"
        style={{ top: "15%", right: "12%" }}
      />
      <div
        className="floating-shape floating-shape-2 w-36 h-36 bg-linear-to-br from-purple-500/15 to-indigo-600/15"
        style={{ top: "40%", left: "85%" }}
      />

      <Card className="w-full max-w-lg mx-4 glass-card animate-fade-in border-0 shadow-2xl">
        <CardHeader className="text-center pb-2 space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center animate-pulse-glow shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div>
            <CardTitle className="text-2xl font-bold text-white drop-shadow-lg">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-white/80 mt-1">
              Sign in to continue your movie adventure
            </CardDescription>
          </div>

          <CardAction>
            <Button
              variant="link"
              onClick={() => router.push("/signup")}
              className="cursor-pointer text-white/90 hover:text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              Create Account →
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    {...register("email")}
                    autoComplete="username"
                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-white/90 font-medium"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="text-sm text-white/70 hover:text-white transition-colors duration-300 underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    {...register("password")}
                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-linear-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] shimmer-btn border-0 disabled:opacity-50"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-3 pt-2">
          <div className="flex items-center gap-3 w-full my-1">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/60 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          <Button
            onClick={() => signIn("google", { callbackUrl: "/movies" })}
            variant="outline"
            className="cursor-pointer w-full h-12 bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/50 text-white font-medium transition-all duration-300 hover:scale-[1.02]"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
