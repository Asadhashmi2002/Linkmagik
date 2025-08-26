import { redirect } from 'next/navigation';

export default function Page() {
    // Redirect to dashboard since we're not using second ad page anymore
    redirect('/dashboard');
}
