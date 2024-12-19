import { Suspense } from 'react';
import { FooterComponent } from '~/components/layout/footer/footer-component';
import { NavbarComponent } from '~/components/layout/navbar/navbar-component';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <NavbarComponent />
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-4xl font-bold">Not Found</h1>
        </div>
        <Suspense>
          <FooterComponent />
        </Suspense>
      </body>
    </html>
  );
}
