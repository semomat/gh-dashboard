// import { Octokit } from '@octokit/rest';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//     if (req.method === 'GET') {

//         try {

//           console.log('repos query starting'); 

//             const octoKitSource = new Octokit({
//                 auth: process.env.GITHUB_SOURCE_REPO_TOKEN,
//                 baseUrl: process.env.GITHUB_SOURCE_URL + "/api/v3",
//                 headers: {
//                     "cache-control": "no-cache",
//                 }
//             });

//             const octoKitTarget = new Octokit({
//                 auth: process.env.GITHUB_TARGET_REPO_TOKEN,
//                 baseUrl: process.env.GITHUB_TARGET_URL + "/api/v3",
//                 headers: {
//                     "cache-control": "no-cache",
//                 }
//             });

//             const prios = [
//                 "priority/Urgent",
//                 "priority/High",
//                 "priority/Medium",
//                 "priority/Low",
//               ];
            
//               const issuesPath = `GET /repos/{owner}/{repo}/issues{?labels,state}`;
            
//               const paginatedIssues = await octoKitSource.paginate(issuesPath, {
//                 owner: process.env.GITHUB_SOURCE_ORG,
//                 repo: process.env.GITHUB_SOURCE_REPO, 
//                 // state: ["all"],
//                 // label: prios,
//                 // labels: [viewType, "kind/bug"],
//                 per_page: 20,
//               });
            
//               const result: any = {
//                 all: {
//                   issues: {
//                     open: paginatedIssues.filter((issue: any) => issue.state === "open")
//                   }
//                 },
//               };

//             res.status(200).json(result);

//         } catch (error) {
//             res.status(500).json({ error: 'Failed to fetch data' });
//         }

//     } else {

//         res.setHeader('Allow', ['GET']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);

//     }
// }
