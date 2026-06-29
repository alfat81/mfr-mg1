# Кубок России по фигурному управлению мотоциклом 2026 — официальный сайт

Официальный сайт Комиссии по фигурному управлению мотоциклом (мотоджимхане)
Мотоциклетной федерации России (МФР). Вид спорта № 0910007511Я.

## Технологии

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + shadcn/ui
- **Framer Motion** — анимации
- **GitHub Pages** — статический хостинг
- **GitHub Contents API** — админ-панель для управления контентом

## Возможности

- 9 разделов сайта: Hero с таймером, О Кубке, Дисциплина, Этапы, Документы,
  Комиссия МФР, Региональные комиссии, Новости, Партнёрам, FAQ, Контакты
- Умный таймер обратного отсчёта до следующего этапа (автоматически находит
  ближайший предстоящий этап)
- Динамические статусы карточек этапов (Завершён / Идёт сейчас / Регистрация / Скоро)
- Раздел «Дисциплина» с системой классов gymkhana-cup.ru (неофициальной) и
  официальными спортивными званиями/разрядами по ЕВСК 2026–2029
- Раздел «Региональные комиссии» с динамической загрузкой из JSON
- Админ-панель `/admin` с двухэтапной аутентификацией (пароль + GitHub PAT)
- Загрузка PDF-документов и управление региональными комиссиями через браузер

## Локальная разработка

```bash
# Установить зависимости
bun install

# Запустить dev-сервер на http://localhost:3000
bun run dev

# Линт
bun run lint
```

## Деплой на GitHub Pages

Подробная инструкция — в [`DEPLOY.md`](./DEPLOY.md). Кратко:

1. Создайте репозиторий на GitHub (например, `mfr-mg.ru`)
2. Запушьте код в ветку `main`
3. В настройках репозитория: **Settings → Pages → Source = GitHub Actions**
4. GitHub Actions автоматически соберёт и опубликует сайт

Workflow `.github/workflows/deploy.yml` сделает всё сам:
- Установит зависимости через Bun
- Соберёт статику через `bun run build:github` (config: `next.config.github.ts`)
- Добавит `.nojekyll` (чтобы GitHub Pages не игнорировал `_next/`)
- Загрузит артефакт и опубликует

### Кастомный домен (например, mfr-mg.ru)

Если деплоите на свой домен:
1. В настройках репозитория: **Settings → Pages → Custom domain → mfr-mg.ru**
2. Добавьте DNS-запись CNAME `mfr-mg.ru → username.github.io`
3. В Variables репозитория: **Settings → Secrets and variables → Actions → Variables → New variable**
   - Name: `CUSTOM_DOMAIN`
   - Value: `mfr-mg.ru`

Workflow автоматически создаст `CNAME` файл в `out/`.

## Админ-панель

Доступна по адресу `/admin`. Двухэтапная аутентификация:

1. **Пароль** — по умолчанию `mfr-fum-2026`. Сменить:
   ```bash
   printf '%s' 'ваш-пароль' | sha256sum
   ```
   Замените `ADMIN_PASSWORD_HASH` в `src/app/admin/page.tsx`.

2. **GitHub PAT** — Personal Access Token с правами `repo` или `public_repo`.
   Создать: https://github.com/settings/tokens/new?scopes=repo

Админка позволяет:
- Загружать PDF-документы в `/public/documents/` (лимит 1 МБ на файл)
- Управлять списком региональных комиссий ФУМ
- Все изменения коммитятся прямо в репозиторий через GitHub Contents API
- После коммита GitHub Pages автоматически пересобирает сайт (1–2 минуты)

## Структура данных

- `public/data/documents.json` — список документов для сайта
- `public/data/regional-commissions.json` — реестр региональных комиссий
- `public/documents/*.pdf` — PDF-файлы

## Смена пароля админки

```bash
# 1. Сгенерировать новый хеш
printf '%s' 'новый-пароль' | sha256sum

# 2. Заменить ADMIN_PASSWORD_HASH в src/app/admin/page.tsx
# 3. Закоммитить и запушить
```

## Структура проекта

```
src/
  app/
    admin/                  # Админ-панель
      page.tsx              # Главная страница с двухэтапной аутентификацией
      documents-manager.tsx # Менеджер документов
      commissions-manager.tsx # Менеджер региональных комиссий
    layout.tsx              # Корневой layout (шрифты, метаданные)
    page.tsx                # Главная страница (сборка всех секций)
    globals.css             # Глобальные стили + бренд-токены
  components/
    sections/               # Публичные секции сайта
      header.tsx, hero.tsx, about.tsx, discipline.tsx, stages.tsx,
      documents.tsx, commission.tsx, regional-commissions.tsx,
      news.tsx, partners.tsx, faq.tsx, contacts.tsx, footer.tsx
    ui/                     # shadcn/ui компоненты
  lib/
    github-admin.ts         # GitHub Contents API helper
    site-data.ts            # Статичные данные (этапы, FAQ, регламент и т.д.)
public/
  data/                     # JSON-данные (управляются через админку)
  documents/                # PDF-документы
  images/                   # Изображения
next.config.ts              # Локальная dev-конфигурация (standalone)
next.config.github.ts       # Конфигурация для GitHub Pages (export)
.github/workflows/deploy.yml # CI/CD для GitHub Pages
```

## Лицензия

© 2026 Комиссия по фигурному управлению мотоциклом (мотоджимхане) МФР.
Все права защищены.
