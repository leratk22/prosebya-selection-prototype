const GROUPS = [
  {
    id: 'mood',
    name: 'Моё состояние',
    topics: [
      'Плохое настроение',
      'Мысли о суициде',
      'Рассеянность',
      'Эмоциональное напряжение',
      'Страх и тревога',
      'Перепады настроения',
      'Раздражительность',
      'Апатия',
      'Проблема с питанием и весом',
      'Сексуальное здоровье',
      'Хроническая болезнь',
      'Химическая зависимость',
      'Принятие своего тела',
      'Панические атаки',
      'Проблемы со сном',
      'Нехимическая зависимость',
    ],
  },
  {
    id: 'events',
    name: 'События в жизни',
    topics: [
      'Развод',
      'Потеря работы',
      'Горе и утрата',
      'Насилие',
      'Страх смерти',
    ],
  },
  {
    id: 'work',
    name: 'Работа, учёба',
    topics: [
      'Продуктивность в работе',
      'Прокрастинация',
      'Финансовая эффективность',
      'Стресс и выгорание',
      'Баланс работы и жизни',
      'Лидерство и управление',
      'Профессиональный рост',
      'Самоопределение',
      'Конфликты на работе',
      'Отношения в коллективе',
    ],
  },
  {
    id: 'relations',
    name: 'Отношения',
    topics: [
      'Чувство одиночества',
      'Трудности в общении',
      'Отношения с детьми',
      'Отношения в паре',
      'Конфликты с близкими',
      'Отношения в семье',
      'Взросление и сепарация',
      'Трудно принимать решения',
      'Проблемы с самооценкой',
      'Творческое развитие',
      'Поиск себя и смысла жизни',
      'Личные границы',
    ],
  },
];

const TOPIC_TO_GROUP = {};
GROUPS.forEach((g) => g.topics.forEach((t) => { TOPIC_TO_GROUP[t] = g.id; }));

const MATCH_INDEX = [
  { topic: 'Плохое настроение', kw: ['настроени', 'груст', 'тоск', 'уныл', 'хандр'], ex: ['постоянно грустно', 'все тоскливо', 'настроения нет', 'грущу без причины'] },
  { topic: 'Мысли о суициде', kw: ['суицид', 'самоубий', 'поконч'], ex: ['не хочу жить', 'покончить с собой', 'суицидальные мысли', 'жить не хочется'] },
  { topic: 'Рассеянность', kw: ['рассеян', 'невнимател', 'забыв', 'концентрац', 'сосредоточ'], ex: ['не могу сосредоточиться', 'все забываю', 'вылетает из головы', 'невнимательный стал'] },
  { topic: 'Эмоциональное напряжение', kw: ['напряжен', 'нервнича', 'истощ', 'взводе'], ex: ['постоянно на нервах', 'внутреннее напряжение', 'не могу расслабиться', 'весь на взводе'] },
  { topic: 'Страх и тревога', kw: ['страх', 'тревог', 'тревож', 'боязн', 'волну', 'боюсь'], ex: ['постоянная тревога', 'панически боюсь', 'страшно за будущее', 'тревожность не отпускает', 'боюсь летать на самолете', 'страшно высоты и темноты'] },
  { topic: 'Перепады настроения', kw: ['перепад', 'нестабильн', 'скачет'], ex: ['настроение скачет', 'то смех то слезы', 'эмоциональные качели'] },
  { topic: 'Раздражительность', kw: ['раздраж', 'злю', 'злит', 'агресс', 'срыва', 'бесят'], ex: ['все раздражает', 'срываюсь на близких', 'постоянно злюсь', 'агрессия на ровном месте'] },
  { topic: 'Апатия', kw: ['апати', 'безразлич', 'вял', 'безэмоциональн'], ex: ['полная апатия', 'ничего не хочется', 'безразличие ко всему', 'нет никаких эмоций'] },
  { topic: 'Проблема с питанием и весом', kw: ['питани', 'вес', 'переед', 'анорекс', 'булими', 'диет', 'похуд'], ex: ['заедаю стресс', 'не могу похудеть', 'переедаю по вечерам', 'расстройство пищевого поведения'] },
  { topic: 'Сексуальное здоровье', kw: ['сексуальн', 'секс', 'либид', 'интимн'], ex: ['пропало либидо', 'проблемы в интимной жизни', 'нет влечения к партнеру'] },
  { topic: 'Хроническая болезнь', kw: ['хронич', 'болезн', 'заболева', 'диагноз'], ex: ['хроническое заболевание', 'постоянно болею', 'поставили диагноз', 'тяжело жить с болезнью'] },
  { topic: 'Химическая зависимость', kw: ['алког', 'наркот', 'курени', 'вейп', 'спайс'], ex: ['тяну к алкоголю', 'не могу бросить пить', 'зависимость от веществ', 'запиваю проблемы'] },
  { topic: 'Принятие своего тела', kw: ['тело', 'внешност', 'зеркал', 'отражен'], ex: ['не принимаю свое тело', 'не нравлюсь себе в зеркале', 'недовольна своей внешностью'] },
  { topic: 'Панические атаки', kw: ['паническ', 'паник'], ex: ['панические атаки', 'внезапный приступ страха и сердцебиения', 'накрывает паника'] },
  { topic: 'Проблемы со сном', kw: ['сон', 'сном', 'бессонниц', 'спать', 'засыпа', 'просыпа', 'кошмар'], ex: ['не могу уснуть', 'постоянная бессонница', 'просыпаюсь среди ночи', 'кошмарные сны'] },
  { topic: 'Нехимическая зависимость', kw: ['игров', 'казино', 'ставки', 'гаджет', 'интернет', 'соцсет', 'лудоман'], ex: ['зависимость от телефона', 'играю днями и ночами', 'залипаю в соцсетях', 'ставки на спорт затянули'] },
  { topic: 'Развод', kw: ['развод', 'расста', 'разрыв', 'ушел', 'ушла'], ex: ['разводимся с мужем', 'разошлись с партнером', 'расстались после долгих отношений', 'подала на развод'] },
  { topic: 'Потеря работы', kw: ['уволил', 'увольнен', 'сокращен'], ex: ['меня уволили', 'сокращение на работе', 'потерял работу', 'попал под сокращение'] },
  { topic: 'Горе и утрата', kw: ['горе', 'утрата', 'умер', 'смерт', 'похорон'], ex: ['умер близкий человек', 'переживаю утрату', 'потерял родного человека', 'не могу отпустить горе'] },
  { topic: 'Насилие', kw: ['насили', 'абьюз', 'избива', 'травл', 'буллинг'], ex: ['пережил насилие', 'домашний абьюз', 'травля в коллективе', 'муж поднимает руку'] },
  { topic: 'Страх смерти', kw: ['танатофоб'], ex: ['боюсь умереть', 'панически боюсь смерти', 'мысли о смерти не отпускают'] },
  { topic: 'Продуктивность в работе', kw: ['продуктивн', 'успева', 'дедлайн', 'эффективн'], ex: ['не успеваю ничего', 'низкая продуктивность', 'не справляюсь с задачами', 'все валится из рук'] },
  { topic: 'Прокрастинация', kw: ['прокрастинац', 'откладыва', 'лень'], ex: ['все откладываю на потом', 'прокрастинирую', 'не могу заставить себя начать'] },
  { topic: 'Финансовая эффективность', kw: ['финанс', 'деньг', 'денег', 'долг', 'доход'], ex: ['постоянно нет денег', 'не могу контролировать траты', 'долги растут', 'денег хватает впритык'] },
  { topic: 'Стресс и выгорание', kw: ['стресс', 'выгоран', 'выгорел', 'сгорел'], ex: ['выгорел на работе', 'постоянный стресс', 'работа выматывает', 'эмоционально сгорел'] },
  { topic: 'Баланс работы и жизни', kw: ['баланс', 'перерабат', 'отдых'], ex: ['работа съедает всю жизнь', 'нет баланса между работой и отдыхом', 'перерабатываю каждый день'] },
  { topic: 'Лидерство и управление', kw: ['лидер', 'управлен', 'руководител', 'команд'], ex: ['стал руководителем', 'сложно управлять командой', 'тяжело быть лидером'] },
  { topic: 'Профессиональный рост', kw: ['профессиональн', 'карьер', 'квалификац'], ex: ['карьерный рост застрял', 'хочу развиваться в профессии', 'нет роста в карьере', 'стою на месте в работе'] },
  { topic: 'Самоопределение', kw: ['самоопредел', 'призван'], ex: ['не знаю кем хочу работать', 'поиск призвания', 'самоопределение в карьере'] },
  { topic: 'Конфликты на работе', kw: ['конфликт', 'начальств', 'подчинен'], ex: ['конфликт с начальником', 'ссоры на работе', 'тяжело с руководителем'] },
  { topic: 'Отношения в коллективе', kw: ['коллектив', 'коллег'], ex: ['сложные коллеги', 'не ладится с коллективом', 'напряженные отношения с коллегой'] },
  { topic: 'Чувство одиночества', kw: ['одинок', 'никому', 'изоляц'], ex: ['чувство одиночества', 'никого рядом нет', 'одиноко очень', 'нет близких людей'] },
  { topic: 'Трудности в общении', kw: ['общен', 'знаком', 'стесня', 'социофоб', 'разговор', 'говорить', 'друз', 'подруг'], ex: ['трудно знакомиться', 'не умею общаться', 'стесняюсь людей', 'тяжело поддерживать разговор', 'тяжело без друзей на новом месте'] },
  { topic: 'Отношения с детьми', kw: ['дет', 'ребен', 'сын', 'сына', 'доч', 'подрост', 'воспитан', 'школ', 'воруе'], ex: ['сын ворует в школе', 'трудный подросток', 'не понимаю ребенка', 'дочь не слушается'] },
  { topic: 'Отношения в паре', kw: ['паре', 'партнер', 'муж', 'жен', 'парень', 'девушк'], ex: ['ссоримся с мужем', 'отношения с партнером зашли в тупик', 'проблемы с девушкой', 'в паре все сложно'] },
  { topic: 'Конфликты с близкими', kw: ['близк', 'ссор', 'руга'], ex: ['конфликты с близкими', 'постоянные ссоры дома', 'ругаемся по мелочам'] },
  { topic: 'Отношения в семье', kw: ['семь', 'семей', 'родител', 'мама', 'папа', 'мать', 'отец', 'свекр', 'тещ'], ex: ['тяжело с родителями', 'конфликты в семье', 'мама постоянно вмешивается', 'напряженные отношения с отцом'] },
  { topic: 'Взросление и сепарация', kw: ['сепарац', 'взрослени', 'самостоятельн'], ex: ['хочу жить отдельно от родителей', 'трудно отделиться от семьи', 'взрослею и боюсь самостоятельности'] },
  { topic: 'Трудно принимать решения', kw: ['решени', 'сомнева', 'выбир', 'колебл'], ex: ['не могу принять решение', 'постоянно сомневаюсь', 'тяжело делать выбор'] },
  { topic: 'Проблемы с самооценкой', kw: ['самооцен', 'неуверен', 'ненавижу', 'недоволь'], ex: ['низкая самооценка', 'не уверен в себе', 'ненавижу себя', 'мне кажется я хуже других'] },
  { topic: 'Творческое развитие', kw: ['творчес', 'креатив', 'вдохновен'], ex: ['нет вдохновения', 'хочу развиваться творчески', 'творческий кризис'] },
  { topic: 'Поиск себя и смысла жизни', kw: ['смысл', 'предназначен', 'самопознан', 'поиск'], ex: ['потерял смысл жизни', 'кто я и зачем живу', 'ищу себя', 'непонятно ради чего все'] },
  { topic: 'Личные границы', kw: ['границ', 'манипул', 'используют', 'отказывать'], ex: ['не умею говорить нет', 'мной манипулируют', 'используют меня', 'нет личных границ'] },
];

const STOPWORDS = new Set([
  'могу', 'нет', 'все', 'всему', 'себе', 'свой', 'своя', 'моей', 'меня', 'мне',
  'очень', 'когда', 'чтобы', 'ничего', 'никого', 'постоянно', 'это', 'или',
  'для', 'как', 'так', 'него', 'него', 'жизни', 'жизнь', 'делать', 'человека',
  'после', 'долгих', 'каждый', 'вечер', 'стал', 'днями', 'ночами', 'почему',
]);

MATCH_INDEX.forEach((entry) => {
  entry.all = [...entry.kw];
  (entry.ex || []).forEach((phrase) => {
    phrase.split(' ').forEach((w) => {
      if (w.length >= 5 && !STOPWORDS.has(w) && !entry.all.includes(w)) entry.all.push(w);
    });
  });
});

const CRISIS_RE = /суицид|покончить|не хочу жить|вскры|умереть|навредить себе|самоубий/i;
const SAFETY_TOPIC = 'Мысли о суициде';

const LLM_CONFIG = {
  endpoint: 'https://openrouter.ai/api/v1/chat/completions',
  model: 'openai/gpt-4o-mini',
  apiKey: window.LLM_API_KEY || '',
};

async function classifyWithLLM(text) {
  const topics = GROUPS.flatMap((g) => g.topics);
  const prompt =
    'Ты классификатор запросов к сервису подбора психолога. ' +
    'Сопоставь запрос пользователя с 1–4 темами из списка, опираясь на смысл, а не на совпадение слов. ' +
    'Учитывай морфологию, разговорные формулировки, иронию и обобщения русского языка. ' +
    'Бери темы строго из списка, не выдумывай. Отвечай СТРОГО JSON-массивом строк без пояснений. ' +
    'Если запрос бессвязный или не относится ни к одной теме — верни [].\n\n' +
    'Примеры:\n' +
    'Запрос: «устал от работы, ничего не радует» → ["Стресс и выгорание", "Апатия"]\n' +
    'Запрос: «родители постоянно лезут с советами и злят меня» → ["Отношения в семье", "Раздражительность"]\n' +
    'Запрос: «не могу начать делать задачи, всё откладываю» → ["Прокрастинация"]\n' +
    'Запрос: «всё время ем и не могу остановиться» → ["Проблема с питанием и весом"]\n' +
    'Запрос: «не понимаю зачем всё это, кто я такой» → ["Поиск себя и смысла жизни"]\n' +
    'Запрос: «ываыва ыыва» → []\n\n' +
    `Запрос: «${text}»\n\nСписок тем:\n${topics.join('\n')}`;
  const res = await fetch(LLM_CONFIG.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LLM_CONFIG.apiKey}`,
    },
    body: JSON.stringify({
      model: LLM_CONFIG.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
      max_tokens: 200,
    }),
  });
  if (!res.ok) throw new Error(`LLM ${res.status}`);
  const data = await res.json();
  const content = data.choices[0].message.content;
  const match = content.match(/\[[\s\S]*\]/);
  if (!match) return [];
  const parsed = JSON.parse(match[0]);
  return parsed.filter((t) => topics.includes(t)).slice(0, 4);
}

const state = {
  entry: null,
  freeText: '',
  selected: { mood: [], events: [], work: [], relations: [] },
  suggested: [],
  confirmed: [],
  specialistGender: null,
  classifierResult: 'idle',
  currentGroup: null,
  groupSnapshot: null,
  returnToInput: 's31',
  activeScreen: 's31',
  loaderTimer: null,
};

const $ = (sel) => document.querySelector(sel);
const screens = document.querySelectorAll('[data-screen]');

function show(id, push = true) {
  screens.forEach((s) => s.classList.toggle('active', s.id === id));
  state.activeScreen = id;
  if (push) history.pushState({ screen: id }, '', `#${id}`);
  window.scrollTo(0, 0);
}

window.addEventListener('popstate', (e) => {
  clearTimeout(state.loaderTimer);
  if (state.activeScreen === 's31a' && e.state?.screen !== 's31a' && state.currentGroup) {
    state.selected[state.currentGroup] = [...(state.groupSnapshot || [])];
  }
  render(e.state?.screen || 's31', false);
});

function selectedTopicNames() {
  return GROUPS.flatMap((g) => state.selected[g.id]);
}

function isSafetyTriggered() {
  return selectedTopicNames().includes(SAFETY_TOPIC) || CRISIS_RE.test(state.freeText);
}

/* ---------- screen 3.1 ---------- */

function renderGroups() {
  const list = $('#groupList');
  list.replaceChildren();
  GROUPS.forEach((g) => {
    const chosen = state.selected[g.id];
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'group-row';
    row.dataset.action = 'openGroup';
    row.dataset.group = g.id;

    const head = document.createElement('span');
    head.className = 'group-head';

    const name = document.createElement('span');
    name.className = 'group-name';
    name.textContent = g.name;

    const chev = document.createElement('span');
    chev.className = 'group-chevron';
    chev.innerHTML = '<img src="assets/chevron-right.svg" width="24" height="24" alt="">';

    head.append(name, chev);

    if (chosen.length) {
      const chipsRow = document.createElement('span');
      chipsRow.className = 'chips-row';
      chosen.forEach((topic) => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.textContent = topic;
        chipsRow.append(chip);
      });
      row.append(head, chipsRow);
    } else {
      const sub = document.createElement('span');
      sub.className = 'group-sub';
      sub.textContent = 'Ничего не выбрано';
      row.append(head, sub);
    }
    list.append(row);
  });

  const hasAny = selectedTopicNames().length > 0;
  $('#continueBtn').disabled = !hasAny;
}

/* ---------- screen 3.1a ---------- */

function renderGroupScreen(groupId) {
  const group = GROUPS.find((g) => g.id === groupId);
  state.currentGroup = groupId;
  $('#groupTitle').textContent = group.name;
  const list = $('#topicList');
  list.replaceChildren();
  group.topics.forEach((topic) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'topic-row' + (state.selected[groupId].includes(topic) ? ' checked' : '');
    row.dataset.action = 'toggleTopic';
    row.dataset.topic = topic;
    const box = document.createElement('span');
    box.className = 'topic-check';
    const checked = state.selected[groupId].includes(topic);
    box.innerHTML = `<img class="topic-check-img" src="assets/check-round-${checked ? 'on' : 'off'}.svg" alt="">`;
    row.append(box, document.createTextNode(topic));
    list.append(row);
  });
}

/* ---------- free input ---------- */

function growTextarea(ta) {
  if (!ta.offsetParent) return;
  ta.style.height = 'auto';
  ta.style.height = Math.min(ta.scrollHeight, 176) + 'px';
}

function fillInput(textareaId, counterId, errorId, fieldId) {
  const ta = $(textareaId);
  ta.value = state.freeText;
  growTextarea(ta);
  validateInput(ta, counterId, errorId, fieldId);
}

function validateInput(ta, counterId, errorId, fieldId) {
  state.freeText = ta.value;
  const len = ta.value.length;
  const counter = $(counterId);
  const error = $(errorId);
  const field = $(fieldId);
  counter.textContent = `${len}/200`;
  const tooLong = len > 200;
  field.classList.toggle('error', tooLong);
  error.hidden = !tooLong;
  const valid = ta.value.trim().length > 0 && !tooLong;
  if (fieldId === '#fieldA' || textareaId === '#freeTextA') $('#sendA').disabled = !valid;
  else $('#sendE').disabled = !valid;
  return valid;
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 2) return 3;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[m][n];
}

function wordScore(word, kw) {
  if (word === kw) return 1;
  if (word.length >= 4 && kw.length >= 4 && (word.startsWith(kw) || kw.startsWith(word))) return 1;
  const d = levenshtein(word, kw);
  if (Math.max(word.length, kw.length) >= 7 ? d <= 2 : d <= 1) return 0.7;
  return 0;
}

function classifyFreeText(text) {
  const norm = ' ' + text
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[^a-zа-я0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() + ' ';
  const words = norm.split(' ').filter((w) => w.length >= 3);
  if (words.length === 0) return [];
  const scored = MATCH_INDEX.map((entry) => {
    let weight = 0;
    if ((entry.ex || []).some((phrase) => norm.includes(phrase))) weight += 2;
    words.forEach((w) => {
      let best = 0;
      entry.all.forEach((kw) => {
        best = Math.max(best, wordScore(w, kw));
      });
      weight += best;
    });
    return { topic: entry.topic, weight };
  });
  return scored
    .filter((s) => s.weight >= 0.9)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 4)
    .map((s) => s.topic);
}

function runClassifier() {
  state.classifierResult = 'loading';
  show('s45c');
  const startedAt = Date.now();
  const text = state.freeText;

  const classify = async () => {
    if (text.includes('#error')) return { kind: 'error' };
    let matches = [];
    let llmFailed = false;
    if (LLM_CONFIG.apiKey && !text.includes('#unrecognized')) {
      try {
        matches = await classifyWithLLM(text);
      } catch (e) {
        llmFailed = true;
        matches = classifyFreeText(text);
      }
    } else {
      matches = text.includes('#unrecognized') ? [] : classifyFreeText(text);
    }
    return { kind: matches.length ? 'success' : 'unrecognized', matches, llmFailed };
  };

  classify()
    .then((result) => {
      const elapsed = Date.now() - startedAt;
      const wait = Math.max(0, 900 - elapsed);
      setTimeout(() => {
        if (state.activeScreen !== 's45c') return;
        if (result.kind === 'error') {
          state.classifierResult = 'error';
          render('s45err');
          return;
        }
        if (result.kind === 'unrecognized') {
          state.classifierResult = 'unrecognized';
          render('s45f');
          return;
        }
        state.classifierResult = 'success';
        state.suggested = result.matches;
        state.confirmed = [...result.matches];
        renderSuggestList();
        render('s45d');
      }, wait);
    })
    .catch(() => {
      state.classifierResult = 'error';
      render('s45err');
    });
}

/* ---------- screen 4.5d ---------- */

function renderSuggestList() {
  const list = $('#suggestList');
  list.replaceChildren();
  state.suggested.forEach((topic) => {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'suggest-row' + (state.confirmed.includes(topic) ? '' : ' unchecked');
    row.dataset.action = 'toggleSuggested';
    row.dataset.topic = topic;
    row.append(document.createTextNode(topic));
    const box = document.createElement('span');
    if (state.confirmed.includes(topic)) {
      box.innerHTML = '<img class="topic-check-img" src="assets/check-box-on.svg" alt="">';
    } else {
      box.className = 'check-box-off';
    }
    row.append(box);
    list.append(row);
  });
  $('#confirmTopics').disabled = state.confirmed.length === 0;
}

/* ---------- screen 5.2 ---------- */

function renderGender() {
  const list = $('#genderList');
  list.replaceChildren();
  [
    { id: 'female', label: 'С женщиной' },
    { id: 'male', label: 'С мужчиной' },
    { id: 'any', label: 'Не важно' },
  ].forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn' + (state.specialistGender === opt.id ? ' selected' : '');
    btn.dataset.action = 'pickGender';
    btn.dataset.gender = opt.id;
    btn.textContent = opt.label;
    list.append(btn);
  });
}

/* ---------- render dispatcher ---------- */

function render(id, push = true) {
  if (id === 's45a') {
    show(id, push);
    fillInput('#freeTextA', '#counterA', '#errorA', '#fieldA');
    $('#freeTextA').focus({ preventScroll: true });
    return;
  }
  if (id === 's45e') {
    show(id, push);
    fillInput('#freeTextE', '#counterE', '#errorE', '#fieldE');
    return;
  }
  if (id === 's31') renderGroups();
  if (id === 's31a' && state.currentGroup) renderGroupScreen(state.currentGroup);
  if (id === 's52') renderGender();
  show(id, push);
}

/* ---------- actions ---------- */

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;

  switch (action) {
    case 'openGroup':
      state.entry = 'manual';
      state.groupSnapshot = [...state.selected[el.dataset.group]];
      renderGroupScreen(el.dataset.group);
      show('s31a');
      break;

    case 'cancelGroup':
      state.selected[state.currentGroup] = [...(state.groupSnapshot || [])];
      state.groupSnapshot = null;
      renderGroups();
      show('s31');
      break;

    case 'toggleTopic': {
      const group = state.currentGroup;
      const topic = el.dataset.topic;
      const arr = state.selected[group];
      const i = arr.indexOf(topic);
      if (i >= 0) arr.splice(i, 1);
      else arr.push(topic);
      const nowChecked = i < 0;
      el.classList.toggle('checked', nowChecked);
      el.querySelector('.topic-check').innerHTML =
        `<img class="topic-check-img" src="assets/check-round-${nowChecked ? 'on' : 'off'}.svg" alt="">`;
      break;
    }

    case 'saveGroup':
      state.groupSnapshot = null;
      renderGroups();
      show('s31');
      break;

    case 'openFreeText':
      state.entry = 'free_text';
      state.returnToInput = 's31';
      render('s45a');
      break;

    case 'send':
      if (!validateInput($('#freeTextA'), '#counterA', '#errorA', '#fieldA')) return;
      state.freeText = $('#freeTextA').value;
      runClassifier();
      break;

    case 'sendEdit':
      if (!validateInput($('#freeTextE'), '#counterE', '#errorE', '#fieldE')) return;
      state.freeText = $('#freeTextE').value;
      runClassifier();
      break;

    case 'retrySend':
      runClassifier();
      break;

    case 'toggleSuggested': {
      const topic = el.dataset.topic;
      const i = state.confirmed.indexOf(topic);
      if (i >= 0) state.confirmed.splice(i, 1);
      else state.confirmed.push(topic);
      renderSuggestList();
      break;
    }

    case 'confirmTopics': {
      state.confirmed.forEach((topic) => {
        const groupId = TOPIC_TO_GROUP[topic];
        if (groupId && !state.selected[groupId].includes(topic)) state.selected[groupId].push(topic);
      });
      renderGroups();
      if (isSafetyTriggered()) {
        show('sSafety');
      } else {
        render('s52');
      }
      break;
    }

    case 'rejectTopics':
      render('s45a');
      break;

    case 'chooseReady':
      renderGroups();
      show('s31');
      break;

    case 'sendToGuide':
      show('sThanks');
      break;

    case 'closeThanks':
      renderGroups();
      show('s31');
      break;

    case 'pickGender':
      state.specialistGender = el.dataset.gender;
      renderGender();
      state.loaderTimer = setTimeout(() => render('sStub'), 180);
      break;

    case 'back': {
      const from = el.closest('.screen').id;
      if (from === 's45a') {
        show(state.returnToInput);
      } else if (from === 's45d') {
        render('s45a');
      } else if (from === 's45e') {
        renderSuggestList();
        show('s45d');
      } else if (from === 's45f' || from === 's45err') {
        render('s45a');
      } else if (from === 's52') {
        show('s31');
      } else {
        show('s31');
      }
      break;
    }

    case 'continue':
      if (selectedTopicNames().length === 0) return;
      if (isSafetyTriggered()) {
        show('sSafety');
      } else {
        render('s52');
      }
      break;
  }
});

/* ---------- textarea bindings ---------- */

$('#freeTextA').addEventListener('input', (e) => {
  growTextarea(e.target);
  validateInput(e.target, '#counterA', '#errorA', '#fieldA');
});
$('#freeTextE').addEventListener('input', (e) => {
  growTextarea(e.target);
  validateInput(e.target, '#counterE', '#errorE', '#fieldE');
});

/* ---------- init ---------- */

history.replaceState({ screen: 's31' }, '', '#s31');
render('s31', false);
