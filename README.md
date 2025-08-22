# LinkMagik - A Next.js URL Shortener

This is a modern URL shortener application built with Next.js, TypeScript, and Tailwind CSS. It provides a clean interface for shortening long URLs and includes a **two-page interstitial ad flow** to monetize links.

## Core Features

-   **URL Shortening**: Converts long URLs into short, manageable links.
-   **Two-Page Ad Monetization**: Redirects users through two sequential interstitial ad pages before sending them to the final destination.
-   **Click Tracking**: Counts how many times each short link is used.
-   **One-Click Copy**: Easily copy the shortened URL to your clipboard.
-   **Fast Redirections**: Server-side logic ensures users are sent to the correct pages quickly.
-   **Modern UI**: A sleek, responsive, and visually appealing interface built with shadcn/ui and Tailwind CSS.
-   **File-based Storage**: Uses a simple `links.json` file for data persistence, making it easy to run without a database.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later)
-   npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:9002](http://localhost:9002).

## How It Works

-   **Frontend**: The main user interface is in `src/app/page.tsx`. It uses a Client Component (`UrlShortenerForm`) to handle user input and display results.
-   **Backend Logic**: Server Actions in `src/lib/actions.ts` handle the URL shortening logic. When a user submits a URL, the action validates the input, creates a short code, and saves the data to `links.json`.
-   **Data Persistence**: The application uses a simple `links.json` file created in the project root to simulate a database. In a production serverless environment, this file might be ephemeral. For persistent data, a database would be recommended.
-   **Redirection Flow**:
    1. The dynamic route `src/app/[code]/page.tsx` handles short link clicks. It looks up the code and redirects the user to the first ad page (`/ad`).
    2. The `/ad` route (in `src/app/ad/page.tsx`) displays the first ad. After a countdown, it redirects to the second ad page (`/ad-2`).
    3. The `/ad-2` route (in `src/app/ad-2/page.tsx`) displays the second ad. After another countdown, it redirects to the final destination URL.
    4. Ad page logic is handled by the reusable `src/components/ad-flow-page.tsx` component.
