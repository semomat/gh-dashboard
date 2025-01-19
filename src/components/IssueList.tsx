import React, { useState } from 'react';
import IssueButton from './IssueButton';

interface Issue {
  id: number;
  number: number;
  title: string;
  body: string;
  state: string;
  html_url: string;
  labels: any[];
}

const IssueList = ({ issues }: { issues: Issue[] }) => {
  const [selectedIssues, setSelectedIssues] = useState<Issue[]>([]);

  const toggleIssueSelection = (issue: Issue) => {
    setSelectedIssues((prev) =>
      prev.some((i) => i.id === issue.id)
        ? prev.filter((i) => i.id !== issue.id)
        : [...prev, issue]
    );
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => toggleIssueSelection(issue)}
                />
              </td>
              <td>{issue.number}</td>
              <td><b>{issue.title}</b></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginLeft: '20px' }}><IssueButton selectedIssues={selectedIssues} /></div>
      
    </div>
  );
};

export default IssueList;
