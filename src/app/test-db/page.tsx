import { getLinks, getLinkByCode } from '@/lib/db';

export default async function TestDbPage() {
  try {
    const allLinks = await getLinks();
    const testLink = await getLinkByCode('0001');
    
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Test</h1>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold">All Links:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(allLinks, null, 2)}
          </pre>
        </div>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Test Link (0001):</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(testLink, null, 2)}
          </pre>
        </div>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Database Status:</h2>
          <p className="text-green-600">✅ Database connection working</p>
          <p>Total links: {allLinks.length}</p>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Database Test</h1>
        <div className="text-red-600">
          <h2 className="text-xl font-semibold">Error:</h2>
          <pre className="bg-red-100 p-4 rounded">
            {error instanceof Error ? error.message : String(error)}
          </pre>
        </div>
      </div>
    );
  }
}
