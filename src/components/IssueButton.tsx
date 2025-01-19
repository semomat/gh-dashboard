import React from 'react';

interface Issue {
  id: number;
  title: string;
}

const IssueButton = ({ selectedIssues }: { selectedIssues: Issue[] }) => {
  const handleButtonClick = async () => {
    const response = await fetch('/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ issues: selectedIssues }),
    });
    const result = await response.json();
    console.log('Result:', result);
  };

  return (
    <button onClick={handleButtonClick}>
      Process {selectedIssues.length} Issues
    </button>
  );
};

export default IssueButton;
