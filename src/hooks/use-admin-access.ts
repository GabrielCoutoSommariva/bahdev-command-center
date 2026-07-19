import { useCallback, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AdminAccessState = {
  loading: boolean;
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  hasVerifiedMfa: boolean;
  currentAal: "aal1" | "aal2" | null;
  error: string | null;
};

const initialState: AdminAccessState = {
  loading: true,
  session: null,
  user: null,
  isAdmin: false,
  hasVerifiedMfa: false,
  currentAal: null,
  error: null,
};

export const useAdminAccess = () => {
  const [state, setState] = useState<AdminAccessState>(initialState);

  const refresh = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: null }));

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    const session = sessionData.session;

    if (sessionError || !session) {
      setState({ ...initialState, loading: false, error: sessionError?.message ?? null });
      return;
    }

    const [{ data: isAdmin, error: adminError }, factorsResult, aalResult] = await Promise.all([
      supabase.rpc("is_blog_admin"),
      supabase.auth.mfa.listFactors(),
      supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
    ]);

    if (adminError) {
      setState({
        ...initialState,
        loading: false,
        session,
        user: session.user,
        error: adminError.message,
      });
      return;
    }

    const verifiedFactors = factorsResult.data?.totp.filter(
      (factor) => factor.status === "verified",
    );

    const currentLevel = aalResult.data?.currentLevel;
    const currentAal: AdminAccessState["currentAal"] =
      currentLevel === "aal1" ? "aal1" : currentLevel === "aal2" ? "aal2" : null;

    setState({
      loading: false,
      session,
      user: session.user,
      isAdmin: Boolean(isAdmin),
      hasVerifiedMfa: Boolean(verifiedFactors?.length),
      currentAal,
      error: factorsResult.error?.message ?? aalResult.error?.message ?? null,
    });
  }, []);

  useEffect(() => {
    void refresh();

    const { data } = supabase.auth.onAuthStateChange(() => {
      window.setTimeout(() => void refresh(), 0);
    });

    return () => data.subscription.unsubscribe();
  }, [refresh]);

  return { ...state, refresh };
};
