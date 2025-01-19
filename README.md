## Test Project for a "Github Dashboard"
Plan is to provide a simple Dashboard for github issues and working with them.

Requirements:

1. List issues: Done
2. select issues in the list: Done
3. trigger actions on the issues, for now: move issues to a different repository
  - Button added. Button gets the selected issues. Now it should be possible to use the github create issue API on the target OctoKit instance and create the selected issues.
  - See https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#create-an-issue

How to use:
1. Make sure to create an env.local file in the root and add this to .gitignore
2. In that env.local, provide a valid GITHUB_TOKEN with at least READ access to the source repo
