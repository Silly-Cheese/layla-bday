# Layla's Sweet 16 Championship

A festive, soccer-themed Sweet 16 birthday website for Layla.

## What is included

- Locked countdown screen until **June 23, 2026 at 12:00 AM Central Time**
- Soccer / Sweet 16 theme
- Animated confetti
- Birthday unlock screen
- 16 Reasons Layla is Amazing flip cards
- 16 Birthday Lockers with surprises
- Hidden 16 soccer ball challenge
- Penalty Kick mini game
- Local browser guestbook
- Fully static setup for GitHub Pages

## Files

- `index.html` — page structure
- `style.css` — full design and animations
- `script.js` — countdown, unlocking, games, guestbook, and confetti

## How to publish with GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Click **Pages** in the left sidebar.
4. Under **Build and deployment**, set source to **Deploy from a branch**.
5. Choose the default branch, usually `main`.
6. Choose `/root` as the folder.
7. Save.

After GitHub finishes publishing, the site should be available at:

`https://silly-cheese.github.io/layla-bday/`

## How to change the unlock date

Open `script.js` and edit this line:

```js
const TARGET_UNLOCK = new Date("2026-06-23T00:00:00-05:00").getTime();
```

The `-05:00` offset is Central Daylight Time.

## How to customize the messages

Open `script.js` and edit these arrays:

- `reasons`
- `lockerSurprises`
- `shotMessages`

## Important guestbook note

The guestbook uses `localStorage`, so it saves only on the current device/browser. This keeps the site free and simple for GitHub Pages, but it does not create a shared public database.
