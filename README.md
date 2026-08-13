# Вадим Дмитриев — портфолио

Персональный сайт-портфолио. UX/UI Designer | Vibe Coding.

Стек: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion.

## Разработка

```bash
npm install
npm run dev
```

Сайт откроется на [http://localhost:3000](http://localhost:3000).

## Структура

- `src/app` — страницы (главная, `/projects`, `/projects/[slug]`, `/about`, `/contact`)
- `src/components` — переиспользуемые компоненты (навигация, hover-превью, кастомный курсор, переходы между страницами)
- `src/lib/projects.ts` — данные проектов; сейчас заполнены заглушками, готово к замене на реальные кейсы

## Билд

```bash
npm run build
```

## Техническое задание

Полное ТЗ — в [`portfolio_site_TZ_for_Claude.md`](./portfolio_site_TZ_for_Claude.md).
