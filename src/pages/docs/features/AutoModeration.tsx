import React from 'react';
import DocLayout from '../../../components/docs/DocLayout';

const AutoModeration = () => {
  return (
    <DocLayout
      title="Auto-Moderation"
      description="AI-powered content moderation for your community"
      category="Features"
    >
      <h2>Overview</h2>
      <p>Skout's auto-moderation system uses advanced AI to detect and handle inappropriate content automatically.</p>

      <h2>Key Features</h2>
      <ul>
        <li>Real-time content analysis</li>
        <li>Custom moderation rules</li>
        <li>Multi-language support</li>
        <li>Automated actions</li>
      </ul>

      <h2>Configuration</h2>
      <p>Learn how to set up and customize auto-moderation rules...</p>

      <h2>Best Practices</h2>
      <p>Tips for effective auto-moderation setup...</p>
    </DocLayout>
  );
};

export default AutoModeration;