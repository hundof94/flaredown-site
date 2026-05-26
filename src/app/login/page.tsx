import Link from "next/link";
import { Flame } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary mb-4">
            <Flame size={22} className="text-white" />
          </div>
          <h1 className="font-display text-h2 text-ink">Welcome back</h1>
          <p className="text-meta text-ink-3 mt-1">Log in to your FlareDown account</p>
        </div>

        <div className="bg-surface rounded-card p-8 border border-ink/8 shadow-sm">
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-ink/15 rounded-lg text-sm font-medium text-ink hover:bg-background hover:border-ink/30 transition-colors mb-6">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-ink/10" />
            </div>
            <div className="relative flex justify-center text-xs text-ink-3 bg-surface px-3">
              or continue with email
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-2 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 bg-background border border-ink/15 rounded-lg text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium text-ink-2">Password</label>
                <Link href="/reset-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-background border border-ink/15 rounded-lg text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-pill hover:bg-primary-dark transition-colors"
            >
              Log in
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-ink-3 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary font-semibold hover:underline">
            Join free
          </Link>
        </p>
      </div>
    </div>
  );
}
