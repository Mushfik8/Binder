import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Try to check if profile exists (table might not exist yet)
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('onboarding_completed')
            .eq('id', user.id)
            .single();

          if (profile?.onboarding_completed) {
            return NextResponse.redirect(`${origin}/discover`);
          }
        } catch {
          // profiles table might not exist yet — that's fine
        }

        // New user or incomplete onboarding
        return NextResponse.redirect(`${origin}/onboarding`);
      }
    }
  }

  // Auth code error — redirect to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
