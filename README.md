# AA Labour Cambodia — website

Redesign of [aalabors.com](https://aalabors.com) for AA Labour Cambodia Supply Co., Ltd. (License No. 121/19).

- **Stack:** Next.js 15 (App Router, static generation), next-intl, Tailwind CSS v4, Framer Motion
- **Languages:** English, Khmer, Malay, Japanese, Chinese — each at its own URL (`/en`, `/km`, `/ms`, `/ja`, `/zh`)
- **Pages:** Home, Find a Job, Hire Workers, Destinations, About, News, Gallery, Licences, Contact

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy on Vercel

1. Import this repository in Vercel (framework preset: Next.js, no build settings to change).
2. Add environment variables (see `.env.example`):
   - `NEXT_PUBLIC_WEB3FORMS_KEY` — enables form emails to aalabourcambodia@gmail.com
   - `NEXT_PUBLIC_SITE_URL` — the final domain
3. Deploy.

## Editing content

| What | Where |
| --- | --- |
| All text, per language | `messages/<locale>.json` (same keys in every file) |
| Phones, email, Telegram/Line links, map | `src/content/site.ts` |
| Gallery, certificates, news images | `src/content/site.ts` and `public/images/` |
| CEO portrait | put the photo in `public/images/ceo.jpg` and set `ceoPortrait = "/images/ceo.jpg"` in `src/content/site.ts` |

Translations other than English were drafted by AI and should be reviewed by native speakers before launch.

## Images from the original site

`src/content/assets.json` maps every image to its source on the old site. To download any missing ones:

```bash
npm run fetch-assets
```

The old host's firewall blocks clients that request too fast, so the script fetches one file every 4 seconds and stops at the first refusal. Until an image exists, pages show a branded placeholder in its place.
