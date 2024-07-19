import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';
import EmailList from '../components/EmailList';
import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';

const Home = () => {
  const { data: session, status } = useSession();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'authenticated' && session?.accessToken) {
      setLoading(true);
      fetch(`/api/emails?token=${encodeURIComponent(session.accessToken)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch emails');
          }
          return response.json();
        })
        .then(data => {
          const classifiedEmails = data.emails.map(async email => {
            const res = await fetch('/api/classify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ emailContent: email.snippet }),
            });
            const { category } = await res.json();
            return { ...email, category };
          });

          Promise.all(classifiedEmails).then(result => {
            setEmails(result);
            setLoading(false);
          });
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [status, session]);

  if (status === 'loading') {
    return <Layout>Loading...</Layout>;
  }

  if (status === 'unauthenticated') {
    return (
      <Layout>
        <LoginForm />
      </Layout>
    );
  }

  if (loading) {
    return <Layout>Loading emails...</Layout>;
  }

  if (error) {
    return <Layout>Error: {error}</Layout>;
  }

  return (
    <Layout>
      <EmailList emails={emails} />
    </Layout>
  );
};

export default Home;
