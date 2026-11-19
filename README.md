# A Sister I Found, A Bond I Choose ❤️

A little handmade digital scrapbook from Paaji to Behen.

## Open it
Just open `index.html` in any browser — no build step, no login.
To share it, host the folder on GitHub Pages, Netlify, or Vercel (static site).

## Personalize it
All the words live in the `CONFIG` object at the top of **`script.js`**:

| What | Where in `CONFIG` |
|---|---|
| Welcome title, subtitle, names, reminder, signature | `texts` |
| The "What You Are To Me" letter (one string per paragraph) | `letter` |
| Photo scrapbook | `photos` |
| Flip cards | `memories` |
| Promises | `promises` |
| Envelope letter | `finalLetter` |
| Background music file | `musicFile` |

### Add your photos
1. Put pictures in `assets/photos/` (e.g. `assets/photos/diwali.jpg`).
2. In `script.js`, set `src: "assets/photos/diwali.jpg"` and change the caption.
   Leave `src: ""` to keep the cute placeholder frame.

### Add music
Drop a song at `assets/music.mp3`. If it isn't there, the Music button plays a
soft built-in music-box tune instead. Music only starts when the button is pressed.

### Colours & fonts
Change the colour variables at the top of `styles.css` (`:root`).
