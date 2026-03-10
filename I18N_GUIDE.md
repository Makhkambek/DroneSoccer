# Multilingual Implementation Guide (i18n)

## Overview
Your Drone Soccer project now supports **Russian and English** languages using `next-intl`.

## What Was Changed

### 1. Fixed Header Overlap Issue ✓
- Changed `pt-20` (80px) to `pt-48` (192px) on all pages
- This accounts for SponsorsBar (112px) + Navigation (80px) = 192px total height
- Pages affected: Home, About Drone Soccer, About Team, Lessons, Competitions, Apply, and all competition sub-pages

### 2. i18n Configuration ✓
- **Installed:** `next-intl` package
- **Created:** Configuration files (`i18n.ts`, `middleware.ts`)
- **Reorganized:** App directory to support locales (`app/[locale]/`)

### 3. Translation Files ✓
Located in `/messages/`:
- `en.json` - English translations
- `ru.json` - Russian translations

### 4. Components Updated ✓
- **Navigation** - Now uses translations and includes language switcher
- **Footer** - Uses translations for all text
- **LanguageSwitcher** - New component for switching between languages
- **Home Page** - Fully translated

## How to Use Translations

### In Client Components
```tsx
'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function MyComponent() {
  const t = useTranslations('namespace');
  const locale = useLocale();

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <Link href={`/${locale}/path`}>Link</Link>
    </div>
  );
}
```

### In Server Components
```tsx
import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';

export default async function MyPage() {
  const locale = await getLocale();
  const t = await useTranslations('namespace');

  return <h1>{t('title')}</h1>;
}
```

## URL Structure
- **English (default):** `/` or `/en`
- **Russian:** `/ru`
- **Example:**
  - English: `/en/about-team` or `/about-team`
  - Russian: `/ru/about-team`

## Remaining Pages to Update

The following pages still need translation implementation:

### Priority Pages (User-Facing)
1. `/app/[locale]/about-drone-soccer/page.tsx` - Use `aboutDroneSoccer` namespace
2. `/app/[locale]/about-team/page.tsx` - Use `aboutTeam` namespace
3. `/app/[locale]/lessons/page.tsx` - Use `lessons` namespace
4. `/app/[locale]/competitions/page.tsx` - Use `competitions` namespace
5. `/app/[locale]/apply/page.tsx` - Use `apply` namespace
6. `/app/[locale]/shop/page.tsx` - Add translations to shop
7. `/app/[locale]/competitions/class-40/page.tsx`
8. `/app/[locale]/competitions/class-20/page.tsx`
9. `/app/[locale]/competitions/drone-racing/page.tsx`

### Steps to Update a Page:
1. Add `'use client';` directive at the top
2. Import hooks: `import { useTranslations, useLocale } from 'next-intl';`
3. Use the hooks:
   ```tsx
   const t = useTranslations('pageName');
   const locale = useLocale();
   ```
4. Replace hardcoded text with `t('key')`
5. Update all `<Link href="/path">` to `<Link href={`/${locale}/path`}>`
6. The translations are already in `/messages/en.json` and `/messages/ru.json`

## Language Switcher
The language switcher appears in:
- **Desktop:** Top right of navigation bar
- **Mobile:** Bottom of mobile menu

Users can switch between English 🇬🇧 and Russian 🇷🇺 with one click.

## Testing
1. Run the dev server: `npm run dev`
2. Visit `http://localhost:3000` (English)
3. Visit `http://localhost:3000/ru` (Russian)
4. Use the language switcher in the navigation
5. Verify all translations appear correctly

## Adding New Translations
1. Open `/messages/en.json` and `/messages/ru.json`
2. Add your key-value pairs in the appropriate namespace
3. Use the translation key in your component with `t('newKey')`

Example:
```json
{
  "myPage": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

```tsx
const t = useTranslations('myPage');
<h1>{t('title')}</h1>
```

## Important Notes
- Admin pages (`/app/admin/*`) are NOT localized
- API routes (`/app/api/*`) remain unchanged
- All translations must be added to BOTH `en.json` and `ru.json`
- The default locale is English (`en`)
- The `localePrefix: 'as-needed'` setting means English URLs don't need `/en` prefix

## Troubleshooting
- **Translations not showing:** Check that the key exists in both JSON files
- **404 errors:** Ensure links include `/${locale}` prefix
- **Language not switching:** Clear browser cache and check middleware configuration
