import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/rest';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const octokit = new Octokit({ 
      auth: process.env.GITHUB_SOURCE_REPO_TOKEN, 
      baseUrl: process.env.GITHUB_SOURCE_URL + "/api/v3",
      headers: {
        "cache-control": "no-cache",
      },
    });
    const { issues } = req.body;

    // Beispiel für die Verarbeitung von Issues
    for (const issue of issues) {
      
      // await octokit.issues.update({
      //   owner: 'repo-owner',
      //   repo: 'repo-name',
      //   issue_number: issue.id,
      //   state: 'closed',
      // });
    }

    res.status(200).json({ message: 'Issues processed' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
