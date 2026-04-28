-- ============================================================
-- Математика — полная программа · 23 модуля
-- ============================================================

DO $$
DECLARE
  mat_id UUID;
  mod_id UUID;
  blk_id UUID;
BEGIN
  SELECT id INTO mat_id FROM subjects WHERE slug = 'matematika';
  IF mat_id IS NULL THEN
    RAISE EXCEPTION 'Subject "matematika" not found';
  END IF;

  -- ── §1 Счёт и числа ──────────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'schet-i-chisla', '§1. Счёт и числа', 1)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"Математика есть наука о количественных отношениях действительного мира. Изучение её начинается с постижения **натурального числа** — основного понятия арифметики.\n\nНатуральные числа возникли из практической потребности человека считать предметы. Натуральный ряд: 1, 2, 3, 4, … — бесконечен.\n\nЧисла записываются десятью цифрами: **0, 1, 2, 3, 4, 5, 6, 7, 8, 9**. Значение цифры определяется её **разрядом** (позицией) в записи числа.\n\nРазряды: *единицы → десятки → сотни → тысячи → …* — каждый следующий в 10 раз больше предыдущего."}'),
  (mod_id, 'quote', 2, '{"text":"Числа управляют миром.","author":"Пифагор","source":"Древнегреческая математика"}'),
  (mod_id, 'text', 3, '{"body":"**Пример разбора числа 3 475:**\nТри тысячи (3·1000) + четыре сотни (4·100) + семь десятков (7·10) + пять единиц (5·1).\n\n**Сравнение чисел:** из двух натуральных чисел больше то, которое при счёте встречается позднее.\nПример: 748 > 479, так как 7 сотен > 4 сотен."}'),
  (mod_id, 'exercise', 4, '{"question":"Какое число стоит в разряде сотен в числе 7 382?"}')
  RETURNING id INTO blk_id;

  -- exercise options for §1
  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '7', false, 1),
  ((SELECT id FROM ex), '3', true,  2),
  ((SELECT id FROM ex), '8', false, 3),
  ((SELECT id FROM ex), '2', false, 4);

  -- ── §2 Сложение и вычитание ──────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'slozhenie-i-vychitanie', '§2. Сложение и вычитание', 2)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**Сложение** — арифметическое действие, при котором по двум числам (*слагаемым*) находят третье (*сумму*): а + б = с.\n\n**Вычитание** — действие, обратное сложению: с − б = а.\n\n**Свойства сложения:**\n- *Переместительный закон:* а + б = б + а\n- *Сочетательный закон:* (а + б) + в = а + (б + в)\n- *Прибавление нуля:* а + 0 = а"}'),
  (mod_id, 'text', 2, '{"body":"**Пример.** Вычислить 4 728 + 1 563.\nСкладываем по разрядам справа налево:\n8+3=11 (пишем 1, перенос 1) · 2+6+1=9 · 7+5=12 (пишем 2, перенос 1) · 4+1+1=6\n**Ответ: 6 291**\n\n**Пример.** Найти неизвестное: х + 345 = 1 000.\nx = 1 000 − 345 = **655**"}'),
  (mod_id, 'exercise', 3, '{"question":"Чему равно значение выражения: 5 003 − 1 478?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '3 525', true,  1),
  ((SELECT id FROM ex), '3 625', false, 2),
  ((SELECT id FROM ex), '4 525', false, 3),
  ((SELECT id FROM ex), '3 515', false, 4);

  -- ── §3 Умножение и деление ───────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'umnozhenie-i-delenie', '§3. Умножение и деление', 3)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**Умножение** — сложение одинаковых слагаемых: а · б = с.\n**Деление** — действие, обратное умножению: с ÷ б = а.\n\n**Свойства умножения:**\n- *Переместительный:* а · б = б · а\n- *Сочетательный:* (а · б) · в = а · (б · в)\n- *Распределительный:* а · (б + в) = а · б + а · в\n- а · 0 = 0; а · 1 = а\n\nЗнание таблицы умножения обязательно для каждого учащегося."}'),
  (mod_id, 'text', 2, '{"body":"**Умножение в столбик: 347 × 26**\n347 × 6 = 2 082\n347 × 20 = 6 940\n2 082 + 6 940 = **9 022**\n\n**Деление с остатком: 1 579 ÷ 7**\n15÷7=2 (ост.1) · 17÷7=2 (ост.3) · 39÷7=5 (ост.4)\n**Ответ: 225, остаток 4**"}'),
  (mod_id, 'exercise', 3, '{"question":"Чему равно произведение 4 · 25 · 13 · 0 · 7?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '0',      true,  1),
  ((SELECT id FROM ex), '9 100',  false, 2),
  ((SELECT id FROM ex), '3 640',  false, 3),
  ((SELECT id FROM ex), '1 300',  false, 4);

  -- ── §4 Простые дроби ─────────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'prostye-drobi', '§4. Простые дроби', 4)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**Обыкновенная дробь** — число вида а/б, где а — *числитель* (сколько частей взяли), б — *знаменатель* (на сколько частей разделили целое). Знаменатель не равен нулю.\n\n- *Правильная дробь:* числитель < знаменателя (значение меньше 1)\n- *Неправильная дробь:* числитель ≥ знаменателя\n- *Смешанное число:* целая часть + правильная дробь (пример: 3½)\n\n**Действия с дробями:**\n- Одинаковый знаменатель: 3/8 + 5/8 = 8/8 = 1\n- Разные знаменатели: 1/3 + 1/4 = 4/12 + 3/12 = 7/12\n- Умножение: 2/3 × 3/5 = 6/15 = 2/5"}'),
  (mod_id, 'quote', 2, '{"text":"Дробное число есть часть или части единицы.","author":"Л. Ф. Магницкий","source":"Арифметика, 1703 г."}'),
  (mod_id, 'exercise', 3, '{"question":"Чему равно: 3/4 × 8/9?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '2/3',  true,  1),
  ((SELECT id FROM ex), '11/13', false, 2),
  ((SELECT id FROM ex), '3/4',  false, 3),
  ((SELECT id FROM ex), '1/3',  false, 4);

  -- ── §5 Единицы измерения ─────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'edinitsy-izmeneniya', '§5. Единицы измерения', 5)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"Советская наука и промышленность используют **метрическую систему мер**.\n\n**Длина:** 1 км = 1 000 м = 100 000 см = 1 000 000 мм\n**Масса:** 1 т = 1 000 кг; 1 кг = 1 000 г; 1 ц = 100 кг\n**Время:** 1 сут = 24 ч; 1 ч = 60 мин; 1 мин = 60 с\n**Площадь:** 1 га = 10 000 м²; 1 км² = 1 000 000 м²\n\n**Перевод единиц:**\n3 км 450 м = 3 · 1000 + 450 = **3 450 м**\n4 ч 35 мин = 4 · 60 + 35 = **275 мин**"}'),
  (mod_id, 'exercise', 2, '{"question":"Поезд прошёл 780 км за 10 часов. Какова его средняя скорость в км/ч?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '78 км/ч',  true,  1),
  ((SELECT id FROM ex), '70 км/ч',  false, 2),
  ((SELECT id FROM ex), '780 км/ч', false, 3),
  ((SELECT id FROM ex), '88 км/ч',  false, 4);

  -- ── §6 Геометрия: фигуры ─────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'geometriya-figury', '§6. Геометрия: фигуры', 6)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"Геометрия изучает формы и пространственные отношения предметов.\n\n**Прямоугольник:** P = 2(a+b); S = a·b\n**Треугольник:** S = ½·a·h\n**Круг** (радиус r): C = 2πr; S = πr² (π ≈ 3,14)\n\n**Примеры:**\n- Площадь прямоугольника 8×5 м: S = 8·5 = **40 м²**\n- Длина окружности r=7 см: C = 2·3,14·7 = **43,96 см**\n- Площадь △ с основанием 10 и высотой 6: S = ½·10·6 = **30 см²**"}'),
  (mod_id, 'exercise', 2, '{"question":"Площадь круглого пруда 314 м². Чему равен его радиус? (π = 3,14)"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '10 м',  true,  1),
  ((SELECT id FROM ex), '5 м',   false, 2),
  ((SELECT id FROM ex), '314 м', false, 3),
  ((SELECT id FROM ex), '100 м', false, 4);

  -- ── §7 Текстовые задачи ──────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'tekstovye-zadachi', '§7. Текстовые задачи', 7)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"Текстовая задача связывает абстрактные вычисления с реальной жизнью. Решение состоит из: **анализа условия → составления плана → вычислений → проверки**.\n\n**Задача 1.** Два трактора пашут поле: первый 12 га/день, второй 9 га/день. За сколько дней вместе вспашут 84 га?\nВместе за день: 12 + 9 = 21 га. Дней: 84 ÷ 21 = **4 дня**.\n\n**Задача 2.** Бассейн наполняется через трубу А за 6 ч, через Б — за 4 ч. Обе вместе?\nЗа 1 ч вместе: 1/6 + 1/4 = 2/12 + 3/12 = 5/12 бассейна.\nВремя: 12/5 = **2 ч 24 мин**."}'),
  (mod_id, 'exercise', 2, '{"question":"Поезд прошёл 1 260 км за 14 часов. Сколько км пройдёт за 9 часов с той же скоростью?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '810 км',  true,  1),
  ((SELECT id FROM ex), '900 км',  false, 2),
  ((SELECT id FROM ex), '756 км',  false, 3),
  ((SELECT id FROM ex), '630 км',  false, 4);

  -- ── §8 Алгебра: основы ───────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'algebra-osnovy', '§8. Алгебра: основы', 8)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"Алгебра обобщает арифметику, заменяя конкретные числа буквенными символами.\n\n**Переменная** — буква, обозначающая произвольное число.\n**Алгебраическое выражение** — запись с числами, переменными и знаками действий.\n\n**Упрощение выражений:**\n4x + 3y − 2x + y = (4x−2x) + (3y+y) = **2x + 4y**\n\n**Раскрытие скобок:**\n3(2a − 4b) = 6a − 12b\n2(3x−4) − 3(x−2) = 6x−8−3x+6 = **3x − 2**"}'),
  (mod_id, 'quote', 2, '{"text":"Алгебра — это великодушная наука: она принимает числа любые.","author":"Н. И. Лобачевский"}'),
  (mod_id, 'exercise', 3, '{"question":"Вычислите 5x² − 3x + 1 при x = 2."}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '15',  true,  1),
  ((SELECT id FROM ex), '11',  false, 2),
  ((SELECT id FROM ex), '23',  false, 3),
  ((SELECT id FROM ex), '3',   false, 4);

  -- ── §9 Уравнения ─────────────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'uravneniya', '§9. Уравнения', 9)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**Уравнение** — равенство, содержащее неизвестную величину. Решить — найти все значения неизвестного, при которых равенство верно.\n\n**Линейное уравнение** ax + b = 0 (a ≠ 0) имеет единственный корень: x = −b/a.\n\n*Теорема:* если к обеим частям уравнения прибавить (вычесть) одно и то же число или умножить (разделить) на ненулевое число — получим равносильное уравнение.\n\n**Примеры:**\n3x − 7 = 14 → 3x = 21 → **x = 7**\n5(x−3) = 2x + 6 → 5x−15 = 2x+6 → 3x = 21 → **x = 7**\n\n**Система:** {2x+y=7; x−y=2} → сложение: 3x=9 → x=3, y=1"}'),
  (mod_id, 'exercise', 2, '{"question":"Возраст отца вдвое больше возраста сына. Сумма их возрастов 48 лет. Сколько лет сыну?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '16 лет',  true,  1),
  ((SELECT id FROM ex), '12 лет',  false, 2),
  ((SELECT id FROM ex), '24 лет',  false, 3),
  ((SELECT id FROM ex), '18 лет',  false, 4);

  -- ── §10 Геометрия Евклида ────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'geometriya-evklida', '§10. Геометрия Евклида', 10)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"Евклидова геометрия строится на аксиомах и теоремах. Каждое утверждение должно быть строго доказано.\n\n**Теорема.** Сумма углов любого треугольника равна **180°**.\n\n**Теорема Пифагора.** В прямоугольном треугольнике квадрат гипотенузы равен сумме квадратов катетов: **c² = a² + b²**.\n\n**Примеры:**\n- Катеты 3 и 4: c² = 9+16 = 25 → c = **5**\n- Гипотенуза 13, катет 5: b² = 169−25 = 144 → b = **12**"}'),
  (mod_id, 'quote', 2, '{"text":"Нет царского пути в геометрии.","author":"Евклид","source":"Ответ царю Птолемею"}'),
  (mod_id, 'exercise', 3, '{"question":"Два угла треугольника равны 47° и 63°. Чему равен третий угол?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '70°',  true,  1),
  ((SELECT id FROM ex), '80°',  false, 2),
  ((SELECT id FROM ex), '110°', false, 3),
  ((SELECT id FROM ex), '90°',  false, 4);

  -- ── §11 Пропорции и проценты ─────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'proportsii-i-protsenty', '§11. Пропорции и проценты', 11)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**Пропорция** — равенство двух отношений: a/b = c/d. Основное свойство: **a·d = b·c**.\n\n**Процент** — одна сотая часть числа. 1% = 1/100.\n\n**Нахождение процента от числа:** N · p/100\n**Нахождение числа по его проценту:** (N · 100) / p\n\n**Примеры:**\n- 35% от 2 400 = 2400·35/100 = **840**\n- 480 — это ?% от 1200 = 480·100/1200 = **40%**\n- Цена выросла на 20% и стала 3 600 руб → начальная = 3600/1,2 = **3 000 руб.**"}'),
  (mod_id, 'exercise', 2, '{"question":"Завод перевыполнил план на 8%. Плановый объём — 5 000 единиц. Сколько единиц произведено?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '5 400', true,  1),
  ((SELECT id FROM ex), '5 080', false, 2),
  ((SELECT id FROM ex), '4 600', false, 3),
  ((SELECT id FROM ex), '5 800', false, 4);

  -- ── §12 Степени и корни ──────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'stepeni-i-korni', '§12. Степени и корни', 12)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**Степень:** aⁿ = a · a · … · a (n множителей). a — основание, n — показатель.\n**Квадратный корень:** √a = b, если b² = a и b ≥ 0.\n\n**Свойства степеней:**\naᵐ · aⁿ = aᵐ⁺ⁿ\naᵐ ÷ aⁿ = aᵐ⁻ⁿ\n(aᵐ)ⁿ = aᵐⁿ\na⁰ = 1 (a≠0)\na⁻ⁿ = 1/aⁿ\n\n**Примеры:**\n2⁵ · 2³ = 2⁸ = **256**\n√144 = **12** (т.к. 12²=144)\n(3x²)³ = 27x⁶"}'),
  (mod_id, 'exercise', 2, '{"question":"Чему равно (2³ · 4²) ÷ 2⁵?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '4',   true,  1),
  ((SELECT id FROM ex), '8',   false, 2),
  ((SELECT id FROM ex), '16',  false, 3),
  ((SELECT id FROM ex), '2',   false, 4);

  -- ── §13 Функции и графики ────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'funktsii-i-grafiki', '§13. Функции и графики', 13)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**Функция** y = f(x) — зависимость, при которой каждому значению x ставится в соответствие единственное значение y. x — аргумент, y — значение функции.\n\n**Линейная функция** y = kx + b. График — прямая. k — наклон, b — сдвиг по оси Y.\n\n**Квадратичная функция** y = ax² + bx + c. График — парабола. Вершина: x₀ = −b/(2a).\nПри a > 0 — ветви вверх; при a < 0 — вниз.\n\n**Примеры:**\ny = 2x−3: при x=0 → y=−3; при x=3 → y=3.\ny = x²−4x+3: вершина при x=2, y=−1; нули при x=1 и x=3."}'),
  (mod_id, 'exercise', 2, '{"question":"При каком значении x функция y = 2x + 7 обращается в нуль?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), 'x = −3,5', true,  1),
  ((SELECT id FROM ex), 'x = 3,5',  false, 2),
  ((SELECT id FROM ex), 'x = 7',    false, 3),
  ((SELECT id FROM ex), 'x = −7',   false, 4);

  -- ── §14 Неравенства ──────────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'neravenstva', '§14. Неравенства', 14)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"Неравенство описывает, что одна величина больше или меньше другой.\n\n*Теорема:* при умножении или делении обеих частей неравенства на **отрицательное** число знак меняется на противоположный.\n\n**Примеры:**\n3x − 5 > 7 → 3x > 12 → **x > 4**\n−2x + 3 ≤ 11 → −2x ≤ 8 → **x ≥ −4** (знак меняется!)\n\n**Система:** x > 2 и x ≤ 7 → **2 < x ≤ 7**"}'),
  (mod_id, 'exercise', 2, '{"question":"Решите неравенство: −3x + 6 > 0. Какой ответ верен?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), 'x < 2',  true,  1),
  ((SELECT id FROM ex), 'x > 2',  false, 2),
  ((SELECT id FROM ex), 'x < −2', false, 3),
  ((SELECT id FROM ex), 'x > −2', false, 4);

  -- ── §15 Тригонометрия ────────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'trigonometriya', '§15. Тригонометрия', 15)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"Тригонометрия изучает отношения сторон и углов треугольника.\n\nДля острого угла α в прямоугольном треугольнике:\n**sin α** = противолежащий катет / гипотенуза\n**cos α** = прилежащий катет / гипотенуза\n**tg α** = sin α / cos α\n\n**Основное тождество:** sin²α + cos²α = 1\n\n**Табличные значения:**\nsin 30° = 1/2; cos 60° = 1/2\nsin 45° = cos 45° = √2/2\nsin 60° = √3/2; cos 30° = √3/2\n\n**Формулы сложения:**\nsin(α+β) = sinα·cosβ + cosα·sinβ\ncos(α+β) = cosα·cosβ − sinα·sinβ"}'),
  (mod_id, 'exercise', 2, '{"question":"Чему равно sin²30° + cos²30°?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '1',     true,  1),
  ((SELECT id FROM ex), '1/2',   false, 2),
  ((SELECT id FROM ex), '√3/2',  false, 3),
  ((SELECT id FROM ex), '0',     false, 4);

  -- ── §16 Логарифмы ────────────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'logarifmy', '§16. Логарифмы', 16)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**log_a(b) = c** означает: aᶜ = b (a > 0, a ≠ 1, b > 0).\n**Десятичный логарифм:** lg(x) = log₁₀(x).\n**Натуральный логарифм:** ln(x) = logₑ(x), e ≈ 2,718.\n\n**Свойства:**\nlog_a(mn) = log_a(m) + log_a(n)\nlog_a(m/n) = log_a(m) − log_a(n)\nlog_a(mⁿ) = n · log_a(m)\nlog_a(a) = 1; log_a(1) = 0\n\n**Примеры:**\nlog₂(8) = 3 (т.к. 2³=8)\nlg(50) + lg(2) = lg(100) = **2**\nlog₃(x) = 4 → x = 3⁴ = **81**"}'),
  (mod_id, 'exercise', 2, '{"question":"Чему равно log₂(1/8)?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '−3',  true,  1),
  ((SELECT id FROM ex), '3',   false, 2),
  ((SELECT id FROM ex), '1/3', false, 3),
  ((SELECT id FROM ex), '−8',  false, 4);

  -- ── §17 Квадратные уравнения ─────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'kvadratnye-uravneniya', '§17. Квадратные уравнения', 17)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**Квадратное уравнение:** ax² + bx + c = 0, a ≠ 0.\n**Дискриминант:** D = b² − 4ac.\n- D > 0 → два различных вещественных корня\n- D = 0 → один корень (двойной)\n- D < 0 → нет вещественных корней\n\n**Формула корней:** x = (−b ± √D) / (2a)\n\n**Теорема Виета:** x₁ + x₂ = −b/a; x₁ · x₂ = c/a\n\n**Примеры:**\nx²−5x+6=0: D=1; x=(5±1)/2 → **x₁=3, x₂=2** ✓ (3+2=5; 3·2=6)\n2x²−4x+2=0: D=0; x=4/4=**1** (двойной корень)"}'),
  (mod_id, 'exercise', 2, '{"question":"Каковы корни уравнения x² − 7x + 12 = 0?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), 'x₁=3, x₂=4', true,  1),
  ((SELECT id FROM ex), 'x₁=2, x₂=6', false, 2),
  ((SELECT id FROM ex), 'x₁=1, x₂=12',false, 3),
  ((SELECT id FROM ex), 'x₁=−3, x₂=−4',false,4);

  -- ── §18 Аналитическая геометрия ──────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'analiticheska-ya-geometriya', '§18. Аналитическая геометрия', 18)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"Аналитическая геометрия устанавливает связь между геометрическими фигурами и алгебраическими уравнениями.\n\n**Расстояние:** |AB| = √((x₂−x₁)² + (y₂−y₁)²)\n**Прямая:** y = kx + b; k = tg α\n**Окружность:** (x−a)² + (y−b)² = r² с центром (a,b)\n**Парабола:** y = ax²\n\n**Примеры:**\nA(1,2) до B(4,6): √(9+16) = **5**\nПрямая через (0,3) и (2,7): k=(7−3)/(2−0)=2; b=3 → **y = 2x+3**"}'),
  (mod_id, 'exercise', 2, '{"question":"Чему равно расстояние от A(−2, 3) до B(2, 0)?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '5',   true,  1),
  ((SELECT id FROM ex), '7',   false, 2),
  ((SELECT id FROM ex), '3',   false, 3),
  ((SELECT id FROM ex), '√7',  false, 4);

  -- ── §19 Комбинаторика ────────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'kombinatorika', '§19. Комбинаторика', 19)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"Комбинаторика изучает способы выбора и расстановки объектов.\n\n**Перестановки Pₙ** = n! = 1·2·3·…·n (расставить n объектов)\n**Размещения Aₙᵏ** = n!/(n−k)! (выбрать k из n, порядок важен)\n**Сочетания Cₙᵏ** = n!/(k!(n−k)!) (выбрать k из n, порядок не важен)\n\n**Примеры:**\n5 книг расставить: P₅ = 120 способами\n3-значные числа из {1,2,3,4,5}: A₅³ = 60\nКомиссия 3 из 7: C₇³ = 35"}'),
  (mod_id, 'exercise', 2, '{"question":"В шахматном турнире 8 участников. Каждые двое сыграли по одной партии. Сколько партий сыграно?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '28',  true,  1),
  ((SELECT id FROM ex), '56',  false, 2),
  ((SELECT id FROM ex), '16',  false, 3),
  ((SELECT id FROM ex), '64',  false, 4);

  -- ── §20 Теория вероятностей ──────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'teoriya-veroyatnostey', '§20. Теория вероятностей', 20)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**Вероятность события A:** P(A) = m/n, где m — число благоприятных исходов, n — общее число равновозможных исходов.\n0 ≤ P(A) ≤ 1\n\n**Сумма несовместных событий:** P(A∪B) = P(A) + P(B)\n**Независимые события:** P(A∩B) = P(A)·P(B)\n\n**Примеры:**\nВыпадение шестёрки на кубике: P = 1/6 ≈ 0,167\nДва выстрела, P(попасть)=0,7 каждый: P(оба попали) = 0,7·0,7 = **0,49**"}'),
  (mod_id, 'exercise', 2, '{"question":"Из 30 билетов 5 выигрышных. Какова вероятность выиграть?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '1/6',  true,  1),
  ((SELECT id FROM ex), '1/5',  false, 2),
  ((SELECT id FROM ex), '5',    false, 3),
  ((SELECT id FROM ex), '1/30', false, 4);

  -- ── §21 Пределы и непрерывность ──────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'predely-i-nepreryvnost', '§21. Пределы и непрерывность', 21)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**Предел последовательности:** число L — предел {aₙ}, если для любого ε > 0 существует N: при n > N выполняется |aₙ − L| < ε. Запись: lim(n→∞) aₙ = L.\n\n**Замечательные пределы:**\nlim(x→0) sin(x)/x = 1\nlim(x→∞) (1 + 1/x)ˣ = e ≈ 2,71828\n\n**Примеры:**\nlim(x→2) (x²−4)/(x−2) = lim(x+2) = **4**\nlim(n→∞) (3n²+1)/(n²−2) = **3** (делим на n²)"}'),
  (mod_id, 'quote', 2, '{"text":"Бесконечно малые величины — не нуль, но и не конкретное число; это процесс стремления к нулю.","author":"О. Коши"}'),
  (mod_id, 'exercise', 3, '{"question":"Чему равен lim(x→∞) (2x+1)/(x−3)?"}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '2',    true,  1),
  ((SELECT id FROM ex), '0',    false, 2),
  ((SELECT id FROM ex), '∞',   false, 3),
  ((SELECT id FROM ex), '1/3',  false, 4);

  -- ── §22 Производная ──────────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'proizvodnaya', '§22. Производная', 22)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**Производная** f''(x) = lim(Δx→0) [f(x+Δx) − f(x)] / Δx — мгновенная скорость изменения функции.\n\n**Таблица:**\n(c)'' = 0; (xⁿ)'' = nxⁿ⁻¹; (sinx)'' = cosx; (cosx)'' = −sinx\n(eˣ)'' = eˣ; (ln x)'' = 1/x\n\n**Правила:** (u+v)'' = u''+v''; (uv)'' = u''v + uv''; (u/v)'' = (u''v − uv'')/v²\n\n**Примеры:**\nf(x) = 3x⁴−5x²+2x−7 → f''(x) = 12x³−10x+2\ny = x³−3x → y'' = 3x²−3 = 0 при x=±1\n(x=1: минимум y=−2; x=−1: максимум y=2)"}'),
  (mod_id, 'exercise', 2, '{"question":"Найдите производную f(x) = 5x³ − 2x + 1."}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '15x² − 2',   true,  1),
  ((SELECT id FROM ex), '5x² − 2',    false, 2),
  ((SELECT id FROM ex), '15x² − 2x',  false, 3),
  ((SELECT id FROM ex), '5x³ − 2',    false, 4);

  -- ── §23 Интеграл ─────────────────────────────────────────
  INSERT INTO modules (subject_id, slug, title, sort_order)
  VALUES (mat_id, 'integral', '§23. Интеграл', 23)
  RETURNING id INTO mod_id;

  INSERT INTO blocks (module_id, type, sort_order, content) VALUES
  (mod_id, 'text', 1, '{"body":"**Первообразная** F(x) для f(x): F''(x) = f(x).\n**Неопределённый интеграл:** ∫f(x)dx = F(x) + C\n**Определённый интеграл:** ∫[a,b] f(x)dx = F(b) − F(a)\n\n**Таблица:**\n∫xⁿdx = xⁿ⁺¹/(n+1) + C (n ≠ −1)\n∫sin(x)dx = −cos(x) + C\n∫eˣdx = eˣ + C\n∫(1/x)dx = ln|x| + C\n\n**Примеры:**\n∫(3x²−2x+5)dx = x³−x²+5x + C\nПлощадь под y=x² от 0 до 3: [x³/3]₀³ = 9−0 = **9**"}'),
  (mod_id, 'quote', 2, '{"text":"Дифференциальное и интегральное исчисление — величайшее открытие человеческого ума.","author":"Г. В. Лейбниц"}'),
  (mod_id, 'exercise', 3, '{"question":"Вычислите определённый интеграл ∫[0,2] (x²+1)dx."}');

  WITH ex AS (SELECT id FROM blocks WHERE module_id = mod_id AND type = 'exercise' LIMIT 1)
  INSERT INTO exercise_options (block_id, text, is_correct, sort_order) VALUES
  ((SELECT id FROM ex), '14/3',  true,  1),
  ((SELECT id FROM ex), '6',     false, 2),
  ((SELECT id FROM ex), '10/3',  false, 3),
  ((SELECT id FROM ex), '5',     false, 4);

END $$;
