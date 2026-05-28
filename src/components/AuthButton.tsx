"use client";

import { LogIn } from "lucide-react";
import { createBrowserSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function AuthButton() {
  async function signIn() {
    if (!isSupabaseConfigured()) {
      alert("Supabaseの環境変数を設定するとログインを有効化できます。");
      return;
    }

    const email = window.prompt("ログイン用メールアドレス");
    if (!email) return;

    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    });
    alert("確認メールを送信しました。");
  }

  return (
    <button
      type="button"
      onClick={signIn}
      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-ink"
      aria-label="ログイン"
      title="ログイン"
    >
      <LogIn size={16} aria-hidden />
    </button>
  );
}
