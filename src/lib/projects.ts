export type ProcessStep = {
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  role: string[];
  cover: string;
  images: string[];
  about: string;
  process: ProcessStep[];
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
    year: "2026",
    description: "Редизайн сайта государственного национального театра Удмуртии",
    cover: "/projects/udmteatr/cover.png",
    role: [
      "UX/UI design",
      "Информационная архитектура",
      "Визуальная система",
      "Дизайн афиши и карточек спектаклей",
      "Адаптивный дизайн",
    ],
    images: ["", ""],
    about:
      "Редизайн сайта Государственного национального театра Удмуртской Республики — культурного и одновременно сервисного продукта. Нужно было обновить визуальный образ и упростить путь пользователя от афиши к покупке билета, сохранив национальную идентичность театра.",
    process: [
      { title: "Research", description: "Анализ структуры и пользовательских сценариев действующего сайта." },
      { title: "Structure", description: "Информационная архитектура вокруг афиши, репертуара, коллектива и новостей." },
      { title: "UX", description: "Сценарий «увидеть спектакль → купить билет», фильтры репертуара, карточка спектакля." },
      { title: "UI", description: "Визуальная система: типографика, сетка, карточки — современный язык с национальным колоритом." },
      { title: "Adaptive", description: "Адаптивное поведение интерфейса для мобильного сценария покупки билета." },
    ],
    result:
      "Путь пользователя сократился до «Что идёт? → Когда? → Купить билет», при этом сайт сохранил имиджевую функцию — историю, коллектив и культурный контекст театра.",
    tone: 0,
  },
  {
    slug: "built2measure",
    number: "02",
    title: "Built2Measure",
    category: "UX/UI Design · Web Design · Product Design",
    year: "2025",
    description: "Сервис для поиска строительных компаний и просмотра их проектов",
    role: [
      "UX research",
      "Информационная архитектура",
      "Прототипирование",
      "UI design",
      "Адаптивный дизайн",
    ],
    cover: "",
    images: ["", ""],
    about:
      "Built2Measure — веб-сервис для поиска строительных компаний, просмотра их проектов и взаимодействия с исполнителями. Два типа пользователей — заказчики и строительные компании — потребовали продумать полный путь: от поиска и фильтрации до личных кабинетов, проектов, отзывов и карты.",
    process: [
      { title: "Research", description: "Сущности сервиса и связи между ними: пользователь, компания, проект, отзыв, категория." },
      { title: "Structure", description: "Информационная архитектура: каталог, профиль компании, проект, личные кабинеты, регистрация." },
      { title: "UX", description: "Сценарии регистрации, поиска и фильтрации компаний, добавления проекта, отзывов." },
      { title: "UI", description: "Интерфейс каталога, карточек компаний и проектов, личных кабинетов, форм и карты." },
      { title: "Adaptive", description: "Адаптивные desktop/mobile версии ключевых страниц сервиса." },
    ],
    result:
      "Сложный сервис с двумя типами пользователей стал понятным и удобным — от поиска строительной компании и её проектов до работы с картой, отзывами и личным кабинетом, — а дизайн подготовлен к разработке.",
    tone: 1,
  },
  {
    slug: "project-03",
    number: "03",
    title: "GAYA",
    category: "Product Design · Vibe Coding",
    year: "2025",
    description: "Short project description",
    role: ["Visual concept", "Interface design", "Vibe Coding"],
    cover: "",
    images: ["", ""],
    about:
      "Краткое описание проекта появится здесь после добавления реального кейса — что это за продукт, для кого он создан и какая задача решалась.",
    process: [
      { title: "Research", description: "Анализ рынка и пользователей." },
      { title: "UX", description: "Прототипирование пользовательских сценариев." },
      { title: "Final result", description: "Готовый продукт." },
    ],
    result:
      "Результат проекта будет описан здесь — продукт, метрики или созданные интерфейсы.",
    tone: 2,
  },
  {
    slug: "project-04",
    number: "04",
    title: "Pena Pack",
    category: "UX/UI Design · Web Design",
    year: "2025",
    description: "Short project description",
    role: ["UX/UI design", "Prototyping", "Responsive design"],
    cover: "",
    images: ["", ""],
    about:
      "Краткое описание проекта появится здесь после добавления реального кейса — что это за продукт, для кого он создан и какая задача решалась.",
    process: [
      { title: "Structure", description: "Архитектура и логика продукта." },
      { title: "UX", description: "Прототипирование пользовательских сценариев." },
      { title: "UI", description: "Визуальная система и интерфейс." },
    ],
    result:
      "Результат проекта будет описан здесь — продукт, метрики или созданные интерфейсы.",
    tone: 3,
  },
  {
    slug: "project-05",
    number: "05",
    title: "BankFuture",
    category: "UX/UI Design · Vibe Coding",
    year: "2025",
    description: "Short project description",
    role: ["UX/UI design", "Visual concept", "Vibe Coding"],
    cover: "",
    images: ["", ""],
    about:
      "Краткое описание проекта появится здесь после добавления реального кейса — что это за продукт, для кого он создан и какая задача решалась.",
    process: [
      { title: "Research", description: "Анализ рынка и пользователей." },
      { title: "UI", description: "Визуальная система и интерфейс." },
      { title: "Development", description: "Реализация с помощью Vibe Coding." },
    ],
    result:
      "Результат проекта будет описан здесь — продукт, метрики или созданные интерфейсы.",
    tone: 4,
  },
  {
    slug: "project-06",
    number: "06",
    title: "Уголок",
    category: "Web Design · Product Design",
    year: "2024",
    description: "Short project description",
    role: ["Interface design", "Responsive design", "Prototyping"],
    cover: "",
    images: ["", ""],
    about:
      "Краткое описание проекта появится здесь после добавления реального кейса — что это за продукт, для кого он создан и какая задача решалась.",
    process: [
      { title: "Structure", description: "Архитектура и логика продукта." },
      { title: "UX", description: "Прототипирование пользовательских сценариев." },
      { title: "Final result", description: "Готовый продукт." },
    ],
    result:
      "Результат проекта будет описан здесь — продукт, метрики или созданные интерфейсы.",
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
