# Learning Log: Deploying and Fixing the Cosmic Age Calculator

This document details the steps taken to deploy the web application using Git and the GitHub CLI (`gh`), and to fix a mobile responsiveness issue.

---

## Part 1: Initial Deployment via GitHub

Our goal was to take a local `index.html` file and publish it as a live website using GitHub Pages.

### Step 1: Initialize a Local Git Repository

We started by turning our project folder into a Git repository. This allows us to track changes to our files.

```bash
# Command we ran:
git init
```
*   **Purpose:** Initializes a new, empty Git repository in the current directory. It creates a hidden `.git` folder to store all the version control data.

### Step 2: Stage and Commit the Code

Next, we had to add our `index.html` file to Git's tracking and then save a snapshot of its state (a "commit").

```bash
# Command to stage the file:
git add index.html

# Command to commit the file:
git commit -m 'Initial commit'
```
*   **`git add`**: This command adds the file to the "staging area." The staging area is where you prepare the files for your next commit.
*   **`git commit`**: This command takes all the files from the staging area and saves a permanent snapshot of them in the Git history. The `-m 'Initial commit'` part is the message describing the change.

### Step 3: Create a GitHub Repository and Push the Code

With our code committed locally, we needed to put it on GitHub. We used the GitHub CLI (`gh`) for this.

```bash
# Command we ran:
gh repo create cosmic-age-app --public --source=. --push
```
*   **Purpose:** This single command does three things:
    1.  `repo create cosmic-age-app`: Creates a new public repository on your GitHub account named `cosmic-age-app`.
    2.  `--source=.`: Tells `gh` to use the current directory as the source code.
    3.  `--push`: Pushes your existing local commit (`Initial commit`) up to the new GitHub repository.

### Step 4: Enable GitHub Pages

This was the trickiest part. Our goal was to enable the GitHub Pages feature for our new repository so it would be hosted as a website.

#### The Challenge: Outdated Commands

We first tried several commands that failed:
*   `gh pages publish ...`: This command is part of a `gh` *extension* that was not installed.
*   `gh extension install ...`: My attempts to install the extension failed because I was using outdated or incorrect extension names.
*   `gh repo edit --add-pages-site`: This flag is from an older version of the `gh` CLI and no longer exists.

#### The Solution: Using the `gh api` Command

You provided the correct, modern solution, which is to interact with the GitHub API directly.

```bash
# The successful command we ran:
gh api repos/bhaveshkmishra/cosmic-age-app/pages --method POST -f source[branch]=master -f source[path]='/'
```
*   **Purpose:** This command directly "talks" to the GitHub API to enable GitHub Pages.
    *   `gh api .../pages`: Specifies the API endpoint for GitHub Pages settings.
    *   `--method POST`: Tells the API we want to **create** a new configuration.
    *   `-f source[branch]=master`: Sets the source branch to `master`.
    *   `-f source[path]='/'`: Sets the source folder to the root (`/`) of the repository.

---

## Part 2: Fixing the Mobile View

After deploying, we noticed the content was cut off on mobile devices.

### Step 1: Identify the Problem

The issue was that scrolling was disabled on the page. I inspected the `index.html` file and found this CSS rule:

```css
/* The problematic code */
body {
    overflow: hidden; /* This disables all scrolling */
}
```
This was originally added to prevent the animated background stars from creating scrollbars when they moved off-screen. However, it also prevented users from scrolling the main content on small screens.

### Step 2: Implement the Fix

The solution was to move the `overflow: hidden` style from the `body` tag to only the container that held the stars (`#star-container`). This contained the "no-scroll" behavior to just the background and allowed the main content to scroll normally.

```css
/* The corrected code */
body {
    font-family: 'Inter', sans-serif;
    /* overflow: hidden; was removed from here */
}

#star-container {
    overflow: hidden; /* And moved here */
}
```
*   **Tool Used:** I used the `replace` tool to perform this change directly on the `index.html` file.

### Step 3: Deploy the Fix

To get the fix live, we followed the standard Git workflow again.

```bash
# 1. Stage the modified file
git add index.html

# 2. Commit the change with a clear message
git commit -m 'Fix: Enable scrolling on mobile devices'

# 3. Push the new commit to GitHub
git push
```
*   **Result:** Pushing the new commit to the `master` branch automatically triggered a new build on GitHub Pages. The website was updated with the fix a few moments later.
