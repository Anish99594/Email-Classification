import Openai from 'openai';

const openai = new Openai({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { emailContent } = req.body;

  if (!emailContent) {
    return res.status(400).json({ error: 'Email content is required' });
  }

  try {
    console.log('Making request to OpenAI with API key:', process.env.OPENAI_API_KEY ? 'Loaded' : 'Not Loaded');

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that classifies emails.',
        },
        {
          role: 'user',
          content: `Classify the following email content into one of these categories: Important, Promotions, Social, Marketing, Spam, or General.\n\nEmail content: "${emailContent}"\n\nCategory:`,
        },
      ],
      max_tokens: 60,
    });

    console.log('OpenAI response:', response);

    const category = response.data.choices[0].message.content.trim();
    res.status(200).json({ category });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: error.message });
  }
}
