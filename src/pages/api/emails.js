import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URI
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  oauth2Client.setCredentials({
    access_token: req.query.token,
  });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 15,
    });

    if (!response.data.messages) {
      res.status(200).json({ emails: [] });
      return;
    }

    const emailPromises = response.data.messages.map(message =>
      gmail.users.messages.get({ userId: 'me', id: message.id })
    );

    const emails = await Promise.all(emailPromises);
    const emailData = emails.map(email => ({
      id: email.data.id,
      snippet: email.data.snippet,
      subject: email.data.payload.headers.find(header => header.name === 'Subject')?.value || '',
    }));

    res.status(200).json({ emails: emailData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
