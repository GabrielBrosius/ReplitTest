# Gabriel Brosius — Portfolio Website

A clean, modern, and high-performance cinematic portfolio website. This project is built using vanilla HTML, CSS, and JavaScript, meaning **it requires no build steps, compilers, or local command-line tools**. It is ready to run locally and deploy directly to GitHub Pages.

## 📂 Project Structure

- `index.html` — The main portfolio landing page containing the bio, showreels, tv scripts, theater, awards, and contact form.
- `favicon.svg` — The site favicon.
- `robots.txt` — Search engine optimization settings.
- `css/`
  - `styles.css` — Custom stylesheet with the cinematic dark theme variables, responsive grids, and scroll animations.
- `js/`
  - `main.js` — Navigation toggles, scroll-spy selectors, Intersection Observers for scroll animations, and AJAX contact form submitter.
- `images/` — Image assets (stills, portraits, backgrounds).
- `project/` — Dedicated standalone HTML subpages for each film/music video project:
  - `the-straightening.html`
  - `before-we-go.html`
  - `my-father-my-captain-and-me.html`
  - `8-pills-and-counting.html`
  - `the-flying-doctor.html`
  - `drink-me.html`
  - `drink-me-tiny-desk-live.html`

---

## 💻 Running Locally

To preview your website:
1. Double-click `index.html` to open it in your web browser.
2. Alternatively, open the project folder in any text editor (like VS Code) and use a local development server (like the "Live Server" extension) to test.

---

## 🚀 How to Host on GitHub Pages

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com/) and create a new repository (e.g., named `AntiGravityWebsite` or `portfolio`).
2. **Initialize Git and Push**:
   - Run these commands in your project directory (or use a tool like GitHub Desktop):
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Static Portfolio Website"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     git push -u origin main
     ```
3. **Enable GitHub Pages**:
   - In your GitHub repository, click on **Settings** (gear icon).
   - On the left sidebar under the "Code and automation" section, click on **Pages**.
   - Under **Build and deployment**, set the Source to **Deploy from a branch**.
   - Under **Branch**, select `main` (or `master`) and `/ (root)`, then click **Save**.
   - Within a minute, your website will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`!

---

## 📝 Making Edits

Since there are no complex React files or build pipelines:
- **To update your biography, experience, or sections**: Open `index.html` and change the text inside the HTML tags.
- **To update a project details page**: Open the respective file in the `project/` folder and change the titles, logs, or iframe URLs.
- **To change theme colors**: Open `css/styles.css` and modify the custom properties at the top (e.g., `--primary` for the highlight color, `--background` for the page background).
- **To add new images**: Place them in the `images/` directory and update the `<img>` tags in your HTML files.
