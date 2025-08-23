export default function TestRoutePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Route Test</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Test Links:</h2>
          <div className="space-y-2">
            <a 
              href="/redirect/0001" 
              className="block p-3 bg-blue-100 rounded hover:bg-blue-200"
            >
              Test /redirect/0001
            </a>
            <a 
              href="/redirect/0002" 
              className="block p-3 bg-green-100 rounded hover:bg-green-200"
            >
              Test /redirect/0002
            </a>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click the test links above</li>
            <li>Should redirect to ad flow</li>
            <li>No 404 errors</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
