import { getLinks } from '@/lib/db';

export default async function DebugPage() {
  let links: any[] = [];
  let error: string | null = null;
  let envInfo: any = {};

  try {
    links = await getLinks();
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }

  // Check environment variables (only show if they exist)
  if (process.env.POSTGRES_URL) {
    envInfo.hasPostgresUrl = true;
    envInfo.postgresUrlLength = process.env.POSTGRES_URL.length;
  } else {
    envInfo.hasPostgresUrl = false;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Information</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Environment Variables:</h2>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(envInfo, null, 2)}
        </pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Database Connection:</h2>
        {error ? (
          <div className="text-red-600">
            <h3 className="font-semibold">Error:</h3>
            <pre className="bg-red-100 p-4 rounded">{error}</pre>
          </div>
        ) : (
          <div className="text-green-600">
            <h3 className="font-semibold">✅ Database connected successfully!</h3>
            <p>Found {links.length} links</p>
          </div>
        )}
      </div>

      {links.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Links in Database:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(links, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
