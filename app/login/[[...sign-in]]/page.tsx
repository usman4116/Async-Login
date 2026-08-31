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
        let callbackUrl = search.get('callback');
        let redirectUrl = search.get('redirect');

        if (callbackUrl) {
          try { sessionStorage.setItem('aethersync_callback', callbackUrl); } catch(e){}
        } else {
          try { callbackUrl = sessionStorage.getItem('aethersync_callback'); } catch(e){}
        }

        if (redirectUrl) {
          try { sessionStorage.setItem('aethersync_redirect', redirectUrl); } catch(e){}
        } else {
          try { redirectUrl = sessionStorage.getItem('aethersync_redirect'); } catch(e){}
        }

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
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#070709', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Animated Cosmic Background Mesh */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.035,
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div className="orb-1" style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.16) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 70%)', filter: 'blur(100px)' }} />
        <div className="orb-2" style={{ position: 'absolute', bottom: '15%', right: '20%', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(234, 88, 12, 0.12) 0%, transparent 70%)', filter: 'blur(90px)' }} />
        
        {/* Floating Particles */}
        <div className="particle p-1" />
        <div className="particle p-2" />
        <div className="particle p-3" />
        <div className="particle p-4" />
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '440px' }}>
        {/* Brand header */}
        <div style={{ marginBottom: '1.75rem', textAlign: 'center' }}>
          <div style={{
            width: '52px',
            height: '52px',
            margin: '0 auto 12px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #ff8a3d, #f2600c)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px',
            fontWeight: 'bold',
            color: 'white',
            boxShadow: '0 10px 30px rgba(242, 96, 12, 0.4)',
          }}>
            A
          </div>
          <h1 style={{ fontSize: '1.45rem', fontWeight: '800', letterSpacing: '-0.02em', margin: '0 0 5px', color: '#ffffff' }}>
            AetherSync <span style={{ color: '#f97316' }}>Desktop</span>
          </h1>
          <p style={{ fontSize: '0.825rem', color: '#94a3b8', margin: 0 }}>
            Sign in to connect your autonomous AI coding workspace
          </p>
        </div>

        {redirecting ? (
          <div style={{ background: '#0d0d11', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '2.5rem 1.5rem', textAlign: 'center', width: '100%', boxShadow: '0 24px 48px rgba(0,0,0,0.7)' }}>
            <div style={{ display: 'inline-block', width: '38px', height: '38px', border: '3px solid rgba(249, 115, 22, 0.2)', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#fff', margin: '0 0 6px' }}>Authentication Complete!</h2>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Redirecting back to AetherSync Desktop...</p>
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            <SignIn path="/login" routing="path" signUpUrl="/login" />
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-47%, -53%) scale(1.1); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15) translate(-20px, 20px); }
        }
        @keyframes particleDrift {
          0% { transform: translateY(0) opacity(0.2); }
          50% { transform: translateY(-40px) opacity(0.9); }
          100% { transform: translateY(-80px) opacity(0); }
        }
        .orb-1 { animation: orbFloat1 10s ease-in-out infinite; }
        .orb-2 { animation: orbFloat2 14s ease-in-out infinite; }
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #f97316;
          border-radius: 50%;
          box-shadow: 0 0 8px #f97316;
        }
        .p-1 { top: 25%; left: 20%; animation: particleDrift 7s ease-in-out infinite; }
        .p-2 { top: 70%; left: 30%; animation: particleDrift 9s ease-in-out infinite 1.5s; }
        .p-3 { top: 35%; right: 25%; animation: particleDrift 8s ease-in-out infinite 2s; }
        .p-4 { top: 80%; right: 20%; animation: particleDrift 11s ease-in-out infinite 3s; }
      `}</style>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#070709', color: '#fff' }}>
        <div style={{ width: '36px', height: '36px', border: '3px solid rgba(249, 115, 22, 0.2)', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    }>
      <LoginContent />
    </Suspense>
  );
}
