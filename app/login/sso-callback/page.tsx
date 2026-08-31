'use client';

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { Suspense } from 'react';

export default function SsoCallbackPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#070709', color: '#fff' }}>
      <Suspense fallback={<div>Loading authentication...</div>}>
        <AuthenticateWithRedirectCallback continueSignUpUrl="/login" signInForceRedirectUrl="/login" />
      </Suspense>
    </main>
  );
}
