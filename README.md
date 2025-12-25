# VisaLink

VisaLink is an application for managing athlete visa applications.

- **frontend/** — React + TypeScript (Redux, Styled Components)
- **server/** — Ruby on Rails API

---

### Repository Structure

```
.
├── frontend/   # React + TypeScript (Redux, Styled Components)
└── server/     # Ruby on Rails API
Prerequisites
General
Git

Terminal

Frontend
Node.js (LTS recommended)

npm or yarn

Backend
Ruby (match project config / .ruby-version if present)

Bundler

PostgreSQL (or whichever DB is configured in server/config/database.yml)

Quick Start (Run Both Locally)
Open two terminals.

Terminal A — Backend (Rails)
bash
Copy code
cd server
bundle install
bundle exec rails db:create db:migrate
bundle exec rails s
Backend runs on:

http://localhost:3000

Terminal B — Frontend (React)
bash
Copy code
cd frontend
npm install
npm start
Frontend usually runs on:

http://localhost:3001 or http://localhost:5173 (depends on tooling)

Environment Variables
If the repo includes example env files, copy them and update values:

Backend
bash
Copy code
cd server
cp .env.example .env   # if available
Common places config may live:

.env / .env.local

config/database.yml

Rails credentials (config/master.key + config/credentials.yml.enc)

Frontend
bash
Copy code
cd frontend
cp .env.example .env   # if available
Typical API URL examples:

CRA: REACT_APP_API_BASE_URL=http://localhost:3000

Vite: VITE_API_BASE_URL=http://localhost:3000

Never commit secrets (tokens, keys, passwords).

Contributing
Branch Naming (Required)
Always branch from main using:

Features: feature/VL-001

Bugfixes: bugfix/VL-001

Hotfixes: hotfix/VL-001

Example:

bash
Copy code
git checkout main
git pull origin main
git checkout -b feature/VL-001
Workflow
bash
Copy code
# create branch
git checkout main
git pull origin main
git checkout -b feature/VL-001

# commit changes
git add .
git commit -m "Short clear commit message"

# push branch
git push -u origin feature/VL-001
Pull Requests
Open a PR to main

Add a clear description (what + why)

Include screenshots / API examples when helpful

Assign the PR to robbyevans for review and merging

Troubleshooting
Port already in use
Rails defaults to 3000. If needed:

bash
Copy code
bundle exec rails s -p 3001
Database connection errors
Confirm PostgreSQL is running

Confirm database.yml / .env values are correct

Bundler issues
bash
Copy code
gem install bundler
bundle update --bundler
bundle install
Node dependency issues
bash
Copy code
rm -rf node_modules
npm install
License

```
