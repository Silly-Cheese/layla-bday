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
- Firestore-powered birthday wall
- Firestore-powered advice cards
- Firestore-powered one-word wall
- Firestore-powered awesome notes
- Firestore-powered time capsule predictions
- Firestore reactions and live polls
- Fully static setup for GitHub Pages

## Files

- `index.html` — page structure
- `style.css` — full design and animations
- `script.js` — Firebase config, countdown, unlocking, games, Firestore forms, polls, reactions, guestbook, and confetti

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

## Firestore collections used

Firestore collections are created automatically the first time a document is written.

The site uses:

- `messages`
- `awesomeNotes`
- `oneWords`
- `advice`
- `timeCapsule`
- `siteStats/reactions`
- `polls/favoriteTeam`
- `polls/mvpTrait`

## Firestore rules for this no-admin version

Use these in Firebase Console → Firestore Database → Rules:

```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function hasShortString(field, max) {
      return field is string && field.size() > 0 && field.size() <= max;
    }

    match /messages/{id} {
      allow read: if true;
      allow create: if
        hasShortString(request.resource.data.name, 40) &&
        hasShortString(request.resource.data.message, 220) &&
        request.resource.data.keys().hasOnly(['name', 'message', 'createdAt']);
      allow update, delete: if false;
    }

    match /awesomeNotes/{id} {
      allow read: if true;
      allow create: if
        hasShortString(request.resource.data.name, 40) &&
        hasShortString(request.resource.data.text, 180) &&
        request.resource.data.keys().hasOnly(['name', 'text', 'createdAt']);
      allow update, delete: if false;
    }

    match /oneWords/{id} {
      allow read: if true;
      allow create: if
        hasShortString(request.resource.data.name, 40) &&
        hasShortString(request.resource.data.word, 24) &&
        request.resource.data.keys().hasOnly(['name', 'word', 'createdAt']);
      allow update, delete: if false;
    }

    match /advice/{id} {
      allow read: if true;
      allow create: if
        hasShortString(request.resource.data.name, 40) &&
        hasShortString(request.resource.data.advice, 220) &&
        request.resource.data.keys().hasOnly(['name', 'advice', 'createdAt']);
      allow update, delete: if false;
    }

    match /timeCapsule/{id} {
      allow read: if true;
      allow create: if
        hasShortString(request.resource.data.name, 40) &&
        hasShortString(request.resource.data.prediction, 220) &&
        request.resource.data.keys().hasOnly(['name', 'prediction', 'createdAt']);
      allow update, delete: if false;
    }

    match /siteStats/reactions {
      allow read: if true;
      allow create: if true;
      allow update: if request.resource.data.diff(resource.data).affectedKeys()
        .hasOnly(['soccer', 'cake', 'heart', 'party', 'trophy']);
      allow delete: if false;
    }

    match /polls/{pollId} {
      allow read: if true;
      allow create: if pollId in ['favoriteTeam', 'mvpTrait'];
      allow update: if pollId in ['favoriteTeam', 'mvpTrait'];
      allow delete: if false;
    }
  }
}
```

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
- `teamOptions`
- `traitOptions`

## Important note

This is a no-admin, no-approval version. Anyone who can access the site can submit text, vote, and react. The rules above limit field lengths and block deletes, but they do not moderate message content.
