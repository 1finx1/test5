import React from 'react';
import DocLayout from '../../../components/docs/DocLayout';

const Authentication = () => {
  return (
    <DocLayout
      title="Authentication"
      description="Learn how to authenticate with the Skout API"
      category="API Reference"
    >
      <h2>Authentication Methods</h2>
      <h3>API Keys</h3>
      <p>Secure your API requests using API keys...</p>

      <h3>OAuth 2.0</h3>
      <p>For user-specific actions, use OAuth 2.0...</p>

      <h2>Example Requests</h2>
      <pre><code>{`
// Using API Key
const response = await fetch('https://api.skout.com/v1/moderation', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
      `}</code></pre>

      <h2>Security Best Practices</h2>
      <ul>
        <li>Rotate API keys regularly</li>
        <li>Use environment variables</li>
        <li>Implement rate limiting</li>
      </ul>
    </DocLayout>
  );
};

export default Authentication;