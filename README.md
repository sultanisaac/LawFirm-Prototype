# NUSALEXA LAW OFFICE - Law Firm Prototype

This is the prototype web application for **Nusalexa Law Office**, a modern law firm providing fast, clear, and practical legal counsel tailored for SMEs, startups, and investors in Indonesia.

## What is it for?

This platform serves as the digital front door for Nusalexa Law Office, featuring:
- **Strategic Legal Consultation Presentation**: Highlighting the firm's expertise and professional credentials.
- **Automated Booking Workflow**: A built-in booking system allowing clients to easily schedule appointments.
- **Multilingual Support**: Integrated language switching for a broader reach.
- **Direct WhatsApp Integration**: Quick communication channels for immediate legal assistance.

## Key Features

- **Premium UI/UX**: Built with Tailwind CSS and Radix UI components, featuring a sleek dark-themed design with animated gradients and cinematic visuals.
- **Next.js App Router**: Utilizing the latest Next.js 13+ features for optimal performance, routing, and SEO.
- **Automated Email Notifications**: Utilizes NodeMailer to send premium, branded HTML confirmation emails upon booking.
- **Google Calendar Integration**: Automatically generates Calendar events and Google Meet links for confirmed bookings.
- **Secure API Routes**: Built-in JWT-secured endpoints to safely handle booking approvals and confirmations.
- **Interactive Components**: Includes a floating WhatsApp widget and an integrated booking modal for seamless user experience.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

## Environment Variables

To fully utilize the automated booking and email features, you must configure your environment variables. Create a `.env.local` or `.env` file in the root directory:

```env
# Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# JWT Token Secret for Booking Confirmations
JWT_SECRET=your_jwt_secret_string

# Google Calendar API (Service Account Credentials)
GOOGLE_CLIENT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="your_private_key"

# Supabase (if Database features are utilized)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Started

First, install the dependencies. You can use npm, yarn, or pnpm:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Contains the Next.js app router pages (e.g., home, privacy) and main layouts.
- `app/api/`: API routes handling backend logic such as booking submissions and confirmation flows.
- `components/`: Reusable UI components including sections (`Hero`), widgets (`FloatingWhatsApp`), and UI elements (`Button`, `Tooltip`).
- `context/`: React context providers for global state management (`LanguageContext`, `BookingContext`).
- `.env` / `.env.local`: Environment variables configuration files. Ensure these are configured before running the application.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: React Hook Form & Zod
