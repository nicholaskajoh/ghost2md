# Ghost to MD
**ghost2md** is a small Node.js script that helps you convert your Ghost blog export to markdown files.

## Requirements
- Node.js/NPM

## Setup
- Clone this repository `git clone https://github.com/nicholaskajoh/ghost2md.git`.
- Change directory to project root.
- Install Node dependencies `npm install`.

## Usage
Options
- path=./export.json
- frontMatterTokenId=+++|---

Example
```
$ node index.js --path=./export.json --frontMatterTokenId=+++
```

## Contribution
Feel free to submit a feature/bug fix with a PR. Report bugs with the Issue Tracker.