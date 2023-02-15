# Sverok and MÄN project

## Getting Started

1. Clone the repository
2. Navigate to the directory of the repository
3. Checkout the develop branch: `git switch develop`
4. Run: `npm install`
5. Create your own feature branch (preferably with a name matching a Trello card): `git switch -c <new_branch>`
6. Push your new branch to origin: `git push --set-upstream origin <new_branch>`
7. Make your changes and push them to your branch like this: `git add .` -> `git commit -m "your message"` -> `git push`

## Merging your branch with develop

1. Run all of the following: `git switch develop` -> `git pull` -> `git switch <your-branch-name>` -> `git merge develop`. This keeps your branch up to date with develop
2. Solve any conflicts and make sure your application runs perfectly with preferably no console warnings
3. Run all of the following: `git switch develop` -> `git merge <your-branch-name>` -> `git push origin develop`. This pushes your branch to develop
