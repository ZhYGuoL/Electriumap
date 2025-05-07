# Eletriumap - Electric Vehicle Charging Station Map

An open-source web application that allows users to map and share electric vehicle charging station locations. Built with Next.js, Firebase, and Leaflet.

## Features

- 🔐 Google Authentication for user management
- 🗺️ Interactive map interface using Leaflet
- 📍 Add charging station locations by clicking on the map
- 📸 Upload photos with GPS metadata to automatically add locations
- 🔍 View all charging stations added by the community
- 📱 Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Leaflet, react-leaflet
- **Backend**: Firebase (Authentication, Firestore)
- **Image Processing**: exifr for GPS metadata extraction

## Prerequisites

- Node.js 18+ and npm
- A Firebase project with Firestore enabled
- Google Cloud Platform account for authentication

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/eletriumap.git
cd eletriumap
```

2. Install dependencies:
```bash
npm install
```


3. Create a `.env.local` file in the project root with your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Sign In**: Click the "Sign in with Google" button to authenticate
2. **Add Locations**:
   - Click directly on the map to add a charging station
   - Upload a photo with GPS metadata to automatically add a location
3. **View Stations**: All added charging stations are displayed on the map
4. **Sign Out**: Click the "Sign out" button when done

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
