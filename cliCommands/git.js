module.exports = [
  // 🔧 Git Basics
    { 
        label: "[Git] Init",
        command: "git init", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[Git] Clone", 
        command: "git clone <repo_url>", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[Git] Commit", 
        command: "git commit -m 'Your message'", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[Git] Push", 
        command: "git push origin <branch>", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[Git] Pull", 
        command: "git pull origin <branch>", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[Git] Status", 
        command: "git status", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[Git] Log", 
        command: "git log --oneline --graph", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },

  // 🌿 Branching
    { 
        label: "[Git] Create Branch", 
        command: "git checkout -b <branch_name>", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[Git] Switch Branch", 
        command: "git checkout <branch_name>", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[Git] Merge Branch", 
        command: "git merge <branch_name>", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[Git] Rebase Branch", 
        command: "git rebase <branch>", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },

  // 🧰 Stash & Cleanup
    { 
        label: "[Git] Stash Changes", 
        command: "git stash", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[Git] Apply Stash", 
        command: "git stash pop", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[Git] Clean Untracked", 
        command: "git clean -fd", 
        category: "Git", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },

  // 🔗 GitHub via CLI (gh)
    { 
        label: "[GitHub] Create Repo", 
        command: "gh repo create", 
        category: "GitHub", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[GitHub] Clone Repo", 
        command: "gh repo clone <owner>/<repo>", 
        category: "GitHub", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[GitHub] View PRs", 
        command: "gh pr list", 
        category: "GitHub", 
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[GitHub] Create PR", 
        command: "gh pr create --fill", 
        category: "GitHub",
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    },
    { 
        label: "[GitHub] Merge PR", 
        command: "gh pr merge", 
        category: "GitHub",
        favorite: false,
        tags: ["github", "clone", "repo", "gh-cli", "vcs"]
    }
];
