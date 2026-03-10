# UI Libraries Setup Guide

## ✅ Установленные библиотеки компонентов

Ваш проект настроен для использования двух современных UI библиотек:

1. **Aceternity UI** - https://ui.aceternity.com/
2. **Magic UI** - https://magicui.design/

## 📦 Установленные зависимости

```bash
✅ motion (framer-motion для Next.js 15+)
✅ clsx
✅ tailwind-merge
✅ react-icons
✅ framer-motion
✅ tailwindcss-animate
```

## 🛠 Что уже настроено

### 1. Utility функция (`lib/utils.ts`)

```typescript
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 2. Tailwind конфигурация

- ✅ Добавлен плагин `tailwindcss-animate`
- ✅ Добавлены кастомные анимации (shimmer, gradient, border-beam, shine)
- ✅ Настроены keyframes для плавных анимаций

## 📖 Как использовать компоненты

### Aceternity UI

1. **Перейдите на сайт**: https://ui.aceternity.com/
2. **Выберите компонент** (например, Hero Section, Card, Button)
3. **Скопируйте код** компонента
4. **Создайте файл** в `components/ui/` (например, `components/ui/hero.tsx`)
5. **Вставьте код** и используйте в своих страницах

**Пример:**
```tsx
import { Hero } from '@/components/ui/hero';

export default function Page() {
  return <Hero />;
}
```

### Magic UI

1. **Перейдите на сайт**: https://magicui.design/
2. **Выберите компонент** из галереи
3. **Скопируйте код** компонента
4. **Создайте файл** в `components/ui/`
5. **Используйте компонент** в своем проекте

**Пример компонента с анимацией:**
```tsx
import { cn } from "@/lib/utils";

export function AnimatedCard({ className, children }) {
  return (
    <div className={cn("animate-shimmer", className)}>
      {children}
    </div>
  );
}
```

## 🎨 Популярные компоненты для Drone Soccer сайта

### Aceternity UI компоненты:

- **Hero Section** - Для главной страницы
- **Bento Grid** - Для отображения функций/возможностей
- **3D Card Effect** - Для карточек команды/дронов
- **Animated Testimonials** - Отзывы участников
- **Background Beams** - Красивые фоновые эффекты
- **Moving Border** - Анимированные границы для кнопок
- **Sparkles** - Эффект искр для акцентов

### Magic UI компоненты:

- **Animated Gradient Text** - Для заголовков
- **Marquee** - Бегущая строка для партнеров/спонсоров
- **Particles** - Фоновые частицы
- **Shimmer Button** - Анимированные кнопки
- **Dock** - Навигационная панель
- **Border Beam** - Светящиеся границы

## 📝 Примеры использования

### 1. Создание анимированной кнопки

```tsx
// components/ui/shimmer-button.tsx (скопируйте с Aceternity UI)
import { cn } from "@/lib/utils";

export function ShimmerButton({ children, className }) {
  return (
    <button
      className={cn(
        "inline-flex h-12 animate-shimmer items-center justify-center",
        "rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]",
        "bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        "focus:ring-offset-slate-50",
        className
      )}
    >
      {children}
    </button>
  );
}
```

Использование:
```tsx
import { ShimmerButton } from "@/components/ui/shimmer-button";

<ShimmerButton>Join Our Team</ShimmerButton>
```

### 2. Добавление частиц на фон

```tsx
// Скопируйте компонент Particles с Magic UI
import Particles from "@/components/ui/particles";

export default function Home() {
  return (
    <div className="relative">
      <Particles className="absolute inset-0" />
      <h1>Your content</h1>
    </div>
  );
}
```

## 🚀 Рекомендации

1. **Создайте папку** `components/ui/` для UI компонентов
2. **Используйте `cn()`** функцию для объединения классов
3. **Комбинируйте** компоненты из обеих библиотек
4. **Кастомизируйте** цвета под ваш бренд (primary-blue, primary-red)

## 🔗 Полезные ссылки

- **Aceternity UI**: https://ui.aceternity.com/
- **Magic UI**: https://magicui.design/
- **Magic UI Docs**: https://magicui.design/docs
- **Magic UI GitHub**: https://github.com/magicuidesign/magicui
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/

## 💡 Совет

Обе библиотеки используют подход **copy-paste** - это значит вы копируете код компонента и можете его полностью кастомизировать под свои нужды. Это дает больше контроля чем обычные npm пакеты!

---

**Готово к использованию!** 🎉

Просто откройте любой из сайтов, выберите понравившийся компонент и добавьте его в свой проект.
