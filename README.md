# Eletriumap

A Next.js application that allows users to mark and share electrical outlet locations on a map. Users need to be logged in with their Google account to add new locations.

## Features

- Interactive map using Leaflet.js and OpenStreetMap
- Firebase Authentication with Google
- Real-time marker sharing using Firestore
- User attribution for added locations

## Prerequisites

- Node.js 18+ and npm
- Firebase project with Authentication and Firestore enabled

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Firebase project:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Google Authentication
   - Create a Firestore database
   - Get your Firebase configuration

4. Create a `.env.local` file in the root directory with your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open the application in your browser
2. Sign in with your Google account
3. Click on the map to add a new electrical outlet location
4. View all added locations and who added them

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Leaflet.js
- Firebase Authentication
- Firebase Firestore
- React Firebase Hooks

## Security

The application uses environment variables to store sensitive Firebase configuration. Never commit your `.env.local` file to version control. The `.gitignore` file is already configured to ignore this file.
