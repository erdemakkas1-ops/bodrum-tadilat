# Beyaztaş Tadilat — örnek tasarım

Bodrum'da iç ve dış tadilat yapan **kurgusal** bir işletme için tek sayfalık konsept site (Türkçe `/`, İngilizce `/en/`).
Astro ile statik üretilir; Vercel'de ve GitHub Pages'te yayınlanır. İşletme adı, telefon ve hesap bilgileri örnektir.

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
- `src/components/Film.astro`, `src/scripts/film.ts` — kaydırmayla oynayan giriş filmi (`public/film/` kareleri)
- `src/components/Home.astro` — sayfa bölümleri
- `src/styles/global.css` — tasarım ve kaydırma animasyonları
- `src/scripts/main.ts` — önce/sonra kaydırıcısı, sekmeler, WhatsApp formu, görünürlük animasyonları
- `src/url.ts` — Vercel (`/`) ve GitHub Pages (`/bodrum-tadilat/`) için yol yardımcısı
