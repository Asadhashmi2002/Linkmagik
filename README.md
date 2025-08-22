# LinkMagik - A Next.js URL Shortener

This is a modern URL shortener application built with Next.js, TypeScript, and Tailwind CSS. It provides a clean interface for shortening long URLs and uses Genkit AI to generate catchy, descriptive names for your links.

## Core Features

-   **URL Shortening**: Converts long URLs into short, manageable links.
-   **AI Link Descriptions**: Automatically generates a descriptive name for each link using Google's Gemini model via Genkit, making your links easier to identify.
-   **Click Tracking**: Counts how many times each short link is used.
-   **One-Click Copy**: Easily copy the shortened URL to your clipboard.
-   **Fast Redirections**: Server-side redirection logic ensures users are sent to the original long URL quickly.
-   **Modern UI**: A sleek, responsive, and visually appealing interface built with shadcn/ui and Tailwind CSS.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **AI Integration**: [Genkit](https://firebase.google.com/docs/genkit)
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

3.  **Set up environment variables:**

    This project uses Genkit, which may require an API key for the AI model. If you have one, create a `.env.local` file in the root of the project:

    ```
    # Example for Google AI (Genkit)
    GOOGLE_API_KEY=your_google_ai_api_key_here
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:9002](http://localhost:9002).

## How It Works

-   **Frontend**: The main user interface is located in `src/app/page.tsx`. It uses React Server Components to display the list of links and a Client Component (`UrlShortenerForm`) to handle user input.
-   **Backend Logic**: Server Actions in `src/lib/actions.ts` handle the URL shortening logic. When a user submits a URL, the action validates the input, calls the Genkit AI flow to get a description, creates a short code, and saves the data.
-   **Data Persistence**: For this demo, the application uses a simple in-memory store (`src/lib/db.ts`) to simulate a database. In a production environment, this would be replaced with a proper database like PostgreSQL, MongoDB, or Firebase Firestore.
-   **Redirection**: Dynamic routes in Next.js (`src/app/[code]/page.tsx`) handle the redirection. When a short URL is visited, this page looks up the original URL in the database and redirects the user.
