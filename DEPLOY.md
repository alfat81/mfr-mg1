# Инструкция по деплою на GitHub Pages

Подробное пошаговое руководство.

## 1. Подготовка репозитория

1. Создайте новый репозиторий на GitHub:
   - Для домена `user.github.io/mfr-mg/` — любое имя, например `mfr-mg`
   - Для домена `user.github.io/` — имя репозитория `user.github.io`
   - Для кастомного домена `mfr-mg.ru` — любое имя

2. Инициализируйте git и запушьте код:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: MFR FUM website 2026"
   git branch -M main
   git remote add origin https://github.com/ВАШ-ЛОГИН/mfr-mg.git
   git push -u origin main
   ```

## 2. Включение GitHub Pages

1. Откройте репозиторий на GitHub
2. **Settings → Pages**
3. В разделе **Source** выберите **GitHub Actions** (не Deploy from branch!)
4. Сохраните

## 3. Автоматический деплой

После пуша в ветку `main` (или `master`) автоматически запустится workflow
`.github/workflows/deploy.yml`. Он:

1. Установит Bun и зависимости
2. Соберёт статику: `bun run build:github` (использует `next.config.github.ts`)
3. Добавит `.nojekyll` в `out/` (чтобы GitHub Pages не игнорировал `_next/`)
4. Добавит `CNAME` если настроен кастомный домен
5. Загрузит артефакт и опубликует на GitHub Pages

Следить за статусом: вкладка **Actions** в репозитории.

Через 1–2 минуты сайт будет доступен по адресу:
- `https://ВАШ-ЛОГИН.github.io/mfr-mg/` — для поддомена github.io
- `https://mfr-mg.ru/` — для кастомного домена

## 4. Кастомный домен (опционально)

### Вариант A: поддомен github.io

Если репозиторий назван `mfr-mg`, сайт будет на `https://ВАШ-ЛОГИН.github.io/mfr-mg/`.
Никаких дополнительных настроек не нужно — `basePath` автоматически определится
из `GITHUB_REPOSITORY`.

### Вариант B: корневой домен github.io

Если репозиторий назван `ВАШ-ЛОГИН.github.io`, сайт будет на
`https://ВАШ-ЛОГИН.github.io/`. `basePath` будет пустым — всё работает из коробки.

### Вариант C: кастомный домен (например, mfr-mg.ru)

1. В DNS вашего домена добавьте запись:
   - **Тип:** `CNAME` (для поддомена) или `A` (для корневого)
   - **Имя:** `@` или `www`
   - **Значение:** `ВАШ-ЛОГИН.github.io` (CNAME) или IP GitHub Pages (A)

2. В настройках репозитория: **Settings → Pages → Custom domain → введите `mfr-mg.ru`**
   - Поставьте галочку **Enforce HTTPS**

3. В Variables репозитория:
   **Settings → Secrets and variables → Actions → Variables → New variable**
   - **Name:** `CUSTOM_DOMAIN`
   - **Value:** `mfr-mg.ru`

4. Запушьте любой коммит или запустите workflow вручную (Actions → Deploy → Run workflow)

5. Готово. Сайт доступен на `https://mfr-mg.ru/`. `basePath` будет пустым
   (workflow передаст `BASE_PATH=""` в env).

## 5. Настройка админ-панели

После деплоя откройте `https://ВАШ-ДОМЕН/admin`:

1. Введите пароль (по умолчанию `mfr-fum-2026`)
2. В форме подключения к GitHub:
   - **GitHub Personal Access Token** — создайте на
     https://github.com/settings/tokens/new?scopes=repo
     с правами `repo` (или `public_repo` для публичного репозитория)
   - **Владелец** — ваш логин GitHub (например, `mfr-mg`)
   - **Репозиторий** — имя репозитория (например, `mfr-mg.ru`)
   - **Ветка** — `main` (по умолчанию)

3. После входа можно:
   - Загружать PDF-документы (≤ 1 МБ каждый)
   - Добавлять/редактировать/удалять региональные комиссии
   - Все изменения коммитятся прямо в репозиторий

### Смена пароля админки

```bash
# 1. Сгенерировать новый хеш
printf '%s' 'новый-пароль' | sha256sum

# 2. Заменить значение ADMIN_PASSWORD_HASH в src/app/admin/page.tsx

# 3. Закоммитить и запушить
git add src/app/admin/page.tsx
git commit -m "admin: сменить пароль"
git push
```

## 6. Локальная проверка перед пушем

```bash
# Установить зависимости
bun install

# Запустить dev-сервер
bun run dev
# → откройте http://localhost:3000

# Проверить lint
bun run lint

# Собрать статику как для GitHub Pages (локально)
bun run build:github
# → результат в ./out/

# Можно открыть out/ локально через любой статический сервер:
npx serve out
# или
python3 -m http.server 8000 --directory out
```

## 7. Troubleshooting

### Сайт не загружается (404 на assets)

Проверьте, что `basePath` правильно определился. Для репозитория
`mfr-mg/mfr-mg.ru` basePath будет `/mfr-mg.ru`. Если у вас корневой
домен `mfr-mg.ru`, нужно добавить переменную `BASE_PATH=""` в
**Settings → Secrets and variables → Actions → Variables**.

### Изображения не отображаются

Из-за `images.unoptimized: true` (нужно для статической сборки) все
изображения должны быть в `/public/images/`. Пути в коде: `/images/file.webp`.

### Админка не может сохранить изменения

Проверьте:
1. Токен GitHub имеет права `repo` (или `public_repo` для публичного репо)
2. Ветка в админке указана правильно (обычно `main`)
3. CORS — запросы идут на `api.github.com`, CORS разрешён GitHub по умолчанию

### Ошибка "File too large" при загрузке PDF

GitHub Contents API ограничивает размер файла 1 МБ. Для больших PDF:
- Разбейте файл или сожмите (pdftk, ghostscript, online-сервисы)
- Или закоммитьте PDF напрямую через `git`:
  ```bash
  cp большой.pdf public/documents/
  # Затем добавьте запись в public/data/documents.json вручную
  git add public/documents/большой.pdf public/data/documents.json
  git commit -m "docs: добавить большой PDF"
  git push
  ```

### GitHub Pages показывает пустую страницу

Проверьте:
1. Вкладка **Actions** — workflow завершился успешно?
2. В `out/` есть `.nojekyll`? (должен добавляться автоматически)
3. В `out/` есть `index.html`?
4. В **Settings → Pages → Source** выбран **GitHub Actions** (не branch!)

### Кастомный домен не работает

1. DNS-запись корректна? Проверьте:
   ```bash
   dig mfr-mg.ru
   # или
   nslookup mfr-mg.ru
   ```
2. В **Settings → Pages → Custom domain** введён домен?
3. **Enforce HTTPS** включён?
4. Variable `CUSTOM_DOMAIN` добавлена в репозиторий?

## 8. Архитектура данных

```
public/
├── data/
│   ├── documents.json           # Список документов (управляется через админку)
│   └── regional-commissions.json # Реестр региональных комиссий (управляется через админку)
├── documents/
│   ├── reglament_2026.pdf       # PDF-файлы (загружаются через админку)
│   ├── Pravila_moto.pdf
│   └── ...
└── images/
    └── *.webp                   # Изображения (закоммичены в репо)
```

Публичные разделы сайта (Documents, RegionalCommissions) загружают JSON через
`fetch("/data/...")`. После коммита в JSON — изменения появятся на сайте после
авто-перестройки GitHub Pages (1–2 минуты).

## 9. Резервное копирование

Все данные хранятся в git-репозитории. Для резервной копии:

```bash
git clone https://github.com/ВАШ-ЛОГИН/mfr-mg.git backup-$(date +%Y%m%d)
```

История изменений данных — в git log:
```bash
git log --oneline -- public/data/
git log --oneline -- public/documents/
```

## 10. Контакты

По вопросам работы сайта:
- **Дмитрий Серов** (председатель комиссии): serovdima@list.ru, +7 (977) 823-63-90
- **Алексей Фатьянов** (зам. председателя): alexey@fatyanov.com, +7 (920) 111-91-77
