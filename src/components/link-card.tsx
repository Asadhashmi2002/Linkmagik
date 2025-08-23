'use client';

import { useState, useEffect } from 'react';
import type { Link } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, BarChart2, Trash2 } from 'lucide-react';

interface LinkCardProps {
  link: Link;
  onDelete?: () => void;
}

export function LinkCard({ link, onDelete }: LinkCardProps) {
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // This effect runs only on the client-side after hydration
    setBaseUrl(window.location.origin);
  }, []);

  // Ensure baseUrl is available before constructing the shortUrl
  const shortUrl = baseUrl ? `${baseUrl}/${link.shortCode}` : '';

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/links/${link.shortCode}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Call the onDelete callback to refresh the list
        if (onDelete) {
          onDelete();
        } else {
          // Fallback to page reload if no callback provided
          window.location.reload();
        }
      } else {
        const errorData = await response.json();
        alert(`Failed to delete link: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting link:', error);
      alert('Failed to delete link. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <Card className="shadow-md transition-shadow hover:shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="font-headline text-xl capitalize tracking-tight">{link.description}</CardTitle>
          <CardDescription className="truncate pt-1">{link.longUrl}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/50 p-4 rounded-b-lg">
          <div className="flex items-center gap-4">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-base text-primary hover:underline break-all">
              {shortUrl ? shortUrl.replace(/^https?:\/\//, '') : 'Generating link...'}
            </a>
            <Button size="icon" variant="ghost" onClick={handleCopy} disabled={!shortUrl}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy link</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BarChart2 className="h-4 w-4" />
              <span>{link.clicks.toLocaleString()} clicks</span>
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setShowDeleteModal(true)} 
              disabled={isDeleting}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete link</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Delete Link</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this link?
            </p>
            <div className="bg-gray-50 p-3 rounded mb-4">
              <p className="font-medium text-sm">{link.description}</p>
              <p className="text-xs text-gray-500 mt-1 break-all">{shortUrl}</p>
            </div>
            <div className="flex gap-3 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
