const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

const fs = require('fs');
const description = fs.readFileSync('CHANGELOG.md', 'utf8');
const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
const version = process.env.GITHUB_REF.replace('refs/tags/', '');
const title = `Release ${version} by ${process.env.GITHUB_ACTOR}`;
const issue = { owner, repo, labels: ['RELEASE'] };

async function createOrUpdateIssue() {
  const issues = await github.rest.issues.listForRepo({ ...issue, state: 'all' });
  const existingIssue = issues.data.find(i => i.title === title);

  if (existingIssue) {
    const update = { ...issue, issue_number: existingIssue.number, body: description, state: 'open' };
    await github.rest.issues.update(update);
    return existingIssue.number;
  } else {
    const create = { ...issue, title: title, body: description };
    const response = await github.rest.issues.create(create);
    return response.data.number;
  }
}

createOrUpdateIssue();
