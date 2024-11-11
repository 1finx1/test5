import React from 'react';
import DocLayout from '../../../components/docs/DocLayout';

const QuickStart = () => {
  return (
    <DocLayout
      title="Quick Start"
      description="Get up and running with Skout in minutes"
      category="Getting Started"
    >
      <h2>Prerequisites</h2>
      <ul>
        <li>A Skool.com community</li>
        <li>Admin access to your community</li>
        <li>Basic understanding of community management</li>
      </ul>

      <h2>Installation Steps</h2>
      <ol>
        <li>Sign up for a Skout account</li>
        <li>Connect your Skool.com community</li>
        <li>Configure basic settings</li>
        <li>Start moderating</li>
      </ol>

      <h2>Next Steps</h2>
      <p>After completing the quick start, explore our other guides to learn about advanced features and best practices.</p>
    </DocLayout>
  );
};

export default QuickStart;