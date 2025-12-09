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

export function Signup() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-screen flex justify-center items-center auth-gradient-bg relative overflow-hidden py-8">
      {/* Floating Decorative Shapes - Dark Theme Colors */}
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

      {/* Main Card */}
      <Card className="w-full max-w-lg mx-4 glass-card animate-fade-in border-0 shadow-2xl">
        <CardHeader className="text-center pb-2 space-y-4">
          {/* Movie Icon */}
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
                  d="M7 4V2m0 2v2m0-2h10M7 4H4a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-3m-10 9l3 3m0 0l3-3m-3 3V8"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>

          <div>
            <CardTitle className="text-2xl font-bold text-white drop-shadow-lg">
              Join the Experience
            </CardTitle>
            <CardDescription className="text-white/80 mt-1">
              Create an account to start your movie adventure
            </CardDescription>
          </div>
          <CardAction>
            <Button
              variant="link"
              onClick={() => router.push("/login")}
              className="cursor-pointer text-white/90 hover:text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              Already have an account? →
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4">
          <form>
            <div className="flex flex-col gap-4">
              {/* Name Row - Two columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="firstname"
                    className="text-white/90 font-medium"
                  >
                    First Name
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="John"
                      required
                      className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="lastname"
                    className="text-white/90 font-medium"
                  >
                    Last Name
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Doe"
                      required
                      className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Row - Two columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/90 font-medium">
                    Phone Number
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 234 567 890"
                      required
                      className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label
                    htmlFor="country"
                    className="text-white/90 font-medium"
                  >
                    Country
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
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <Input
                      id="country"
                      type="text"
                      placeholder="United States"
                      required
                      className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
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
                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90 font-medium">
                  Password
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                  />
                </div>
                <p className="text-white/50 text-xs pl-1">
                  Must be at least 8 characters with a number and symbol
                </p>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-3 pt-2">
          {/* Terms Checkbox */}
          <div className="flex items-start gap-2 w-full">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 w-4 h-4 rounded border-white/30 bg-white/10 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
            />
            <label htmlFor="terms" className="text-white/70 text-sm">
              I agree to the{" "}
              <a
                href="#"
                className="text-white underline hover:text-white/80 transition-colors"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-white underline hover:text-white/80 transition-colors"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Primary Signup Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-linear-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] shimmer-btn border-0"
          >
            Create Account
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 w-full my-1">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/60 text-sm">or continue with</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Google Signup Button */}
          <Button
            variant="outline"
            className="w-full h-12 bg-white/10 hover:bg-white/20 border-white/30 hover:border-white/50 text-white font-medium transition-all duration-300 hover:scale-[1.02]"
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
