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

### GitHub Pages (автоматичний)

Push у `main` запускає GitHub Actions (`.github/workflows/deploy.yml`), який збирає проєкт і публікує на GitHub Pages. У налаштуваннях репозиторію Pages → Source має бути **GitHub Actions**. Звичайний `npm run build` збирає з base `/wedding-invitation/` саме під Pages.

### Nginx (свій сервер, сайт на корені домену)

```bash
npm run build:nginx   # збірка з base "/" у dist/
```

Скопіювати вміст `dist/` на сервер і віддати як статику:

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/wedding/dist;
    index index.html;

    location /assets/ {
        expires max;        # файли хешовані, кешувати можна назавжди
        add_header Cache-Control "public, immutable";
    }
}
```

Бекенд не потрібен: сайт статичний, RSVP-форма шле дані напряму у Formspree з браузера. Якщо домен не `viktoriia17b.github.io` — онови `og:url` та `og:image` в `index.html`, щоб прев'ю в месенджерах вело на правильну адресу.

## Контент

Весь контент (імена, дата, тексти, локації, Formspree endpoint) — в одному файлі `src/data.js`.
