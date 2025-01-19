import '../styles/globals.css';
import { GetServerSideProps } from 'next';
import IssueList from '../components/IssueList';
import { Octokit } from '@octokit/rest';

type Repos = {
  source_owner: string;
  source_repo: string;
  target_owner: string;
  target_repo: string;
}

type Props = {
  issues: any[];
  repos: Repos;
};

export const getServerSideProps: GetServerSideProps = async () => {
  
  const repos: Repos = {
    source_owner: process.env.GITHUB_SOURCE_ORG || '',
    source_repo: process.env.GITHUB_SOURCE_REPO || '',
    target_owner: process.env.GITHUB_TARGET_ORG || '',
    target_repo: process.env.GITHUB_TARGET_REPO || ''
  };
  
  const source_owner = process.env.GITHUB_SOURCE_ORG;
  const source_repo =  process.env.GITHUB_SOURCE_REPO;

  const issuesPath = `GET /repos/{owner}/{repo}/issues{?labels,state}`;

  const octokit = new Octokit({ 
    auth: process.env.GITHUB_SOURCE_REPO_TOKEN, 
    baseUrl: process.env.GITHUB_SOURCE_URL + "/api/v3",
    headers: {
      "cache-control": "no-cache",
    },
  });
                  
  const issues = await octokit.paginate(issuesPath, {
    owner: process.env.GITHUB_SOURCE_ORG,
    repo: process.env.GITHUB_SOURCE_REPO, 
    // state: ["all"],
    // label: prios,
    // labels: [viewType, "kind/bug"],
    // per_page: 0,
  });

  return {
    props: {
      issues: issues,
      repos: repos
    },
  };
};

 
const HomePage = ({ issues, repos }: Props) => {
  return (

    <div>
      <h1>GitHub Dashboard</h1>
      <table>
        <tbody>
        <tr>
          <td>Source Repo Org/Owner: {repos.source_owner}</td>
          <td>Target Repo Org/Owner: {repos.target_owner}</td>
        </tr>
        <tr>
          <td>Source Repo: {repos.source_repo}</td>
          <td>Target Repo: {repos.target_repo}</td>
        </tr>      
        </tbody>
      </table>
      <IssueList issues={issues} />
    </div>
  );
};

export default HomePage;
