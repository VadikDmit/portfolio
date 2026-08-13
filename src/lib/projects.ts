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
    slug: "project-01",
    number: "01",
    title: "Project 01",
    category: "UX/UI Design · Web Design · Vibe Coding",
    year: "2026",
    description: "Fintech digital platform",
    role: ["UX/UI design", "Visual concept", "Prototyping", "Vibe Coding"],
    cover: "",
    images: ["", ""],
    about:
      "Краткое описание проекта появится здесь после добавления реального кейса — что это за продукт, для кого он создан и какая задача решалась.",
    process: [
      { title: "Research", description: "Анализ рынка и пользователей." },
      { title: "Structure", description: "Архитектура и логика продукта." },
      { title: "UX", description: "Прототипирование пользовательских сценариев." },
      { title: "UI", description: "Визуальная система и интерфейс." },
      { title: "Development", description: "Реализация с помощью Vibe Coding." },
    ],
    result:
      "Результат проекта будет описан здесь — продукт, метрики или созданные интерфейсы.",
    tone: 0,
  },
  {
    slug: "project-02",
    number: "02",
    title: "Project 02",
    category: "UX/UI Design · Website",
    year: "2026",
    description: "Short project description",
    role: ["UX/UI design", "Interface design", "Responsive design"],
    cover: "",
    images: ["", ""],
    about:
      "Краткое описание проекта появится здесь после добавления реального кейса — что это за продукт, для кого он создан и какая задача решалась.",
    process: [
      { title: "Structure", description: "Архитектура и логика продукта." },
      { title: "UI", description: "Визуальная система и интерфейс." },
      { title: "Development", description: "Реализация с помощью Vibe Coding." },
    ],
    result:
      "Результат проекта будет описан здесь — продукт, метрики или созданные интерфейсы.",
    tone: 1,
  },
  {
    slug: "project-03",
    number: "03",
    title: "Project 03",
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
    title: "Project 04",
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
    title: "Project 05",
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
    title: "Project 06",
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
