"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Validation schema
const signupSchema = z.object({
  firstname: z.string().min(2, "First name must be at least 2 characters"),
  lastname: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Please enter a valid phone number"),
  country: z.string().min(2, "Country is required"),
  age: z
    .number({ invalid_type_error: "Age is required" })
    .min(13, "You must be at least 13 years old")
    .max(120, "Enter a valid age"),
  avatar: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  bio: z.string().max(200, "Bio cannot exceed 200 characters").optional(),
  favoriteGenres: z
    .array(z.string())
    .min(1, "Enter at least one favorite genre")
    .optional(),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>_]/,
      "Password must contain at least one symbol"
    ),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export function Signup() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      country: "",
      age: "",
      avatar: "",
      bio: "",
      favoriteGenres: [],
      email: "",
      password: "",
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      // Convert favoriteGenres to array if it's a string
      if (typeof data.favoriteGenres === "string") {
        data.favoriteGenres = data.favoriteGenres
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean);
      }

      const response = await axiosInstance.post("/auth/signup", data);

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      console.log("Signup Success:", response.data);
      router.push("/login");
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-gray-900 relative overflow-hidden py-8">
      <div
        className="floating-shape floating-shape-1 w-72 h-72 bg-linear-to-br from-violet-600/20 to-purple-800/20"
        style={{ top: "5%", left: "3%" }}
      />
      <div
        className="floating-shape floating-shape-2 w-80 h-80 bg-linear-to-br from-indigo-500/15 to-cyan-600/15"
        style={{ bottom: "10%", right: "5%" }}
      />

      <Card className="w-full max-w-4xl mx-4 glass-card animate-fade-in border-0 shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-center items-center bg-linear-to-br from-purple-700 to-fuchsia-600 p-8 m-7 rounded-md">
          <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center mb-6 animate-pulse-glow">
            <svg
              className="w-12 h-12 text-white"
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
          <h2 className="text-3xl font-bold text-white text-center drop-shadow-lg">
            Join the Experience
          </h2>
          <p className="text-white/80 mt-2 text-center">
            Create an account to start your movie adventure
          </p>
          <Button
            variant="link"
            onClick={() => router.push("/login")}
            className="mt-4 text-white/90 hover:text-white font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Already have an account? →
          </Button>
        </div>

        <CardContent className="p-8 flex flex-col justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Form fields remain exactly as your design */}
            {/* Firstname & Lastname */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstname"
                  className="text-white/90 font-medium"
                >
                  First Name
                </Label>
                <Input
                  id="firstname"
                  type="text"
                  placeholder="John"
                  {...register("firstname")}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                />
                {errors.firstname && (
                  <p className="text-red-400 text-sm">
                    {errors.firstname.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastname" className="text-white/90 font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Doe"
                  {...register("lastname")}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                />
                {errors.lastname && (
                  <p className="text-red-400 text-sm">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>
            {/* Phone & Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white/90 font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 890"
                  {...register("phone")}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-white/90 font-medium">
                  Country
                </Label>
                <Input
                  id="country"
                  type="text"
                  placeholder="United States"
                  {...register("country")}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                />
                {errors.country && (
                  <p className="text-red-400 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
            {/* Age & Avatar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-white/90 font-medium">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="28"
                  {...register("age", { valueAsNumber: true })}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                />
                {errors.age && (
                  <p className="text-red-400 text-sm">{errors.age.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar" className="text-white/90 font-medium">
                  Avatar URL
                </Label>
                <Input
                  id="avatar"
                  type="url"
                  placeholder="https://i.pravatar.cc/300"
                  {...register("avatar")}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                />
                {errors.avatar && (
                  <p className="text-red-400 text-sm">
                    {errors.avatar.message}
                  </p>
                )}
              </div>
            </div>
            {/* Bio & Favorite Genres */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white/90 font-medium">
                  Bio
                </Label>
                <Input
                  id="bio"
                  type="text"
                  placeholder="Movie enthusiast from Karachi"
                  {...register("bio")}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                />
                {errors.bio && (
                  <p className="text-red-400 text-sm">{errors.bio.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="favoriteGenres"
                  className="text-white/90 font-medium"
                >
                  Favorite Genres
                </Label>
                <Input
                  id="favoriteGenres"
                  type="text"
                  placeholder="Action, Thriller, Sci-Fi"
                  {...register("favoriteGenres", {
                    setValueAs: (v) =>
                      typeof v === "string"
                        ? v.split(",").map((g) => g.trim())
                        : [],
                  })}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
                />
                {errors.favoriteGenres && (
                  <p className="text-red-400 text-sm">
                    {errors.favoriteGenres.message}
                  </p>
                )}
              </div>
            </div>
            {/* Email & Password */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all duration-300 premium-input"
              />
              {errors.password && (
                <p className="text-red-400 text-sm">
                  {errors.password.message}
                </p>
              )}
              <p className="text-white/50 text-xs pl-1">
                Must be at least 8 characters with a number and symbol
              </p>
            </div>
            {/* Terms */}
            <div className="flex items-start gap-2 w-full pt-2">
              <input
                type="checkbox"
                id="terms"
                {...register("terms")}
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
            {errors.terms && (
              <p className="text-red-400 text-sm">{errors.terms.message}</p>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-linear-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] shimmer-btn border-0 disabled:opacity-50"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
