# Советское образование

Образовательный веб-портал на базе учебных материалов 1930–1955 гг.

**Стек:** Next.js 14 · TypeScript · Tailwind CSS · Supabase (PostgreSQL)

---

## Деплой за 3 шага

### Шаг 1 — Supabase (база данных)

1. Зайдите на [supabase.com](https://supabase.com) → **New project**
2. Придумайте имя, выберите регион (EU West — ближайший)
3. После создания перейдите в **SQL Editor** → New query
4. Вставьте содержимое файла `supabase/migrations/001_initial_schema.sql` → **Run**
5. Перейдите в **Settings → API**:
   - Скопируйте **Project URL** → это `NEXT_PUBLIC_SUPABASE_URL`
   - Скопируйте **anon public** key → это `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

### Шаг 2 — GitHub (репозиторий)

```bash
# В папке проекта:
git init
git add .
git commit -m "init: soviet education platform"

# Создайте репо на github.com, затем:
git remote add origin https://github.com/ВАШ_ЮЗЕР/soviet-education.git
git push -u origin main
```

---

### Шаг 3 — Vercel (деплой)

1. Зайдите на [vercel.com](https://vercel.com) → **Add New Project**
2. Выберите ваш GitHub репозиторий
3. В разделе **Environment Variables** добавьте:
   ```
   NEXT_PUBLIC_SUPABASE_URL      = (из Supabase Settings → API)
   NEXT_PUBLIC_SUPABASE_ANON_KEY = (из Supabase Settings → API)
   ```
4. Нажмите **Deploy** — готово ✓

Vercel автоматически задеплоит каждый новый `git push`.

---

## Локальная разработка

```bash
npm install

# Создайте файл с переменными окружения:
cp .env.local.example .env.local
# Заполните его данными из Supabase

npm run dev
# → http://localhost:3000
```

---

## Добавление нового контента

### Новое направление
```sql
INSERT INTO categories (slug, label, sort_order)
VALUES ('inostrannye-yazyki', 'Иностранные языки', 5);
```

### Новый предмет
```sql
INSERT INTO subjects (category_id, slug, label, year, author, sort_order)
VALUES (
  (SELECT id FROM categories WHERE slug='inostrannye-yazyki'),
  'nemetskiy-yazyk', 'Немецкий язык', 1953, NULL, 1
);
```

### Новый урок с блоками
```sql
-- Урок
INSERT INTO modules (subject_id, slug, title, sort_order)
VALUES (
  (SELECT id FROM subjects WHERE slug='nemetskiy-yazyk'),
  'urok-1-alfavit', 'Урок 1: Алфавит', 1
);

-- Текстовый блок
INSERT INTO blocks (module_id, type, sort_order, content)
VALUES (
  (SELECT id FROM modules WHERE slug='urok-1-alfavit'),
  'text', 1,
  '{"body": "Немецкий алфавит состоит из **26 букв**..."}'
);
```

---

## Типы блоков

| Тип         | Описание                          | Поля content                                      |
|-------------|-----------------------------------|---------------------------------------------------|
| `text`      | Текст с Markdown                  | `body: string`                                    |
| `quote`     | Цитата                            | `text`, `author`, `source?`                       |
| `image`     | Изображение с подписью            | `url`, `alt?`, `caption?`                         |
| `video`     | Видео (YouTube embed или заглушка)| `embed_url`, `title`, `description?`, `duration_minutes?` |
| `exercise`  | Тест с вариантами ответов         | `question: string` + строки в `exercise_options`  |
| `pdf`       | Ссылка на PDF-учебник             | `url`, `title`, `description?`                    |

Блоки поддерживают **неограниченное вложение** через поле `parent_id`.

---

## Структура проекта

```
src/
├── app/
│   ├── layout.tsx                        # Корневой layout (шапка + sidebar)
│   ├── page.tsx                          # Главная страница
│   ├── api/subjects/search/route.ts      # API поиска
│   └── (routes)/[category]/[subject]/[module]/page.tsx  # Страница урока
├── components/
│   ├── layout/
│   │   ├── Header.tsx                    # Шапка с поиском
│   │   └── Sidebar.tsx                   # Навигационное дерево
│   └── blocks/
│       ├── BlockRenderer.tsx             # Диспетчер блоков (рекурсивный)
│       ├── TextBlock.tsx
│       ├── QuoteBlock.tsx
│       ├── ImageBlock.tsx
│       ├── VideoBlock.tsx
│       ├── ExerciseBlock.tsx
│       └── PdfBlock.tsx
├── lib/
│   ├── supabase.ts                       # Supabase client
│   └── api.ts                            # Функции запросов к БД
└── types/
    └── index.ts                          # TypeScript типы
```
