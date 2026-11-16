# NoteFlow

A simple, dark-themed notes app built with plain HTML, CSS, and JavaScript. No frameworks, no build step. Your notes are saved in your browser, so they are still there after a refresh.

## Features

- **Add notes** with a title (up to 40 characters) and text (up to 240 characters)
- **Pin notes** with the star button, and pinned notes move to the top
- **Pinned only** filter to show just your pinned notes
- **Live search** across note titles and text
- **Delete notes** with the × button that appears when you hover over a card
- **Persistent storage** using the browser's `localStorage`
- **Responsive layout** that works on desktop and mobile

## Project Structure

```
Note_Flow/
├── index.html   # Page structure and the "Add a note" dialog
├── style.css    # Dark theme, layout, animations, mobile styles
└── script.js    # App logic: add, pin, delete, search, filter, save
```

## How to Run

1. Download or clone this repository.
2. Open `index.html` in any modern browser.

That's it. No installation is needed.

```bash
git clone https://github.com/Krishsingh318/Note_Flow.git
cd Note_Flow
```

## Live Demo (GitHub Pages)

1. Go to the repo's **Settings → Pages**.
2. Under **Branch**, choose `main` and the `/ (root)` folder, then save.
3. After a minute, the site will be live at `https://krishsingh318.github.io/Note_Flow/`.

## How It Works

- Notes are stored as an array of objects (`title`, `text`, `pinned`, `id`, `date`) and saved to `localStorage` under the key `notes`.
- `displayNotes()` rebuilds the note cards from the array every time something changes.
- Pin and delete clicks are handled with event delegation on the notes container.
- Search filters the array with `.filter()` and `.includes()`, and pinning sorts the array so pinned notes come first.

## Built With

- HTML5 (including the `<dialog>` element)
- CSS3 (custom properties, grid, flexbox, animations)
- Vanilla JavaScript (ES6)
- Google Fonts: DM Sans and Outfit

## Ideas for Improvement

- Show the live note count in the header
- Show the "No notes found" message when the list is empty
- Edit existing notes
- Escape note text before rendering, to prevent HTML injection

## Author

Made by [Krishsingh318](https://github.com/Krishsingh318).
