module.exports = [
  // 🔧 Git Basics
  { label: "[Git] Init", command: "git init", category: "Git" },
  { label: "[Git] Clone", command: "git clone <repo_url>", category: "Git" },
  { label: "[Git] Commit", command: "git commit -m 'Your message'", category: "Git" },
  { label: "[Git] Push", command: "git push origin <branch>", category: "Git" },
  { label: "[Git] Pull", command: "git pull origin <branch>", category: "Git" },
  { label: "[Git] Status", command: "git status", category: "Git" },
  { label: "[Git] Log", command: "git log --oneline --graph", category: "Git" },

  // 🌿 Branching
  { label: "[Git] Create Branch", command: "git checkout -b <branch_name>", category: "Git" },
  { label: "[Git] Switch Branch", command: "git checkout <branch_name>", category: "Git" },
  { label: "[Git] Merge Branch", command: "git merge <branch_name>", category: "Git" },
  { label: "[Git] Rebase Branch", command: "git rebase <branch>", category: "Git" },

  // 🧰 Stash & Cleanup
  { label: "[Git] Stash Changes", command: "git stash", category: "Git" },
  { label: "[Git] Apply Stash", command: "git stash pop", category: "Git" },
  { label: "[Git] Clean Untracked", command: "git clean -fd", category: "Git" },

  // 🔗 GitHub via CLI (gh)
  { label: "[GitHub] Create Repo", command: "gh repo create", category: "GitHub" },
  { label: "[GitHub] Clone Repo", command: "gh repo clone <owner>/<repo>", category: "GitHub" },
  { label: "[GitHub] View PRs", command: "gh pr list", category: "GitHub" },
  { label: "[GitHub] Create PR", command: "gh pr create --fill", category: "GitHub" },
  { label: "[GitHub] Merge PR", command: "gh pr merge", category: "GitHub" }
];
