export default function TestAdFlowPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Ad Flow Test</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Test Links:</h2>
          <div className="space-y-2">
            <a 
              href="/ad?destination=https%3A//www.google.com" 
              className="block p-3 bg-blue-100 rounded hover:bg-blue-200"
            >
              Test First Ad Page
            </a>
            <a 
              href="/ad-2?destination=https%3A//www.google.com" 
              className="block p-3 bg-green-100 rounded hover:bg-green-200"
            >
              Test Second Ad Page
            </a>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click "Test First Ad Page" - should show countdown and ads</li>
            <li>Click "Test Second Ad Page" - should show final redirect</li>
            <li>Both should work without 404 errors</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
