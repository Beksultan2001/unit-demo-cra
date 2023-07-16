const fs = require('fs');
const { github } = require('@actions/github');

async function createOrUpdateIssue() {
  try {
    const token = process.env.INPUT_GITHUB_TOKEN;
    const octokit = github.getOctokit(token);

    const description = fs.readFileSync('CHANGELOG.md', 'utf8');
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
    const version = process.env.GITHUB_REF_NAME;
    const title = `Release ${version} by ${process.env.GITHUB_ACTOR}`;
    const issue = { owner, repo, labels: ['RELEASE'] };

    const issues = await octokit.issues.listForRepo({ ...issue, state: 'all' });
    const existingIssue = issues.data.find(i => i.title === title);

    if (existingIssue) {
      const update = { ...issue, issue_number: existingIssue.number, body: description, state: 'open' };
      await octokit.issues.update(update);
      console.log(`Updated issue #${existingIssue.number}`);
      process.stdout.write(existingIssue.number.toString());
    } else {
      const create = { ...issue, title: title, body: description };
      const response = await octokit.issues.create(create);
      console.log(`Created issue #${response.data.number}`);
      process.stdout.write(response.data.number.toString());
    }
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

createOrUpdateIssue();
