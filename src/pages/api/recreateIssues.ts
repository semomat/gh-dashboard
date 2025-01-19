import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/rest';

/**
 * API handler to recreate issues in a target GitHub repository.
 * Uses OctoKit for interacting with the GitHub API.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { issues } = req.body;
    const targetOwner = 'target-owner';  // Replace with the actual owner of the target repository
    const targetRepo = 'target-repo';    // Replace with the actual target repository name

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,  // GitHub token for authentication
      baseUrl: process.env.GITHUB_API_URL || 'https://api.github.com',  // Customizable GitHub API base URL
    });

    const recreatedIssues = [];

    for (const issue of issues) {
      // Recreate the issue in the target repository
      const createdIssue = await octokit.issues.create({
        owner: targetOwner,
        repo: targetRepo,
        title: issue.title,
        body: issue.body,
        labels: issue.labels,  // Include original labels
        assignees: issue.assignees?.map((assignee: { login: string }) => assignee.login),  // Map assignees to usernames
        milestone: issue.milestone?.number,  // Use milestone number if available
      });

      // Fetch the recreated issue to confirm its creation and gather additional data
      const fetchedIssue = await octokit.issues.get({
        owner: targetOwner,
        repo: targetRepo,
        issue_number: createdIssue.data.number,
      });

      // Fetch and recreate comments for the issue
      const comments = await octokit.issues.listComments({
        owner: issue.owner,  // Original issue owner, assumes presence in input
        repo: issue.repo,    // Original repository name, assumes presence in input
        issue_number: issue.number,  // Original issue number
      });

      for (const comment of comments.data) {
        await octokit.issues.createComment({
          owner: targetOwner,
          repo: targetRepo,
          issue_number: fetchedIssue.data.number,  // Use the fetched issue number
          body: comment.body || '',  // Recreate the comment body
        });
      }

      // Store recreated issue information
      recreatedIssues.push({
        id: fetchedIssue.data.id,
        title: fetchedIssue.data.title,
        body: fetchedIssue.data.body,
        labels: fetchedIssue.data.labels,
        assignees: fetchedIssue.data.assignees,
        milestone: fetchedIssue.data.milestone,
        created_at: fetchedIssue.data.created_at,  // Creation time
        updated_at: fetchedIssue.data.updated_at,  // Last updated time
        priority: issue.labels?.find((label: { name: string }) => label.name.toLowerCase().includes('priority'))?.name || 'None',
      });
    }

    res.status(200).json(recreatedIssues);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
