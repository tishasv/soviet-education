import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const SB_URL = 'https://nvlaewkiihiypfqvssom.supabase.co'
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bGFld2tpaWhpeXBmcXZzc29tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzEyMDUwNiwiZXhwIjoyMDkyNjk2NTA2fQ.OQ97yFdj5b0LW57fOAJeWf_yOntaP2CWvbW9f7dZ2j8'

const MODULES: any[] = [
  { slug:'schet-i-chisla',title:'§1. Счёт и числа',order:1,blocks:[{type:'text',order:1,content:{body:'Математика есть наука о количественных отношениях действительного мира.\n\n**Натуральные числа** возникли из потребности считать предметы. Ряд: 1, 2, 3, … — бесконечен.\n\nЧисла записываются цифрами: **0–9**. Значение цифры определяется её **разрядом**.\n\nРазряды: *единицы → десятки → сотни → тысячи* — каждый в 10 раз больше предыдущего.'}},{type:'quote',order:2,content:{text:'Числа управляют миром.',author:'Пифагор',source:'Древнегреческая математика'}},{type:'text',order:3,content:{body:'**Разбор числа 3 475:** 3 тысячи + 4 сотни + 7 десятков + 5 единиц.\n\n**Сравнение:** 748 > 479, так как 7 сотен > 4 сотен.'}},{type:'exercise',order:4,content:{question:'Какая цифра стоит в разряде сотен в числе 7 382?'},options:[{text:'7',correct:false},{text:'3',correct:true},{text:'8',correct:false},{text:'2',correct:false}]}]},
  { slug:'slozhenie-i-vychitanie',title:'§2. Сложение и вычитание',order:2,blocks:[{type:'text',order:1,content:{body:'**Сложение:** а + б = с. **Вычитание:** с − б = а.\n\nСвойства: а+б=б+а; (а+б)+в=а+(б+в); а+0=а'}},{type:'text',order:2,content:{body:'4 728 + 1 563 = **6 291**\nx + 345 = 1 000 → x = **655**'}},{type:'exercise',order:3,content:{question:'Чему равно: 5 003 − 1 478?'},options:[{text:'3 525',correct:true},{text:'3 625',correct:false},{text:'4 525',correct:false},{text:'3 515',correct:false}]}]},
  { slug:'umnozhenie-i-delenie',title:'§3. Умножение и деление',order:3,blocks:[{type:'text',order:1,content:{body:'**Умножение:** а·б=с. **Деление:** с÷б=а.\n\nСвойства: а·б=б·а; а·(б+в)=а·б+а·в; а·0=0; а·1=а\n\n347×26=**9 022**; 1 579÷7=**225** (ост.4)'}},{type:'exercise',order:2,content:{question:'Чему равно: 4 · 25 · 13 · 0 · 7?'},options:[{text:'0',correct:true},{text:'9 100',correct:false},{text:'3 640',correct:false},{text:'1 300',correct:false}]}]},
  { slug:'prostye-drobi',title:'§4. Простые дроби',order:4,blocks:[{type:'text',order:1,content:{body:'**Дробь** а/б: а — числитель, б — знаменатель (б≠0).\nПравильная (а<б); Неправильная (а≥б); Смешанное: 3½\n\n3/8+5/8=1; 1/3+1/4=7/12; 2/3×3/5=2/5'}},{type:'quote',order:2,content:{text:'Дробное число есть часть или части единицы.',author:'Л. Ф. Магницкий',source:'Арифметика, 1703 г.'}},{type:'exercise',order:3,content:{question:'Чему равно: 3/4 × 8/9?'},options:[{text:'2/3',correct:true},{text:'11/13',correct:false},{text:'3/4',correct:false},{text:'1/3',correct:false}]}]},
  { slug:'edinitsy-izmeneniya',title:'§5. Единицы измерения',order:5,blocks:[{type:'text',order:1,content:{body:'**Метрическая система:**\n1 км=1000 м; 1 т=1000 кг; 1 ч=60 мин; 1 га=10 000 м²\n\n3 км 450 м = **3 450 м**; 4 ч 35 мин = **275 мин**'}},{type:'exercise',order:2,content:{question:'Поезд прошёл 780 км за 10 часов. Какова средняя скорость?'},options:[{text:'78 км/ч',correct:true},{text:'70 км/ч',correct:false},{text:'780 км/ч',correct:false},{text:'88 км/ч',correct:false}]}]},
  { slug:'geometriya-figury',title:'§6. Геометрия: фигуры',order:6,blocks:[{type:'text',order:1,content:{body:'**Прямоугольник:** P=2(a+b); S=a·b\n**Треугольник:** S=½·a·h\n**Круг:** C=2πr; S=πr² (π≈3,14)\n\n8×5 м: S=**40 м²**; r=7: C=**43,96 см**'}},{type:'exercise',order:2,content:{question:'Площадь круглого пруда 314 м². Радиус? (π=3,14)'},options:[{text:'10 м',correct:true},{text:'5 м',correct:false},{text:'100 м',correct:false},{text:'50 м',correct:false}]}]},
  { slug:'tekstovye-zadachi',title:'§7. Текстовые задачи',order:7,blocks:[{type:'text',order:1,content:{body:'**анализ → план → вычисления → проверка**\n\nДва трактора (12+9=21 га/день): 84÷21=**4 дня**\nБассейн (1/6+1/4=5/12/ч): **2 ч 24 мин**'}},{type:'exercise',order:2,content:{question:'Поезд: 1 260 км за 14 ч. Сколько за 9 ч?'},options:[{text:'810 км',correct:true},{text:'900 км',correct:false},{text:'756 км',correct:false},{text:'630 км',correct:false}]}]},
  { slug:'algebra-osnovy',title:'§8. Алгебра: основы',order:8,blocks:[{type:'text',order:1,content:{body:'Алгебра заменяет числа буквами.\n\n4x+3y−2x+y = **2x+4y**\n3(2a−4b) = 6a−12b\n2(3x−4)−3(x−2) = **3x−2**'}},{type:'quote',order:2,content:{text:'Алгебра — это великодушная наука: она принимает числа любые.',author:'Н. И. Лобачевский'}},{type:'exercise',order:3,content:{question:'Вычислите 5x² − 3x + 1 при x = 2.'},options:[{text:'15',correct:true},{text:'11',correct:false},{text:'23',correct:false},{text:'3',correct:false}]}]},
  { slug:'uravneniya',title:'§9. Уравнения',order:9,blocks:[{type:'text',order:1,content:{body:'Линейное ax+b=0: x=−b/a.\nОбе части можно складывать/умножать на ненулевое число.\n\n3x−7=14 → **x=7**\nСистема {2x+y=7; x−y=2} → **x=3, y=1**'}},{type:'exercise',order:2,content:{question:'Отец вдвое старше сына, вместе 48 лет. Сколько сыну?'},options:[{text:'16 лет',correct:true},{text:'12 лет',correct:false},{text:'24 года',correct:false},{text:'18 лет',correct:false}]}]},
  { slug:'geometriya-evklida',title:'§10. Геометрия Евклида',order:10,blocks:[{type:'text',order:1,content:{body:'**Сумма углов треугольника = 180°**\n**Теорема Пифагора:** c²=a²+b²\nКатеты 3,4: c=**5**; Гипотенуза 13, катет 5: b=**12**'}},{type:'quote',order:2,content:{text:'Нет царского пути в геометрии.',author:'Евклид',source:'Ответ царю Птолемею'}},{type:'exercise',order:3,content:{question:'Углы треугольника 47° и 63°. Третий?'},options:[{text:'70°',correct:true},{text:'80°',correct:false},{text:'110°',correct:false},{text:'90°',correct:false}]}]},
  { slug:'proportsii-i-protsenty',title:'§11. Пропорции и проценты',order:11,blocks:[{type:'text',order:1,content:{body:'**Пропорция** a/b=c/d: a·d=b·c. **Процент** — 1/100.\n\n35% от 2400=**840**; 480 от 1200=**40%**\nЦена +20%=3600 → начальная=**3000 руб.**'}},{type:'exercise',order:2,content:{question:'План 5 000, перевыполнение 8%. Сколько произведено?'},options:[{text:'5 400',correct:true},{text:'5 080',correct:false},{text:'4 600',correct:false},{text:'5 800',correct:false}]}]},
  { slug:'stepeni-i-korni',title:'§12. Степени и корни',order:12,blocks:[{type:'text',order:1,content:{body:'**aⁿ** — n множителей. **√a=b** если b²=a, b≥0.\n\naᵐ·aⁿ=aᵐ⁺ⁿ; aᵐ÷aⁿ=aᵐ⁻ⁿ; a⁰=1; a⁻ⁿ=1/aⁿ\n\n2⁵·2³=**256**; √144=**12**; (3x²)³=**27x⁶**'}},{type:'exercise',order:2,content:{question:'(2³ · 4²) ÷ 2⁵ = ?'},options:[{text:'4',correct:true},{text:'8',correct:false},{text:'16',correct:false},{text:'2',correct:false}]}]},
  { slug:'funktsii-i-grafiki',title:'§13. Функции и графики',order:13,blocks:[{type:'text',order:1,content:{body:'**y=f(x):** каждому x — единственное y.\n**Линейная** y=kx+b — прямая.\n**Квадратичная** y=ax²+bx+c — парабола. Вершина: x₀=−b/(2a).\n\ny=x²−4x+3: вершина (2;−1), нули x=1 и x=3'}},{type:'exercise',order:2,content:{question:'При каком x функция y = 2x + 7 равна нулю?'},options:[{text:'x = −3,5',correct:true},{text:'x = 3,5',correct:false},{text:'x = 7',correct:false},{text:'x = −7',correct:false}]}]},
  { slug:'neravenstva',title:'§14. Неравенства',order:14,blocks:[{type:'text',order:1,content:{body:'При умножении на **отрицательное** — знак меняется.\n\n3x−5>7 → **x>4**; −2x+3≤11 → **x≥−4**\nСистема x>2 и x≤7 → **2<x≤7**'}},{type:'exercise',order:2,content:{question:'Решите: −3x + 6 > 0.'},options:[{text:'x < 2',correct:true},{text:'x > 2',correct:false},{text:'x < −2',correct:false},{text:'x > −2',correct:false}]}]},
  { slug:'trigonometriya',title:'§15. Тригонометрия',order:15,blocks:[{type:'text',order:1,content:{body:'sinα=катет/гип.; cosα=прил./гип.; tgα=sinα/cosα\n**sin²α+cos²α=1**\n\nsin30°=1/2; sin45°=√2/2; sin60°=√3/2\nsin(α+β)=sinα·cosβ+cosα·sinβ'}},{type:'exercise',order:2,content:{question:'Чему равно sin²30° + cos²30°?'},options:[{text:'1',correct:true},{text:'1/2',correct:false},{text:'√3/2',correct:false},{text:'0',correct:false}]}]},
  { slug:'logarifmy',title:'§16. Логарифмы',order:16,blocks:[{type:'text',order:1,content:{body:'**log_a(b)=c** ⟺ aᶜ=b (a>0,a≠1,b>0).\nlg=log₁₀; ln=logₑ (e≈2,718)\n\nlog_a(mn)=log_a(m)+log_a(n); log_a(mⁿ)=n·log_a(m)\nlog₂(8)=**3**; lg100=**2**; log₃(x)=4→x=**81**'}},{type:'exercise',order:2,content:{question:'Чему равно log₂(1/8)?'},options:[{text:'−3',correct:true},{text:'3',correct:false},{text:'1/3',correct:false},{text:'−8',correct:false}]}]},
  { slug:'kvadratnye-uravneniya',title:'§17. Квадратные уравнения',order:17,blocks:[{type:'text',order:1,content:{body:'**ax²+bx+c=0**. D=b²−4ac.\nx=(−b±√D)/(2a). D>0: два; D=0: один; D<0: нет.\n\n**Виета:** x₁+x₂=−b/a; x₁·x₂=c/a\nx²−5x+6=0 → **x₁=3, x₂=2** ✓'}},{type:'exercise',order:2,content:{question:'Корни уравнения x² − 7x + 12 = 0?'},options:[{text:'x₁=3, x₂=4',correct:true},{text:'x₁=2, x₂=6',correct:false},{text:'x₁=1, x₂=12',correct:false},{text:'x₁=−3, x₂=−4',correct:false}]}]},
  { slug:'analiticheska-ya-geometriya',title:'§18. Аналитическая геометрия',order:18,blocks:[{type:'text',order:1,content:{body:'|AB|=√((x₂−x₁)²+(y₂−y₁)²)\nПрямая: y=kx+b; Окружность: (x−a)²+(y−b)²=r²\n\nA(1,2)→B(4,6): **5**; Через (0,3),(2,7): **y=2x+3**'}},{type:'exercise',order:2,content:{question:'Расстояние от A(−2,3) до B(2,0)?'},options:[{text:'5',correct:true},{text:'7',correct:false},{text:'3',correct:false},{text:'√7',correct:false}]}]},
  { slug:'kombinatorika',title:'§19. Комбинаторика',order:19,blocks:[{type:'text',order:1,content:{body:'**Pₙ=n!** — перестановки\n**Aₙᵏ=n!/(n−k)!** — размещения (порядок важен)\n**Cₙᵏ=n!/(k!(n−k)!)** — сочетания\n\nP₅=**120**; A₅³=**60**; C₇³=**35**'}},{type:'exercise',order:2,content:{question:'Турнир 8 участников, каждые двое — по 1 партии. Сколько?'},options:[{text:'28',correct:true},{text:'56',correct:false},{text:'16',correct:false},{text:'64',correct:false}]}]},
  { slug:'teoriya-veroyatnostey',title:'§20. Теория вероятностей',order:20,blocks:[{type:'text',order:1,content:{body:'**P(A)=m/n** (m благоприятных, n всего). 0≤P≤1.\nНесовместные: P(A∪B)=P(A)+P(B)\nНезависимые: P(A∩B)=P(A)·P(B)\n\nШестёрка: 1/6; Два выстрела P=0,7: **0,49**'}},{type:'exercise',order:2,content:{question:'30 билетов, 5 выигрышных. Вероятность выиграть?'},options:[{text:'1/6',correct:true},{text:'1/5',correct:false},{text:'1/30',correct:false},{text:'5',correct:false}]}]},
  { slug:'predely-i-nepreryvnost',title:'§21. Пределы и непрерывность',order:21,blocks:[{type:'text',order:1,content:{body:'**lim aₙ=L**: ∀ε>0 ∃N: n>N → |aₙ−L|<ε.\n\nlim(x→0)sinx/x=**1**; lim(1+1/x)ˣ=**e≈2,718**\nlim(x→2)(x²−4)/(x−2)=**4**; lim(3n²+1)/(n²−2)=**3**'}},{type:'quote',order:2,content:{text:'Бесконечно малые — не нуль, но процесс стремления к нулю.',author:'О. Коши'}},{type:'exercise',order:3,content:{question:'lim(x→∞) (2x+1)/(x−3) = ?'},options:[{text:'2',correct:true},{text:'0',correct:false},{text:'∞',correct:false},{text:'1/3',correct:false}]}]},
  { slug:'proizvodnaya',title:'§22. Производная',order:22,blocks:[{type:'text',order:1,content:{body:"f'(x)=lim[f(x+Δx)−f(x)]/Δx\n\n(c)'=0; (xⁿ)'=nxⁿ⁻¹; (sinx)'=cosx; (eˣ)'=eˣ; (lnx)'=1/x\n\n3x⁴−5x²+2x → **12x³−10x+2**\ny=x³−3x: экстремумы при x=±1"}},{type:'exercise',order:2,content:{question:"f(x) = 5x³ − 2x + 1. Найдите f'(x)."},options:[{text:'15x² − 2',correct:true},{text:'5x² − 2',correct:false},{text:'15x² − 2x',correct:false},{text:'5x³ − 2',correct:false}]}]},
  { slug:'integral',title:'§23. Интеграл',order:23,blocks:[{type:'text',order:1,content:{body:"F'(x)=f(x) — первообразная.\n∫f(x)dx=F(x)+C; ∫[a,b]f(x)dx=F(b)−F(a)\n\n∫xⁿdx=xⁿ⁺¹/(n+1)+C; ∫sinxdx=−cosx+C; ∫eˣdx=eˣ+C\n\n∫(3x²−2x+5)dx=x³−x²+5x+C; ∫[0,3]x²dx=**9**"}},{type:'quote',order:2,content:{text:'Дифференциальное и интегральное исчисление — величайшее открытие человеческого ума.',author:'Г. В. Лейбниц'}},{type:'exercise',order:3,content:{question:'∫[0,2] (x²+1)dx = ?'},options:[{text:'14/3',correct:true},{text:'6',correct:false},{text:'10/3',correct:false},{text:'5',correct:false}]}]},
]

async function upsert(sb: any, table: string, data: any, matchKey: string) {
  const { data: existing } = await sb.from(table).select('id').eq(matchKey, data[matchKey]).maybeSingle()
  if (existing) return existing.id
  const { data: created } = await sb.from(table).insert(data).select('id').single()
  return created?.id
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  if (searchParams.get('secret') !== 'seed-math-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const sb = createClient(SB_URL, SB_KEY)

  // 1. Ensure category exists
  const catId = await upsert(sb, 'categories', {
    slug: 'tochnye-nauki', label: 'Точные науки', sort_order: 3
  }, 'slug')
  if (!catId) return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })

  // 2. Ensure subject exists
  const subId = await upsert(sb, 'subjects', {
    category_id: catId, slug: 'matematika', label: 'Математика', year: 1954, sort_order: 2
  }, 'slug')
  if (!subId) return NextResponse.json({ error: 'Failed to create subject' }, { status: 500 })

  // 3. Seed modules
  const { data: existing } = await sb.from('modules').select('slug').eq('subject_id', subId)
  const done = new Set((existing || []).map((m: any) => m.slug))
  const results: string[] = []

  for (const m of MODULES) {
    if (done.has(m.slug)) { results.push('skip: ' + m.title); continue }

    const { data: mod } = await sb.from('modules')
      .insert({ subject_id: subId, slug: m.slug, title: m.title, sort_order: m.order })
      .select('id').single()
    if (!mod) { results.push('ERROR: ' + m.title); continue }

    for (const b of m.blocks) {
      const { content, options, type, order } = b
      const { data: blk } = await sb.from('blocks')
        .insert({ module_id: mod.id, type, sort_order: order, content })
        .select('id').single()
      if (blk && options) {
        await sb.from('exercise_options').insert(
          options.map((o: any, i: number) => ({ block_id: blk.id, text: o.text, is_correct: o.correct, sort_order: i+1 }))
        )
      }
    }
    results.push('ok: ' + m.title)
  }

  return NextResponse.json({
    success: true,
    category_id: catId,
    subject_id: subId,
    inserted: results.filter(r => r.startsWith('ok')).length,
    results
  })
}
