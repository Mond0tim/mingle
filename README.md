
# mingle 🎵

[![Превью](/public/preview.png)](https://mingle.ti-web.ru)

## Краткое описание

Современный музыкальный плеер, созданный с помощью Next.js, React, TypeScript и Howler.js.  Поддерживает плейлисты, поиск, визуализацию музыки и установку как PWA (Progressive Web App).

Это музыкальный плеер, разработанный с использованием стека современных веб-технологий:

*   **Next.js:** Фреймворк для React, обеспечивающий серверный рендеринг, роутинг и другие возможности.
*   **React:** Библиотека JavaScript для создания пользовательских интерфейсов.
*   **TypeScript:**  Язык программирования, добавляющий статическую типизацию к JavaScript.
*   **Howler.js:**  Библиотека для работы с аудио.
*   **PWA (Progressive Web App):**  Приложение может быть установлено на устройство пользователя и работать оффлайн (с ограниченным функционалом).
*   **audioMotion:**  Библиотека для создания визуализаций.
*   **ColorThief:**  Библиотека для извлечения основного цвета и палитры из изображений.
*   **Vaul:**  Библиотека для создания Drawer (выезжающих боковых панелей).
*   **next-pwa:**  Плагин для Next.js, упрощающий создание PWA.
*   **React Context API:**  Для управления состоянием приложения.
*   **CSS Modules:**  Для стилизации компонентов.

## Функции

*   [x] Воспроизведение аудио.
*   [x] Поддержка плейлистов.
*   [x] Переключение между треками (следующий/предыдущий).
*   [x] Перемотка трека.
*   [x] Поиск по трекам и плейлистам.
*   [x] Отображение обложки текущего трека.
*   [x] Визуализация музыки (на главной странице).
*   [x] PWA: возможность установки на устройство.
*   [x] Оффлайн-доступ (частичный, кэширование статики).
*   [x] Адаптивный дизайн (мобильная и десктопная версии).
*   [x] Индикация текущего проигрываемого трека и плейлиста.
*   [x] Управление очередью воспроизведения прямо из плеера (через Drawer).

## Инструкция по установке и запуску

**1. Клонирование репозитория:**

```bash
git clone [адрес_вашего_репозитория]
cd [название_папки_проекта]
```

**2. Установка зависимостей:**

```bash
npm install
```

**3. Запуск в режиме разработки:**

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:3000` 

**4. Сборка проекта (для production):**

```bash
npm run build
```

**5. Запуск production-сборки:**

```bash
npm run start
```

**6. PWA (Progressive Web App):**

*   Убедитесь, что у вас есть файл `public/manifest.json` с корректными данными.
*   Убедитесь, что в `next.config.mjs` включена поддержка PWA (параметр `disable` в `withPWA` должен быть `false` для production).
*   После сборки проекта (`npm run build`) в папке `public` должен появиться файл `sw.js` (service worker).
*   Откройте приложение в браузере, поддерживающем PWA (Chrome, Firefox, Edge, Safari на iOS).
*   В DevTools (F12) -> Application -> Service Workers убедитесь, что service worker зарегистрирован.
*   В DevTools -> Application -> Manifest убедитесь, что манифест загружен корректно.
*   Приложение должно предлагать установку (иконка установки в адресной строке или кнопка "Install App", если вы ее добавили).

**7. Замена данных (опционально):**

*   Для динамического обновления данных, вам нужно заменить статичные данные в `/lib/data.ts` на получение с помощью API Next.js (API routes), SWR, React Query, или использовать Server Components.

## Лицензия

[MIT]

## Контакты

[Ваше имя/никнейм] - [Ваш email/ссылка на профиль]

[Ссылка на репозиторий проекта]
```

**Что нужно сделать:**

1.  **Замените:**
    *   `[Название вашего музыкального плеера]` на реальное название.
    *   `[путь/к/вашему/превью.png]` на путь к файлу изображения превью вашего плеера (положите его, например, в папку `public`).
    *   `[ссылка_на_ваш_плеер]` на ссылку, где ваш плеер будет размещен (если он будет где-то размещен).
    *   `[Ваше краткое описание плеера]` на ваше описание.
    *   В разделе "Функции" отметьте галочками реализованные функции и добавьте те, которые планируете сделать.
    *   `[адрес_вашего_репозитория]` на ссылку на ваш репозиторий (если он есть).
    *   `[Ваше имя/никнейм]` и `[Ваш email/ссылка на профиль]` на ваши контактные данные.
    *   `[Укажите лицензию вашего проекта, например, MIT]` на название лицензии, которую вы используете.
2.  **Изображение превью:** Создайте изображение превью вашего плеера и разместите его в проекте (лучше всего в папке `public`).

