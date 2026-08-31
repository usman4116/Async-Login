'use client';

import { useUser, useAuth, SignIn } from '@clerk/nextjs';
import { useEffect, useState, Suspense } from 'react';

function LoginContent() {
  const { isSignedIn, isLoaded, user } = useUser();
  const { getToken, userId } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    async function handoff() {
      if (isLoaded && isSignedIn && user) {
        setRedirecting(true);
        const token = (await getToken()) || '';
        const email = user.primaryEmailAddress?.emailAddress || '';
        const name = user.fullName || user.firstName || email.split('@')[0];
        const avatarUrl = user.imageUrl || '';

        const params = new URLSearchParams({
          token,
          userId: userId || user.id,
          email,
          name,
          avatarUrl,
        });

        const search = new URLSearchParams(window.location.search);
        const callbackUrl = search.get('callback');

        if (callbackUrl) {
          const sep = callbackUrl.includes('?') ? '&' : '?';
          window.location.href = `${callbackUrl}${sep}${params.toString()}`;
        } else {
          window.location.href = `aethersync://auth/callback?${params.toString()}`;
        }
      }
    }
    void handoff();
  }, [isSignedIn, isLoaded, user, getToken, userId]);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#070709', color: '#fff', fontFamily: '-apple-system, system-ui, sans-serif', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background ambient glow */}
      <div style={{ position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', width: '380px', height: '380px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.12)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '440px' }}>
        {/* Brand header */}
        <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', margin: '0 auto 12px', borderRadius: '12px', background: 'linear-gradient(180deg, #ff8a3d, #f2600c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', color: 'white', boxShadow: '0 8px 24px rgba(242, 96, 12, 0.35)' }}>
            A
          </div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: '700', letterSpacing: '-0.02em', margin: '0 0 4px', color: '#ffffff' }}>
            AetherSync Authentication
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
            Sign in with Clerk to connect your desktop workspace
          </p>
        </div>

        {redirecting ? (
          <div style={{ background: '#0d0d11', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '2.5rem 1.5rem', textAlign: 'center', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'inline-block', width: '36px', height: '36px', border: '3px solid rgba(249, 115, 22, 0.2)', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#fff', margin: '0 0 6px' }}>Authentication Complete!</h2>
            <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: 0 }}>Redirecting back to AetherSync Desktop...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <SignIn />
        )}
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#070709', color: '#fff' }}>
        <div style={{ width: '32px', height: '32px', border: '3px solid rgba(249, 115, 22, 0.2)', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    }>
      <LoginContent />
    </Suspense>
  );
}
