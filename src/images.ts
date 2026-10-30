// Project photo imports, keyed by file name.
import type { ImageMetadata } from 'astro';
import baAvluOnce from './assets/work/ba-avlu-once.jpg';
import baAvluS1 from './assets/work/ba-avlu-s1.jpg';
import baAvluS2 from './assets/work/ba-avlu-s2.jpg';
import baAvluS3 from './assets/work/ba-avlu-s3.jpg';
import baAvluSonra from './assets/work/ba-avlu-sonra.jpg';
import baMerdivenOnce from './assets/work/ba-merdiven-once.jpg';
import baMerdivenS1 from './assets/work/ba-merdiven-s1.jpg';
import baMerdivenS2 from './assets/work/ba-merdiven-s2.jpg';
import baMerdivenS3 from './assets/work/ba-merdiven-s3.jpg';
import baMerdivenSonra from './assets/work/ba-merdiven-sonra.jpg';
import baTerasOnce from './assets/work/ba-teras-once.jpg';
import baTerasS1 from './assets/work/ba-teras-s1.jpg';
import baTerasS2 from './assets/work/ba-teras-s2.jpg';
import baTerasS3 from './assets/work/ba-teras-s3.jpg';
import baTerasSonra from './assets/work/ba-teras-sonra.jpg';
import baTeras2Once from './assets/work/ba-teras2-once.jpg';
import baTeras2S1 from './assets/work/ba-teras2-s1.jpg';
import baTeras2S2 from './assets/work/ba-teras2-s2.jpg';
import baTeras2S3 from './assets/work/ba-teras2-s3.jpg';
import baTeras2Sonra from './assets/work/ba-teras2-sonra.jpg';
import cepheOnce from './assets/work/cephe-once.jpg';
import cepheSonra from './assets/work/cephe-sonra.jpg';
import demoBaCepheOnce from './assets/work/demo-ba-cephe-once.jpg';
import demoBaCepheS1 from './assets/work/demo-ba-cephe-s1.jpg';
import demoBaCepheS2 from './assets/work/demo-ba-cephe-s2.jpg';
import demoBaCepheS3 from './assets/work/demo-ba-cephe-s3.jpg';
import demoBaCepheSonra from './assets/work/demo-ba-cephe-sonra.jpg';
import demoBaGirisOnce from './assets/work/demo-ba-giris-once.jpg';
import demoBaGirisS1 from './assets/work/demo-ba-giris-s1.jpg';
import demoBaGirisS2 from './assets/work/demo-ba-giris-s2.jpg';
import demoBaGirisS3 from './assets/work/demo-ba-giris-s3.jpg';
import demoBaGirisSonra from './assets/work/demo-ba-giris-sonra.jpg';
import demoBaKanatOnce from './assets/work/demo-ba-kanat-once.jpg';
import demoBaKanatS1 from './assets/work/demo-ba-kanat-s1.jpg';
import demoBaKanatS2 from './assets/work/demo-ba-kanat-s2.jpg';
import demoBaKanatS3 from './assets/work/demo-ba-kanat-s3.jpg';
import demoBaKanatSonra from './assets/work/demo-ba-kanat-sonra.jpg';
import demoBaPencereOnce from './assets/work/demo-ba-pencere-once.jpg';
import demoBaPencereS1 from './assets/work/demo-ba-pencere-s1.jpg';
import demoBaPencereS2 from './assets/work/demo-ba-pencere-s2.jpg';
import demoBaPencereS3 from './assets/work/demo-ba-pencere-s3.jpg';
import demoBaPencereSonra from './assets/work/demo-ba-pencere-sonra.jpg';
import demoCepheOnce from './assets/work/demo-cephe-once.jpg';
import demoCepheSonra from './assets/work/demo-cephe-sonra.jpg';
import demoGAksam from './assets/work/demo-g-aksam.jpg';
import demoGBegonvil from './assets/work/demo-g-begonvil.jpg';
import demoGGiris from './assets/work/demo-g-giris.jpg';
import demoGIskele from './assets/work/demo-g-iskele.jpg';
import demoGKanat from './assets/work/demo-g-kanat.jpg';
import demoGKemer from './assets/work/demo-g-kemer.jpg';
import demoGKesif from './assets/work/demo-g-kesif.jpg';
import demoGLevha from './assets/work/demo-g-levha.jpg';
import demoHizmetAlci from './assets/work/demo-hizmet-alci.jpg';
import demoHizmetCephe from './assets/work/demo-hizmet-cephe.jpg';
import demoHizmetIzolasyon from './assets/work/demo-hizmet-izolasyon.jpg';
import demoOg from './assets/work/demo-og.jpg';
import gAvlu from './assets/work/g-avlu.jpg';
import gBegonvil from './assets/work/g-begonvil.jpg';
import gIskele from './assets/work/g-iskele.jpg';
import gKapi from './assets/work/g-kapi.jpg';
import gKemer from './assets/work/g-kemer.jpg';
import gPencere from './assets/work/g-pencere.jpg';
import gSeramikUsta from './assets/work/g-seramik-usta.jpg';
import gVilla from './assets/work/g-villa.jpg';
import gYikim from './assets/work/g-yikim.jpg';
import heroCepheYarim from './assets/work/hero-cephe-yarim.jpg';
import heroTeras from './assets/work/hero-teras.jpg';
import hizmetAlci from './assets/work/hizmet-alci.jpg';
import hizmetBoya from './assets/work/hizmet-boya.jpg';
import hizmetCephe from './assets/work/hizmet-cephe.jpg';
import hizmetDograma from './assets/work/hizmet-dograma.jpg';
import hizmetIzolasyon from './assets/work/hizmet-izolasyon.jpg';
import hizmetMutfak from './assets/work/hizmet-mutfak.jpg';
import hizmetSeramik from './assets/work/hizmet-seramik.jpg';
import mutfakOnce from './assets/work/mutfak-once.jpg';
import mutfakSonra from './assets/work/mutfak-sonra.jpg';
import surec1Kazima from './assets/work/surec-1-kazima.jpg';
import surec2Sap from './assets/work/surec-2-sap.jpg';
import surec3Kat1 from './assets/work/surec-3-kat1.jpg';
import surec4Kat2 from './assets/work/surec-4-kat2.jpg';
import surec5Kece from './assets/work/surec-5-kece.jpg';
import surec6Likit from './assets/work/surec-6-likit.jpg';
import surec7Sonuc from './assets/work/surec-7-sonuc.jpg';

export const img: Record<string, ImageMetadata> = {
  'ba-avlu-once': baAvluOnce,
  'ba-avlu-s1': baAvluS1,
  'ba-avlu-s2': baAvluS2,
  'ba-avlu-s3': baAvluS3,
  'ba-avlu-sonra': baAvluSonra,
  'ba-merdiven-once': baMerdivenOnce,
  'ba-merdiven-s1': baMerdivenS1,
  'ba-merdiven-s2': baMerdivenS2,
  'ba-merdiven-s3': baMerdivenS3,
  'ba-merdiven-sonra': baMerdivenSonra,
  'ba-teras-once': baTerasOnce,
  'ba-teras-s1': baTerasS1,
  'ba-teras-s2': baTerasS2,
  'ba-teras-s3': baTerasS3,
  'ba-teras-sonra': baTerasSonra,
  'ba-teras2-once': baTeras2Once,
  'ba-teras2-s1': baTeras2S1,
  'ba-teras2-s2': baTeras2S2,
  'ba-teras2-s3': baTeras2S3,
  'ba-teras2-sonra': baTeras2Sonra,
  'cephe-once': cepheOnce,
  'cephe-sonra': cepheSonra,
  'demo-ba-cephe-once': demoBaCepheOnce,
  'demo-ba-cephe-s1': demoBaCepheS1,
  'demo-ba-cephe-s2': demoBaCepheS2,
  'demo-ba-cephe-s3': demoBaCepheS3,
  'demo-ba-cephe-sonra': demoBaCepheSonra,
  'demo-ba-giris-once': demoBaGirisOnce,
  'demo-ba-giris-s1': demoBaGirisS1,
  'demo-ba-giris-s2': demoBaGirisS2,
  'demo-ba-giris-s3': demoBaGirisS3,
  'demo-ba-giris-sonra': demoBaGirisSonra,
  'demo-ba-kanat-once': demoBaKanatOnce,
  'demo-ba-kanat-s1': demoBaKanatS1,
  'demo-ba-kanat-s2': demoBaKanatS2,
  'demo-ba-kanat-s3': demoBaKanatS3,
  'demo-ba-kanat-sonra': demoBaKanatSonra,
  'demo-ba-pencere-once': demoBaPencereOnce,
  'demo-ba-pencere-s1': demoBaPencereS1,
  'demo-ba-pencere-s2': demoBaPencereS2,
  'demo-ba-pencere-s3': demoBaPencereS3,
  'demo-ba-pencere-sonra': demoBaPencereSonra,
  'demo-cephe-once': demoCepheOnce,
  'demo-cephe-sonra': demoCepheSonra,
  'demo-g-aksam': demoGAksam,
  'demo-g-begonvil': demoGBegonvil,
  'demo-g-giris': demoGGiris,
  'demo-g-iskele': demoGIskele,
  'demo-g-kanat': demoGKanat,
  'demo-g-kemer': demoGKemer,
  'demo-g-kesif': demoGKesif,
  'demo-g-levha': demoGLevha,
  'demo-hizmet-alci': demoHizmetAlci,
  'demo-hizmet-cephe': demoHizmetCephe,
  'demo-hizmet-izolasyon': demoHizmetIzolasyon,
  'demo-og': demoOg,
  'g-avlu': gAvlu,
  'g-begonvil': gBegonvil,
  'g-iskele': gIskele,
  'g-kapi': gKapi,
  'g-kemer': gKemer,
  'g-pencere': gPencere,
  'g-seramik-usta': gSeramikUsta,
  'g-villa': gVilla,
  'g-yikim': gYikim,
  'hero-cephe-yarim': heroCepheYarim,
  'hero-teras': heroTeras,
  'hizmet-alci': hizmetAlci,
  'hizmet-boya': hizmetBoya,
  'hizmet-cephe': hizmetCephe,
  'hizmet-dograma': hizmetDograma,
  'hizmet-izolasyon': hizmetIzolasyon,
  'hizmet-mutfak': hizmetMutfak,
  'hizmet-seramik': hizmetSeramik,
  'mutfak-once': mutfakOnce,
  'mutfak-sonra': mutfakSonra,
  'surec-1-kazima': surec1Kazima,
  'surec-2-sap': surec2Sap,
  'surec-3-kat1': surec3Kat1,
  'surec-4-kat2': surec4Kat2,
  'surec-5-kece': surec5Kece,
  'surec-6-likit': surec6Likit,
  'surec-7-sonuc': surec7Sonuc,
};
