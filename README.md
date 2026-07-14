# Wedding Invitation 🕊️

Односторінкове весільне запрошення (React 19 + Vite + SCSS): відлік до дати, локації, RSVP-анкета з відправкою у Formspree.

**Прод:** https://viktoriia17b.github.io/wedding-invitation

## Запуск проєкту

### Розробка (з миттєвим оновленням змін)

```bash
npm install        # один раз після клонування
npm run dev
```

Відкрити `http://localhost:5173/wedding-invitation/` — базовий шлях `/wedding-invitation/` обов'язковий, на корені буде 404. Працює HMR: зберіг файл — зміни одразу в браузері.

### Перевірка продакшн-збірки локально

```bash
npm run build      # збірка у dist/
npm run preview
```

Відкрити `http://localhost:4173/wedding-invitation/`. Це готовий білд без відстеження змін — для фінальної перевірки перед деплоєм.

### Інші команди

```bash
npm run lint       # ESLint
npm run deploy     # ручний деплой на гілку gh-pages (легасі-шлях)
```

## Деплой

Автоматичний: push у `main` запускає GitHub Actions (`.github/workflows/deploy.yml`), який збирає проєкт і публікує на GitHub Pages. У налаштуваннях репозиторію Pages → Source має бути **GitHub Actions**.

## Контент

Весь контент (імена, дата, тексти, локації, Formspree endpoint) — в одному файлі `src/data.js`.
