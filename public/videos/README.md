# Background Video Setup

## ⚠️ ПОКА НЕТ ВИДЕО - показывается анимированный фон

Компонент автоматически показывает красивый анимированный градиент с движущейся сеткой и частицами, пока вы не добавите реальное видео.

## Как добавить видео с дронами

### Вариант 1: Скачать с Pexels (РЕКОМЕНДУЕТСЯ)

1. **Перейдите на Pexels:**
   - FPV Дроны: https://www.pexels.com/search/videos/fpv%20drone/
   - Drone Racing: https://www.pexels.com/search/videos/drone%20racing/
   - Drone Footage: https://www.pexels.com/search/videos/drone%20footage/

2. **Выберите понравившееся видео**
   - Кликните на видео
   - Нажмите кнопку "Download" (Скачать)
   - Выберите качество: **HD (1920x1080)** или **Full HD**

3. **Сохраните файл:**
   ```bash
   # Переименуйте скачанный файл
   mv ~/Downloads/pexels-*.mp4 drone-background.mp4

   # Переместите в папку проекта
   mv drone-background.mp4 /Users/makhkambekteshabayev/Desktop/dronsoccer/public/videos/
   ```

### Вариант 2: Другие бесплатные источники

- **Mixkit**: https://mixkit.co/free-stock-video/fpv-drone/
- **Pixabay**: https://pixabay.com/videos/search/fpv%20drone/
- **Vecteezy**: https://www.vecteezy.com/free-videos/fpv-drone

## Требования к видео

- **Формат**: MP4 (H.264 codec)
- **Разрешение**: 1920x1080 или выше
- **Длительность**: 10-30 секунд (будет зацикливаться)
- **Размер файла**: До 10MB для быстрой загрузки
- **Ориентация**: Горизонтальная (landscape)

## Оптимизация (опционально)

Если видео слишком большое, используйте HandBrake:

```bash
# Установить HandBrake (если нет)
brew install handbrake

# Сжать видео
HandBrakeCLI -i input.mp4 -o drone-background.mp4 \
  --preset="Fast 1080p30" \
  --vb 3000 \
  --audio none
```

## Быстрый способ (через терминал)

```bash
# 1. Скачайте любое видео с Pexels в браузере
# 2. Переместите в проект:
cd /Users/makhkambekteshabayev/Desktop/dronsoccer/public/videos/
# 3. Переименуйте файл в drone-background.mp4
# 4. Обновите страницу в браузере - видео появится автоматически!
```

## Текущий статус

- ✅ Компонент BackgroundVideo создан
- ✅ Анимированный fallback работает
- ✅ CustomCursor с зеленым следом активен на всех страницах
- ⏳ **Добавьте видео** для замены анимированного фона

## Настройка

В `components/BackgroundVideo.tsx` можно изменить:
- `opacity`: Прозрачность видео (по умолчанию: 0.3)
- `playbackRate`: Скорость воспроизведения (по умолчанию: 0.75x)
- Фильтры: Яркость, контраст и т.д.
