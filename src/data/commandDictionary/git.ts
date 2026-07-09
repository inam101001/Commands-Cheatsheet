import type { ToolDictionary } from "./types";

const gitDictionary: ToolDictionary = {
  tool: "Git",
  binary: "git",
  description: "Distributed version control system.",
  globalFlags: [
    { flag: "--version", description: "Show the Git version." },
    { flag: "--help", description: "Show help for a command." },
    { flag: "-C", description: "Run as if git was started in the given path.", takesValue: true },
  ],
  subcommands: [
    {
      name: "commit",
      description: "Record staged changes to the repository.",
      flags: [
        { flag: "--message", aliases: ["-m"], description: "Use the given commit message instead of opening an editor.", takesValue: true },
        { flag: "--amend", description: "Replace the previous commit instead of creating a new one." },
        { flag: "--no-edit", description: "Reuse the previous commit message (commonly with --amend)." },
        { flag: "--all", aliases: ["-a"], description: "Automatically stage modified/deleted tracked files before committing." },
        { flag: "--no-verify", description: "Skip pre-commit and commit-msg hooks." },
        { flag: "--signoff", aliases: ["-s"], description: "Add a Signed-off-by trailer to the commit message." },
      ],
    },
    {
      name: "push",
      description: "Update a remote branch with local commits.",
      flags: [
        { flag: "--force", aliases: ["-f"], description: "Overwrite the remote branch even if it isn't a fast-forward (dangerous — can discard others' commits)." },
        { flag: "--force-with-lease", description: "Force push, but only if the remote hasn't changed since you last fetched (safer than --force)." },
        { flag: "--set-upstream", aliases: ["-u"], description: "Set the remote branch as the upstream for the local branch." },
        { flag: "--tags", description: "Push tags along with commits." },
        { flag: "--delete", aliases: ["-d"], description: "Delete the given remote branch." },
      ],
    },
    {
      name: "pull",
      description: "Fetch from a remote and integrate with the local branch.",
      flags: [
        { flag: "--rebase", description: "Rebase local commits on top of the fetched branch instead of merging." },
        { flag: "--ff-only", description: "Only update if the merge can be resolved as a fast-forward." },
        { flag: "--no-commit", description: "Merge but don't create a commit automatically." },
      ],
    },
    {
      name: "rebase",
      description: "Reapply commits on top of another base branch.",
      flags: [
        { flag: "--interactive", aliases: ["-i"], description: "Edit, squash, reorder, or drop commits before replaying them." },
        { flag: "--onto", description: "Rebase onto a specific commit rather than the upstream branch.", takesValue: true },
        { flag: "--continue", description: "Continue rebasing after resolving a conflict." },
        { flag: "--abort", description: "Abort the rebase and return to the original branch state." },
        { flag: "--skip", description: "Skip the current commit and continue rebasing." },
      ],
    },
    {
      name: "branch",
      description: "List, create, or delete branches.",
      flags: [
        { flag: "--delete", aliases: ["-d"], description: "Delete a branch (only if fully merged)." },
        { flag: "--delete --force", aliases: ["-D"], description: "Force-delete a branch, even if not merged." },
        { flag: "--all", aliases: ["-a"], description: "List both local and remote-tracking branches." },
        { flag: "--move", aliases: ["-m"], description: "Rename a branch." },
      ],
    },
    {
      name: "checkout",
      description: "Switch branches or restore working tree files.",
      flags: [
        { flag: "--branch", aliases: ["-b"], description: "Create a new branch and switch to it.", takesValue: true },
        { flag: "--track", description: "Set up tracking for a new branch from a remote branch." },
        { flag: "--", description: "Discard changes to specific files, restoring them from the index/commit." },
      ],
    },
    {
      name: "reset",
      description: "Move the current branch pointer and optionally change the index/working tree.",
      flags: [
        { flag: "--soft", description: "Move HEAD only; keep changes staged." },
        { flag: "--mixed", description: "Move HEAD and unstage changes, but keep working tree files (default mode)." },
        { flag: "--hard", description: "Move HEAD and discard all local changes in the index and working tree — destructive." },
      ],
    },
    {
      name: "stash",
      description: "Temporarily shelve uncommitted changes.",
      flags: [
        { flag: "--include-untracked", aliases: ["-u"], description: "Also stash untracked files." },
        { flag: "--keep-index", description: "Keep staged changes in the working tree after stashing." },
      ],
    },
    {
      name: "log",
      description: "Show commit history.",
      flags: [
        { flag: "--oneline", description: "Show each commit on a single line." },
        { flag: "--graph", description: "Draw an ASCII graph of the branch/merge structure." },
        { flag: "--all", description: "Show commits reachable from all refs, not just HEAD." },
        { flag: "--follow", description: "Continue history beyond renames for a single file." },
        { flag: "--stat", description: "Show a diffstat for each commit." },
      ],
    },
    {
      name: "diff",
      description: "Show changes between commits, the working tree, and the index.",
      flags: [
        { flag: "--staged", aliases: ["--cached"], description: "Show changes already staged for the next commit." },
        { flag: "--name-only", description: "Show only names of changed files." },
        { flag: "--stat", description: "Show a summary of changes per file." },
      ],
    },
    {
      name: "merge",
      description: "Join two or more development histories together.",
      flags: [
        { flag: "--no-ff", description: "Always create a merge commit, even if a fast-forward is possible." },
        { flag: "--squash", description: "Combine all commits from the branch into one set of changes, uncommitted." },
        { flag: "--abort", description: "Abort a merge in progress and restore the pre-merge state." },
      ],
    },
    {
      name: "clone",
      description: "Clone a repository into a new directory.",
      flags: [
        { flag: "--depth", description: "Create a shallow clone with a truncated history.", takesValue: true },
        { flag: "--branch", aliases: ["-b"], description: "Clone and check out a specific branch.", takesValue: true },
        { flag: "--recurse-submodules", description: "Also clone and initialize submodules." },
      ],
    },
    {
      name: "tag",
      description: "Create, list, or delete tags.",
      flags: [
        { flag: "--annotate", aliases: ["-a"], description: "Create an annotated tag (with message, author, date)." },
        { flag: "--delete", aliases: ["-d"], description: "Delete a tag." },
      ],
    },
    {
      name: "reflog",
      description: "Show a log of where HEAD and branch refs have pointed — useful for recovering \"lost\" commits.",
      flags: [],
    },
  ],
};

export default gitDictionary;
