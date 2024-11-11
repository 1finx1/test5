import React from 'react';
import DocLayout from '../../../components/docs/DocLayout';

const BestPractices = () => {
  return (
    <DocLayout
      title="Best Practices"
      description="Recommended patterns for using Skout effectively"
      category="Guides"
    >
      <h2>Community Management</h2>
      <ul>
        <li>Set clear community guidelines</li>
        <li>Maintain consistent moderation policies</li>
        <li>Engage with your community regularly</li>
      </ul>

      <h2>Moderation Workflow</h2>
      <p>Establish an efficient moderation workflow...</p>

      <h2>Configuration Tips</h2>
      <p>Optimize your Skout settings...</p>

      <h2>Common Pitfalls</h2>
      <p>Learn what to avoid when managing your community...</p>
    </DocLayout>
  );
};

export default BestPractices;