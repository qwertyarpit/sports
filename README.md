# News Dashboard with Payout Features

A responsive dashboard application for managing news articles and calculating payouts. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- User Authentication (Email/Password, Google, GitHub)
- News Article Management
- Advanced Filtering and Search
- Payout Calculation
- Export to PDF/CSV
- Responsive Design
- Admin-only Features
- Data Visualization

## Prerequisites

- Node.js 16.x or later
- npm or yarn
- News API key (from [News API](https://newsapi.org/))
- Google OAuth credentials (for Google sign-in)
- GitHub OAuth credentials (for GitHub sign-in)

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd news-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here

# News API
NEXT_PUBLIC_NEWS_API_KEY=your-news-api-key-here

# OAuth Providers
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Default Admin Credentials

- Email: admin@example.com
- Password: admin

## Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
├── store/              # Redux store and slices
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

## Technologies Used

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit
- NextAuth.js
- Recharts
- jsPDF
- React CSV

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
