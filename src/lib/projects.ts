export type ProcessStep = {
  title: string;
  description: string;
};

export type Audience = {
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  /** Optional — shorter category label for the homepage list only. */
  listCategory?: string;
  year: string;
  /** Optional — link to the Figma file. "#" means a stub (button shown, no navigation). */
  figmaUrl?: string;
  /** Optional — link to the live site. "#" means a stub. */
  siteUrl?: string;
  description: string;
  role: string[];
  cover: string;
  /** Optional — looping preview clip (muted, no controls). Used in the hover preview on the
   *  homepage and, at full size, in the opened project's hero. Same file for both, so export it
   *  large enough to stay sharp when enlarged (see README for prep guidance). */
  previewVideo?: string;
  /** Optional — set together with `previewVideo` when the clip isn't square (e.g. a real
   *  browser screen recording). The video is then shown at its own aspect ratio, inset over
   *  this background image, instead of being cropped to fill the square. */
  previewVideoBackground?: string;
  images: string[];
  /** Optional — replaces the "mobile" slot in the generic Design section with a video, shown
   *  at its own aspect ratio (contain) over a background — either an image (`designVideoBackground`)
   *  or, when no image is needed, a flat CSS color (`designVideoBackgroundColor`). */
  designVideo?: string;
  designVideoBackground?: string;
  designVideoBackgroundColor?: string;
  about: string[];
  /** Optional — only projects with more than one user type render this section. */
  audiences?: Audience[];
  process: ProcessStep[];
  /** Optional — alternative Process layout: titled paragraphs beside a square media block. Takes over from `process` when set. */
  processParagraphs?: ProcessStep[];
  /** Optional — set true to skip the generic 3-image Design section. */
  hideDesignSection?: boolean;
  result: string;
  /** Index used to derive a placeholder gradient when no real image exists yet. */
  tone: number;
};

export const projects: Project[] = [
  {
    slug: "udmteatr",
    number: "01",
    title: "Национальный театр УР",
    category: "UX/UI Design · Web Design · Redesign",
    listCategory: "Театральный сайт",
    year: "2026",
    figmaUrl:
      "https://www.figma.com/design/nGwVPkYQQRF35j36xQ4p21/%D0%A3%D0%B4%D0%BC%D0%A2%D0%B5%D0%B0%D1%82%D1%80?node-id=20-57&t=fC4SnB9GyWp0nDMv-1",
    siteUrl: "https://udmteatr.ru/ru",
    description: "Редизайн сайта государственного национального театра Удмуртской Республики",
    cover: "/projects/udmteatr/cover.png",
    previewVideo: "/projects/udmteatr/preview.mp4",
    previewVideoBackground: "/projects/udmteatr/preview-bg.png",
    role: [
      "UX/UI design",
      "Информационная архитектура",
      "Визуальная система",
      "Дизайн афиши, баннеров, карточек спектаклей, национальных паттернов",
      "Адаптивный дизайн",
    ],
    images: [
      "/projects/udmteatr/design-desktop.jpg",
      "/projects/udmteatr/design-mobile.jpg",
      "/projects/udmteatr/design-detail.jpg",
    ],
    about: [
      "Основная задача — разработать красивый минималистичный дизайн, сохранив национальный колорит. Упростить путь пользователя от афиши к покупке билета. Сделать удобные адаптивные версии, а также версию для слабовидящих.",
    ],
    process: [
      { title: "Research", description: "Конкурентный анализ. Анализ структуры и пользовательских сценариев действующего сайта." },
      {
        title: "Структура и сценарий",
        description:
          "Продумал структуру сайта вокруг афиши, репертуара, коллектива и новостей и выстроил короткий путь «увидеть спектакль → купить билет».",
      },
      {
        title: "UI",
        description:
          "Оформил сайт — шрифты, цвета, карточки спектаклей — в современном стиле, сохранив национальный колорит.",
      },
      {
        title: "Адаптив",
        description: "Адаптировал дизайн под мобильные устройства и подготовил версию для слабовидящих.",
      },
    ],
    result:
      "Сайт получил современный, лаконичный дизайн с национальным колоритом. Путь пользователя сократился до понятной цепочки «Что идёт? → Когда? → Купить билет». Интерфейс адаптирован под любые устройства, а также подготовлена версия для слабовидящих. В результате сайт стал удобным, визуально приятным и интуитивно понятным для любителей театра.",
    tone: 0,
  },
  {
    slug: "built2measure",
    number: "02",
    title: "Built2Measure",
    category: "UX/UI Design · Web Design · Product Design",
    listCategory: "Строительный сервис",
    year: "2025",
    figmaUrl:
      "https://www.figma.com/design/qVPdeDfpr9vs1PKk889Osb/built2measure_Service?node-id=143-295&t=aPOTD7CFRkbf7O8m-1",
    siteUrl: "https://built2measure.com/",
    previewVideoBackground: "/projects/built2measure/preview-bg.jpg",
    description: "Сервис для строительных и ремонтных услуг (UK)",
    role: [
      "UX research",
      "Составление ТЗ",
      "Информационная архитектура",
      "User flows",
      "UI design",
      "Адаптивный дизайн",
    ],
    cover: "",
    images: ["", ""],
    about: [
      "Проект разработан для заказчика из Великобритании. Основная задача — создать современную digital-платформу для поиска строительных компаний, подрядчиков и специалистов в сфере ремонта и строительства.",
    ],
    audiences: [
      {
        title: "Заказчик",
        description:
          "Ищет строительные компании, использует поиск и фильтры, просматривает профили и проекты, оставляет отзывы.",
      },
      {
        title: "Строительная компания",
        description:
          "Создаёт профиль, публикует услуги и категории работ, добавляет реализованные проекты.",
      },
    ],
    process: [],
    processParagraphs: [
      {
        title: "Анализ",
        description: "Проанализировал конкурентов и аналогичные сайты/сервисы.",
      },
      {
        title: "Структура и пользовательский сценарий",
        description:
          "Разработал структуру сервиса и пользовательские сценарии для двух типов пользователей — заказчиков и строительных компаний. Спроектировал логику регистрации, поиска и фильтрации компаний, просмотра проектов, добавления проектов и отзывов, а также взаимодействия с картой.",
      },
      {
        title: "Прототипы и UI",
        description:
          "На основе сценариев создал прототипы и разработал UI-дизайн основных страниц сервиса: главной, каталога, страницы компании и проекта, регистрации и авторизации, личных кабинетов пользователей и компаний, а также 404.",
      },
      {
        title: "Адаптив",
        description:
          "Проработал desktop и mobile версии интерфейсов и подготовил дизайн к последующей HTML-вёрстке и разработке.",
      },
    ],
    hideDesignSection: true,
    result:
      "Сложный сервис с двумя типами пользователей стал понятным и удобным — от поиска компании и её проектов до личного кабинета, карты и отзывов.",
    tone: 1,
  },
  {
    slug: "project-03",
    number: "03",
    title: "GAYA",
    category: "UX/UI Design · Web Design",
    listCategory: "Образовательный центр",
    year: "2025",
    figmaUrl:
      "https://www.figma.com/design/XAJHzvhEtmAs5G6XBlMGNA/GAYA-RUS?node-id=0-1&t=6D0DpHSXXVDXh0an-1",
    siteUrl: "https://gayadentistry.com.br/",
    description: "Образовательный центр для стоматологов",
    role: [
      "Брифинг",
      "Конкурентный анализ",
      "Поиск референсов",
      "Прототипирование",
      "UI design",
      "Подготовка макета для разработчика",
      "Дизайн-ревью",
    ],
    cover: "",
    previewVideo: "/projects/project-03/preview.mp4",
    previewVideoBackground: "/projects/project-03/preview-bg.jpg",
    images: ["/projects/project-03/design-desktop.jpg", "", "/projects/project-03/design-detail.jpg"],
    designVideo: "/projects/project-03/design-mobile.mp4",
    designVideoBackgroundColor: "#EAEAE1",
    about: [
      "Gaya — образовательный центр для стоматологов в Бразилии. У заказчика уже был готовый брендбук и страница в Instagram — задача заключалась в том, чтобы сделать приятный, стильный сайт, полностью соответствующий этому брендбуку.",
      "Позже для сайта спроектировали админ-панель — сейчас она на стадии разработки, дизайн выполнен в Figma.",
    ],
    process: [
      {
        title: "Research",
        description: "Провёл брифинг с заказчиком, изучил конкурентов и собрал референсы для дизайна.",
      },
      {
        title: "Дизайн",
        description: "Разработал прототип и на его основе — дизайн сайта в соответствии с брендбуком заказчика.",
      },
      {
        title: "Передача в разработку",
        description: "Подготовил макет для разработчика и провёл дизайн-ревью готового сайта.",
      },
      {
        title: "Админ-панель",
        description:
          "Спроектировал интерфейс админ-панели для управления сайтом — проект на стадии разработки, дизайн выполнен в Figma.",
      },
    ],
    result:
      "Сайт получил стильный дизайн, полностью соответствующий фирменному стилю центра. Для управления контентом сейчас разрабатывается отдельная админ-панель — её дизайн уже готов в Figma.",
    tone: 2,
  },
  {
    slug: "project-04",
    number: "04",
    title: "Pena Pack",
    category: "UX/UI Design · Web Design",
    listCategory: "Сервис доставки",
    year: "2025",
    figmaUrl:
      "https://www.figma.com/design/TTF6pdXdCrnbgkOjYjjW3x/Pena-Pack?node-id=3-90&t=So2H73ymuUfxJRcb-1",
    siteUrl: "https://pena.beer/",
    description: "Сервис для заказа и доставки крафтового пива Pena Pack",
    role: [
      "Конкурентный анализ",
      "Поиск референсов",
      "Прототипирование",
      "UI design сайта и личного кабинета",
      "Дизайн квиза и баннеров",
      "Подготовка макета для разработчика",
      "Дизайн-ревью",
    ],
    cover: "",
    images: ["", ""],
    about: [
      "У Pena Pack уже был основной презентационный сайт — он знакомил с компанией и услугой, но не позволял оформить покупку. Нужно было разработать отдельный сервис с оформлением заказа и доставки, а также личный кабинет для программы лояльности Pena Pack Club.",
      "Дизайн должен был получиться стильным и визуально приятным, а структура сайта — интуитивно понятной и простой.",
    ],
    process: [
      {
        title: "Research",
        description: "Провёл конкурентный анализ и собрал референсы для дизайна.",
      },
      {
        title: "Прототип",
        description: "Спроектировал прототип, продумав логику сайта, личного кабинета, квиза и баннеров.",
      },
      {
        title: "Дизайн",
        description: "Разработал UI-дизайн сайта, личного кабинета, квиза и баннеров.",
      },
      {
        title: "Передача в разработку",
        description:
          "Подготовил макет для разработчика: экспортировал изображения, привёл в порядок макет в Figma, добавил комментарии и пояснения функционала, провёл дизайн-ревью.",
      },
    ],
    result:
      "Компания получила отдельный сервис с оформлением заказа и доставки, а также личный кабинет для программы лояльности Pena Pack Club. Интерфейс получился стильным, визуально приятным и интуитивно понятным.",
    tone: 3,
  },
  {
    slug: "project-05",
    number: "05",
    title: "BankFuture",
    category: "UX/UI Design · Vibe Coding",
    listCategory: "Финтех-платформа",
    year: "2025",
    siteUrl: "https://bank-future.com/",
    description: "Сайт и сервис ПФП для FinTech/AI-компании BankFuture",
    role: [
      "Составление ТЗ",
      "Копирайтинг",
      "Визуальная концепция",
      "Vibe Coding сайта и сервиса ПФП",
      "Создание репозитория на GitHub",
      "Деплой на Vercel",
    ],
    cover: "",
    images: ["", ""],
    about: [
      "BankFuture — российская FinTech/AI-компания, которая создаёт интеллектуальные платформы и сервисы для банков, НПФ, финансовых консультантов и агентских сетей. Компания автоматизирует работу сотрудников, клиентские коммуникации и финансовую аналитику с помощью искусственного интеллекта.",
      "Задача — сделать приятный по дизайну сайт, используя имеющийся фирменный стиль компании, чтобы познакомить пользователей с продуктами BankFuture.",
      "Помимо сайта, тем же способом — vibe coding — реализован «Личный кабинет Будущего»: сервис персонального финансового планирования (ПФП) для конечных пользователей, доступный прямо с сайта.",
    ],
    process: [
      {
        title: "ТЗ",
        description: "Составил техническое задание — структуру сайта, список продуктов BankFuture и стек (React + Vite, Vercel).",
      },
      {
        title: "Копирайтинг",
        description: "Написал подробные брифы с текстами для каждого продукта — от хиро-блока до FAQ.",
      },
      {
        title: "Vibe Coding",
        description:
          "Сгенерировал в Claude сайт и сервис персонального финансового планирования «Личный кабинет Будущего», сохранив фирменный стиль компании.",
      },
      {
        title: "GitHub",
        description: "Создал репозиторий на GitHub для хранения и версионирования кода.",
      },
      {
        title: "Деплой",
        description: "Опубликовал сайт и сервис ПФП на Vercel.",
      },
    ],
    result:
      "Компания получила современный сайт, который презентует все продукты BankFuture в едином фирменном стиле, а также рабочий сервис персонального финансового планирования «Личный кабинет Будущего» для конечных пользователей. Всё сделано методом vibe coding — от технического задания и репозитория на GitHub до деплоя.",
    tone: 4,
  },
  {
    slug: "project-06",
    number: "06",
    title: "Уголок",
    category: "Web Design · Product Design",
    listCategory: "Дизайн-бюро",
    year: "2024",
    figmaUrl:
      "https://www.figma.com/design/yyzzdsLKdB2fMPA6tXfwJO/%D0%A3%D0%B3%D0%BE%D0%BB%D0%BE%D0%BA?node-id=1-279&t=UZGHAmC1yVB26SdX-1",
    siteUrl: "https://ugolok-design.ru/",
    previewVideo: "/projects/project-06/preview.mp4",
    previewVideoBackground: "/projects/project-06/preview-bg.jpg",
    description: "Сайт и квиз для дизайн-бюро интерьеров «Уголок»",
    role: [
      "Брифинг с продуктоунером",
      "Составление ТЗ",
      "Прототипирование",
      "UI design сайта",
      "Дизайн квиза",
      "Дизайн админ-панели",
      "UI-кит",
      "Анимация",
      "Адаптивный дизайн",
    ],
    cover: "",
    images: ["", ""],
    about: [
      "Уголок — дизайн-бюро интерьеров. У заказчика уже был готовый брендбук, но не было сайта — нужно было спроектировать сайт, квиз-подбор для клиентов и админ-панель для самостоятельного управления контентом: минималистичный дизайн, сохранив фирменный стиль из брендбука.",
      "Сайт и квиз полностью адаптивны — от десктопа до узкого мобильного экрана. Квиз состоит из 9 сценариев — по одному на каждый тип помещения (квартира, офис, кафе, ресторан, салон красоты, магазин и другие), — чтобы посетитель сразу получал релевантную консультацию.",
    ],
    process: [
      {
        title: "Брифинг",
        description: "Провёл онлайн-брифинг с продуктоунером — у заказчика уже был готовый брендбук, но не было сайта.",
      },
      {
        title: "ТЗ",
        description: "По итогам брифинга составил техническое задание на дизайн сайта, квиза и админ-панели.",
      },
      {
        title: "Прототип и UI-кит",
        description: "Спроектировал прототип и собрал UI-кит на основе фирменного стиля из брендбука.",
      },
      {
        title: "Дизайн сайта",
        description:
          "Разработал минималистичный дизайн сайта дизайн-бюро — портфолио проектов, о бюро, вакансии, контакты — в 9 адаптивных версиях, от десктопа до мобильного. Для удобства пользователя решили сделать структуру страниц на нестандартной сетке.",
      },
      {
        title: "Дизайн квиза",
        description: "Спроектировал квиз-подбор из 9 сценариев — по одному на каждый тип помещения, — тоже в полном адаптиве.",
      },
      {
        title: "Анимация",
        description: "Разработал паттерн, анимацию входа на сайт и анимацию логотипа.",
      },
      {
        title: "Админ-панель",
        description: "Разработал дизайн админ-панели для самостоятельного управления проектами, кейсами и контактами.",
      },
    ],
    result:
      "Дизайн-бюро получило минималистичный сайт с квизом-подбором под 9 типов помещений и админ-панель для самостоятельного управления контентом — всё в фирменном стиле бюро, с адаптивом от десктопа до мобильного и продуманной анимацией.",
    tone: 5,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  const nextIndex = (index + 1) % projects.length;
  return projects[nextIndex];
}
