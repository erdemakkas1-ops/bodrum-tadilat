# Bodrum Tadilat

Turgutreis merkezli Bodrum Tadilat için tek sayfalık site (Türkçe `/`, İngilizce `/en/`). Astro ile statik üretilir, Vercel'de yayınlanır.

## Komutlar

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # dist/
npm run preview
npm run check     # tip kontrolü
```

## Yapı

- `src/content.ts` — tüm metinler (TR + EN) ve iletişim bilgileri
- `src/images.ts` — fotoğraf içe aktarımları (`src/assets/work/`, işletmenin kendi Instagram fotoğrafları)
- `src/components/Home.astro` — sayfa bölümleri
- `src/styles/global.css` — tasarım ve kaydırma animasyonları
- `src/scripts/main.ts` — önce/sonra kaydırıcısı, sekmeler, WhatsApp formu, görünürlük animasyonları

Alan adı alındığında `astro.config.mjs` içindeki `site` değerini güncelleyin.
