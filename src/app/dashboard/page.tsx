import { UrlShortenerForm } from "@/components/url-shortener-form";
import { LinksList, LinksListSkeleton } from "@/components/links-list";
import { Suspense } from "react";
import { LogoutButton } from "@/components/logout-button";
import { UserProfile } from "@/components/user-profile";

export default function Dashboard() {
  return (
    <main className="container mx-auto flex min-h-screen w-full flex-col items-center justify-start p-4 selection:bg-primary/20 md:p-8">
      <div className="w-full max-w-4xl space-y-12 mt-12">
        <header className="text-center relative">
          <div className="absolute top-0 right-0 flex gap-2">
            <UserProfile />
            <LogoutButton />
          </div>
          <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            LinkMagik
          </h1>
          <p className="mt-3 text-lg text-muted-foreground md:text-xl">
            Professional URL Shortener Dashboard
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <UrlShortenerForm />
            <Suspense fallback={<LinksListSkeleton />}>
              <LinksList />
            </Suspense>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Links:</span>
                  <span className="font-semibold">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Clicks:</span>
                  <span className="font-semibold">-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Links:</span>
                  <span className="font-semibold">-</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border">
              <h3 className="text-lg font-semibold mb-4">System Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Database: Connected</p>
                <p>Authentication: Active</p>
                <p>Ad System: Ready</p>
                <p>Version: 2.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
