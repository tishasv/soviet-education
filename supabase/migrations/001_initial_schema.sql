-- ============================================================
-- Советское образование — схема базы данных
-- ============================================================

-- Направления (верхний уровень)
CREATE TABLE categories (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug       TEXT UNIQUE NOT NULL,
  label      TEXT NOT NULL,
  icon       TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Предметы
CREATE TABLE subjects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  slug        TEXT UNIQUE NOT NULL,
  label       TEXT NOT NULL,
  year        INTEGER,
  author      TEXT,
  description TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Уроки / главы
CREATE TABLE modules (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id  UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  slug        TEXT NOT NULL,
  title       TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(subject_id, slug)
);

-- Блоки контента (рекурсивная структура)
CREATE TABLE blocks (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id  UUID REFERENCES modules(id) ON DELETE CASCADE,
  parent_id  UUID REFERENCES blocks(id) ON DELETE CASCADE,  -- для вложения
  type       TEXT NOT NULL CHECK (type IN ('text','quote','image','video','exercise','pdf')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  content    JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  -- либо module_id, либо parent_id должен быть заполнен
  CONSTRAINT block_has_parent CHECK (
    (module_id IS NOT NULL AND parent_id IS NULL) OR
    (module_id IS NULL AND parent_id IS NOT NULL)
  )
);

-- Варианты ответов для упражнений
CREATE TABLE exercise_options (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_id   UUID NOT NULL REFERENCES blocks(id) ON DELETE CASCADE,
  text       TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- Индексы
-- ============================================================
CREATE INDEX idx_subjects_category ON subjects(category_id);
CREATE INDEX idx_modules_subject    ON modules(subject_id);
CREATE INDEX idx_blocks_module      ON blocks(module_id);
CREATE INDEX idx_blocks_parent      ON blocks(parent_id);
CREATE INDEX idx_blocks_type        ON blocks(type);

-- ============================================================
-- RLS (Row Level Security) — публичное чтение
-- ============================================================
ALTER TABLE categories      ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects        ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules         ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks          ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories"       ON categories       FOR SELECT USING (true);
CREATE POLICY "Public read subjects"         ON subjects         FOR SELECT USING (true);
CREATE POLICY "Public read modules"          ON modules          FOR SELECT USING (true);
CREATE POLICY "Public read blocks"           ON blocks           FOR SELECT USING (true);
CREATE POLICY "Public read exercise_options" ON exercise_options FOR SELECT USING (true);

-- ============================================================
-- Seed data — начальный контент
-- ============================================================

-- Категории
INSERT INTO categories (slug, label, sort_order) VALUES
  ('nachalnye-klassy',        'Начальные классы',       1),
  ('gumanitarny-tsikl',       'Гуманитарный цикл',      2),
  ('tochnye-nauki',           'Точные науки',           3),
  ('spetsialnye-distsipliny', 'Специальные дисциплины', 4);

-- Предметы
INSERT INTO subjects (category_id, slug, label, year, author, sort_order)
VALUES
  ((SELECT id FROM categories WHERE slug='nachalnye-klassy'),        'geografiya',   'География',    1952, NULL, 1),
  ((SELECT id FROM categories WHERE slug='nachalnye-klassy'),        'estestvoznanie','Естествознание',1950, NULL, 2),
  ((SELECT id FROM categories WHERE slug='gumanitarny-tsikl'),       'russkiy-yazyk','Русский язык', 1953, NULL, 1),
  ((SELECT id FROM categories WHERE slug='tochnye-nauki'),           'arifmetika',   'Арифметика',   1954, NULL, 1),
  ((SELECT id FROM categories WHERE slug='tochnye-nauki'),           'matematika',   'Математика',   1954, NULL, 2),
  ((SELECT id FROM categories WHERE slug='spetsialnye-distsipliny'), 'logika',       'Логика',       1954, 'Проф. Г. И. Челпанов', 1),
  ((SELECT id FROM categories WHERE slug='spetsialnye-distsipliny'), 'psikhologiya', 'Психология',   1955, NULL, 2);

-- Урок по Логике
INSERT INTO modules (subject_id, slug, title, sort_order)
VALUES (
  (SELECT id FROM subjects WHERE slug='logika'),
  'ponyatie-i-suzhdenie',
  'Урок 1: Понятие и суждение',
  1
);

-- Блоки урока по Логике
WITH mod AS (SELECT id FROM modules WHERE slug='ponyatie-i-suzhdenie')
INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  ((SELECT id FROM mod), 'text', 1, '{
    "body": "Логика есть наука о **законах правильного мышления**. Предметом логики являются не сами вещи и явления, но наши *мысли о них* — постольку, поскольку они подчиняются определённым формальным законам."
  }'),
  ((SELECT id FROM mod), 'quote', 2, '{
    "text": "Логика — это орудие, которым пользуется всякая наука; в этом смысле она есть пропедевтика всех наук вообще.",
    "author": "Г. И. Челпанов",
    "source": "Учебник логики, 1946 г."
  }'),
  ((SELECT id FROM mod), 'text', 3, '{
    "body": "**Понятие** — это мысль, в которой отражаются существенные и общие признаки предметов или явлений. Понятия разделяются на *единичные* (Москва, Ленин) и *общие* (город, человек).\n\n**Суждение** — это мысль, в которой что-либо утверждается или отрицается о предмете. Каждое суждение состоит из *субъекта* и *предиката*."
  }'),
  ((SELECT id FROM mod), 'image', 4, '{
    "url": "",
    "alt": "Схема структуры суждения",
    "caption": "Схема структуры суждения. Из учебника логики для средней школы, 1954 г."
  }'),
  ((SELECT id FROM mod), 'video', 5, '{
    "embed_url": "",
    "title": "Лекция: Основные формы мышления",
    "description": "Объяснение понятия, суждения и умозаключения",
    "duration_minutes": 18
  }'),
  ((SELECT id FROM mod), 'exercise', 6, '{
    "question": "Какое из следующих высказываний является суждением в логическом смысле?"
  }');

-- Варианты ответов для упражнения
WITH ex AS (
  SELECT b.id FROM blocks b
  JOIN modules m ON b.module_id = m.id
  WHERE m.slug = 'ponyatie-i-suzhdenie' AND b.type = 'exercise'
)
INSERT INTO exercise_options (block_id, text, is_correct, sort_order)
VALUES
  ((SELECT id FROM ex), 'Москва!',                   false, 1),
  ((SELECT id FROM ex), 'Кто такой Аристотель?',     false, 2),
  ((SELECT id FROM ex), 'Всякий человек смертен.',   true,  3),
  ((SELECT id FROM ex), 'Прочитайте параграф два.',  false, 4);
