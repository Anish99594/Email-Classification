This project is a web application that allows users to log in using Google OAuth, fetch their last X emails from Gmail, and classify them into different categories using OpenAI GPT-4. By default, X = 15.

Table of Contents
  Features
  Tech Stack
  Setup Instructions
  Environment Variables
  Project Structure
  Usage
  API Endpoints
  Error Handling
  Contributing

Features
  User Authentication using Google OAuth.
  Fetches user's last X emails from Gmail.
  Classifies emails into categories: Important, Promotions, Social, Marketing, Spam, General.
  User-friendly interface using Next.js and Tailwind CSS.

Tech Stack
  Frontend: Next.js, Tailwind CSS
  Backend: Next.js API Routes, OpenAI API, Gmail API
  Authentication: NextAuth.js (Google OAuth)

Setup Instructions
Prerequisites
  Node.js (v14.x or later)
  npm or yarn

Installation
  Clone the repository:
    git clone https://github.com/yourusername/my-email-classifier.git
    cd my-email-classifier
  Install dependencies:
    npm install
  Set up Google OAuth credentials:
    Go to the Google Cloud Console.
    Create a new project.
    Enable the "Gmail API".
    Create OAuth 2.0 credentials and set the redirect URI to http://localhost:3000/api/auth/callback/google.
    Note down the Client ID and Client Secret.
  Set up OpenAI API key:
    Sign up at OpenAI and obtain your API key.
  Create a .env.local file in the root directory of the project and add the following variables:
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-nextauth-secret
    OPENAI_API_KEY=your-openai-api-key
  Run the development server:
    npm run dev
   The application should now be running at http://localhost:3000.

Environment Variables
The following environment variables need to be set in a .env.local file:
  GOOGLE_CLIENT_ID: Your Google OAuth Client ID.
  GOOGLE_CLIENT_SECRET: Your Google OAuth Client Secret.
  NEXTAUTH_URL: The URL of your Next.js application.
  NEXTAUTH_SECRET: A secret string for NextAuth.js.
  OPENAI_API_KEY: Your OpenAI API key.

Project Structure
  /my-email-classifier
  ├── /components
  │   ├── EmailList.js
  │   ├── Layout.js
  │   └── LoginForm.js
  ├── /pages
  │   ├── api
  │   │   ├── auth
  │   │   │   └── [...nextauth].js
  │   │   ├── classify.js
  │   │   └── emails.js
  │   ├── _app.js
  │   ├── index.js
  │   └── login.js
  ├── /styles
  │   ├── globals.css
  ├── .env.local
  ├── next.config.js
  ├── postcss.config.js
  ├── tailwind.config.js
  └── README.md

Usage
  1. Login:
    Navigate to the homepage and click the "Login with Google" button.
    Authenticate using your Google account.
  2. Fetch and Classify Emails:
    Upon successful login, the application will fetch your last X emails from Gmail.
    The emails will be classified into categories using the OpenAI GPT-4 model and displayed on the page.

API Endpoints
  POST /api/classify:
    Classifies email content using OpenAI GPT-4.
    Request Body: { "emailContent": "string" }
    Response: { "category": "string" }
  GET /api/emails:
    Fetches the user's last X emails from Gmail.
    Requires Google OAuth access token.

Error Handling
  Errors are handled gracefully and returned with appropriate HTTP status codes and messages. Common errors      include:
    400 Bad Request: Missing or invalid request parameters.
    405 Method Not Allowed: Invalid HTTP method.
    500 Internal Server Error: Server errors, including issues with the OpenAI API.

Contributing
Please follow these steps to contribute:
  Fork the repository.
  Create a new branch (git checkout -b feature-branch).
  Make your changes.
  Commit your changes (git commit -m 'Add new feature').
  Push to the branch (git push origin feature-branch).
  Create a pull request.
