import {
  AchievementBadge,
  SalawatCategory,
  TakbirItem,
  TasbihPreset,
} from '../types';

export const HERO_IMAGE_URL =
  '/src/assets/images/hero_islamic_sanctuary_1795181148255.jpg';
export const TAKBIR_IMAGE_URL =
  '/src/assets/images/takbir_sanctuary_arch_1795181118789.jpg';
export const MARATHON_CREST_URL =
  '/src/assets/images/marathon_crescent_crest_1795181118234.jpg';

export const DAILY_MOTIVATIONS: string[] = [
  'Bugun ham qalbingizni salovat nuri bilan munavvar qiling.',
  'Har bir salovat — qalb xotirjamligi va rahmat kalitidir.',
  'Tilingiz zikr bilan, qalbingiz shukr bilan band bo‘lsin.',
  'Allohning zikri ila qalblar orom topur.',
  'Kichik bo‘lsa-da, davomli zikr hayotga baraka olib kiradi.',
  'Payg‘ambarimiz Muhammad sollallohu alayhi vasallamga salovat aytishni unutmang.',
  'Bugungi kuningizni Allohni ulug‘lash va salovat bilan boshlang.',
  'Salovat aytgan banda Allohning rahmati va salomiga sazovor bo‘ladi.',
  'Har bir nafasda shukr, har bir qadamda zikr bo‘lsin.',
  'Qalbingizda g‘am bo‘lsa, istig‘for va salovat bilan yorug‘lik kiriting.',
  'Zikr — qalbning ozuqasi, ruhning osoyishtaligidir.',
  'Juma va har kunda Payg‘ambarimizga ko‘p salovat yo‘llang.',
  'Allohu akbar kalimasi bilan qalbdagi tashvishlar yengillashadi.',
  'Bugun niyat qiling va kundalik zikr marafoningizni davom ettiring.',
];

export const SALAWAT_CATEGORIES: SalawatCategory[] = [
  {
    id: 'ibrohimiya',
    order: 1,
    title: 'Salovati Ibrohimiya',
    shortDesc: 'Namozda o‘qiladigan eng sahih salovat',
    description:
      'Sahih hadislar to‘plamlarida keltirilgan, har bir namozning oxirgi o‘tirishida o‘qiladigan eng ulug‘ va sahih salovat.',
    iconName: 'sun',
    defaultTarget: 33,
    items: [
      {
        id: 'ibrohimiya-1',
        title: 'Salovati Ibrohimiya',
        arabic:
          'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ. اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
        transliteration:
          'Allohumma solli ‘ala Muhammadin va ‘ala ali Muhammad, kama sollayta ‘ala Ibrohima va ‘ala ali Ibrohim, innaka Hamidun Majid. Allohumma barik ‘ala Muhammadin va ‘ala ali Muhammad, kama barokta ‘ala Ibrohima va ‘ala ali Ibrohim, innaka Hamidun Majid.',
        translation:
          'Ey Allohim! Ibrohim va Ibrohimning oilasiga rahmat yo‘llaganing kabi, Muhammadga va Muhammadning oilasiga ham rahmat yo‘llagin. Albatta, Sen maqtovga sazovor va ulug‘ Zotsan. Ey Allohim! Ibrohim va Ibrohimning oilasiga baraka ato etganing kabi, Muhammadga va Muhammadning oilasiga ham baraka ato etgin. Albatta, Sen maqtovga sazovor va ulug‘ Zotsan.',
        source: 'Imom Buxoriy va Imom Muslim rivoyati',
      },
    ],
  },
  {
    id: 'fatih',
    order: 2,
    title: 'Salovati Fatih',
    shortDesc: 'Yopiq eshiklarni ochish duosi bilan salovat',
    description:
      'Payg‘ambarimiz sollallohu alayhi vasallamga hamd va salom yo‘llashda o‘qiladigan mumtoz salovat namunasi.',
    iconName: 'key',
    defaultTarget: 33,
    items: [
      {
        id: 'fatih-1',
        title: 'Salovati Fatih',
        arabic:
          'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ الْفَاتِحِ لِمَا أُغْلِقَ، وَالْخَاتِمِ لِمَا سَبَقَ، نَاصِرِ الْحَقِّ بِالْحَقِّ، وَالْهَادِي إِلَى صِرَاطِكَ الْمُسْتَقِيمِ، وَعَلَى آلِهِ حَقَّ قَدْرِهِ وَمِقْدَارِهِ الْعَظِيمِ',
        transliteration:
          'Allohumma solli ‘ala sayyidina Muhammadinil-fatihi lima ug‘liqo, val-xotimi lima sabaqo, nosiril-haqqi bil-haqqi, val-hadi ila sirotikal-mustaqim, va ‘ala alihi haqqo qodrihi va miqdorihil-‘azim.',
        translation:
          'Ey Allohim! Yopilganlarni ochuvchi, o‘tgan payg‘ambarlarni yakunlovchi, haqni haq bilan qo‘llovchi va Sening to‘g‘ri yo‘lingga boshlovchi sayyidimiz Muhammadga hamda u zotning oilalariga qadr-qimmati va ulug‘ligiga munosib salovat yo‘llagin.',
        source: 'Mumtoz salovatlar majmuasidan',
      },
    ],
  },
  {
    id: 'munjiyat',
    order: 3,
    title: 'Salovati Munjiyat',
    shortDesc: 'Balolardan najot va hojatlar ravo bo‘lishi duosi',
    description:
      'Qiyinchilik va g‘am-tashvish paytida Allohdan najot va yengillik so‘rab o‘qiladigan ma’shur salovat duosi.',
    iconName: 'compass',
    defaultTarget: 33,
    items: [
      {
        id: 'munjiyat-1',
        title: 'Salovati Munjiyat',
        arabic:
          'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِينَا بِهَا مِنْ جَمِيعِ الْأَهْوَالِ وَالْآفَاتِ، وَتَقْضِي لَنَا بِهَا جَمِيعَ الْحَاجَاتِ، وَتُطَهِّرُنَا بِهَا مِنْ جَمِيعِ السَّيِّئَاتِ، وَتَرْفَعُنَا بِهَا عِنْدَكَ أَعْلَى الدَّرَجَاتِ، وَتُبَلِّغُنَا بِهَا أَقْصَى الْغَايَاتِ مِنْ جَمِيعِ الْخَيْرَاتِ فِي الْحَيَاةِ وَبَعْدَ الْمَمَاتِ',
        transliteration:
          'Allohumma solli ‘ala sayyidina Muhammadin solatan tunjina biha min jami‘il-ahvali val-afat, va taqzi lana biha jami‘al-hajat, va tutohhiruna biha min jami‘is-sayyiat, va tarfa‘una biha ‘indaka a‘lad-darajat, va tuballig‘una biha aqsol-g‘oyati min jami‘il-xoyroti fil-hayati va ba‘dal-mamat.',
        translation:
          'Ey Allohim! Sayyidimiz Muhammadga shunday salovat yo‘llaginki, uning barakotidan bizni barcha qo‘rquv va ofatlardan qutqargin, barcha hojatlarimizni ravo qilgin, barcha gunohlarimizdan poklagin, O‘z huzuringda oliy darajalarga ko‘targan holda hayotda ham, o‘limdan keyin ham barcha yaxshiliklarning eng yuksak cho‘qqisiga yetkazgin.',
        source: 'Ulamolar tajribasida ma’lum salovat duosi',
      },
    ],
  },
  {
    id: 'nariya',
    order: 4,
    title: 'Salovati Nariya',
    shortDesc: 'Tugunlar yechilishi va g‘amlar arishi uchun salovat',
    description:
      '«Salovati Tafrijiya» nomi bilan ham tanilgan, Allohdan mushkullarni oson qilishini so‘rab o‘qiladigan komil salovat.',
    iconName: 'flame',
    defaultTarget: 33,
    items: [
      {
        id: 'nariya-1',
        title: 'Salovati Nariya (Tafrijiya)',
        arabic:
          'اللَّهُمَّ صَلِّ صَلَاةً كَامِلَةً وَسَلِّمْ سَلَامًا تَامًّا عَلَى سَيِّدِنَا مُحَمَّدٍ الَّذِي تَنْحَلُّ بِهِ الْعُقَدُ، وَتَنْفَرِجُ بِهِ الْكُرَبُ، وَتُقْضَى بِهِ الْحَوَائِجُ، وَتُنَالُ بِهِ الرَّغَائِبُ وَحُسْنُ الْخَوَاتِمِ، وَيُسْتَسْقَى الْغَمَامُ بِوَجْهِهِ الْكَرِيمِ، وَعَلَى آلِهِ وَصَحْبِهِ فِي كُلِّ لَمْحَةٍ وَنَفَسٍ بِعَدَدِ كُلِّ مَعْلُومٍ لَكَ',
        transliteration:
          'Allohumma solli solatan kamilatan va sallim salaman tamman ‘ala sayyidina Muhammadinillazi tanhallu bihil-‘uqodu, va tanfariju bihil-kurobu, va tuqzo bihil-hava’iju, va tunalu bihir-rog‘oibu va husnul-xovatimi, va yustasqol-g‘omamu bivajhihil-karim, va ‘ala alihi va sohbihi fi kulli lamhatin va nafasin bi‘adadi kulli ma‘lumin lak.',
        translation:
          'Ey Allohim! Sayyidimiz Muhammadga komil salovat va mukammal salom yo‘llagin — shunday zotki, u sababli tugunlar yechiladi, g‘am-tashvishlar ariydi, hojatlar ravo bo‘ladi, orzular va xayrli xotimalarga yetiladi hamda karamli yuzlari hurmatidan yomg‘ir so‘raladi. U zotning oilalari va sahobalariga ham har bir ko‘z ochib-yumishda va har bir nafasda O‘zing biladigan barcha narsalar adadicha salovat va salom bo‘lsin.',
        source: 'Islomiy duo va salovat an’anasidan',
      },
    ],
  },
  {
    id: 'tunjina',
    order: 5,
    title: 'Salovati Tunjina',
    shortDesc: 'Najot va qalb xotirjamligi so‘raladigan salovat',
    description:
      'Yurtimiz musulmonlari orasida ko‘p o‘qiladigan, boshga tashvish tushganda Allohdan yengillik va omonlik tilab aytiladigan salovat.',
    iconName: 'anchor',
    defaultTarget: 33,
    items: [
      {
        id: 'tunjina-1',
        title: 'Salovati Tunjina',
        arabic:
          'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِينَا بِهَا مِنْ كُلِّ هَمٍّ وَغَمٍّ، وَتُفَرِّجُ بِهَا عَنَّا كُلَّ كَرْبٍ، وَتَقْضِي لَنَا بِهَا جَمِيعَ الْحَاجَاتِ، وَتُبَلِّغُنَا بِهَا أَقْصَى الْمُرَادِ فِي الدُّنْيَا وَالْآخِرَةِ',
        transliteration:
          'Allohumma solli ‘ala sayyidina Muhammadin va ‘ala ali sayyidina Muhammadin solatan tunjina biha min kulli hammin va g‘ammin, va tufarriju biha ‘anna kulla karbin, va taqzi lana biha jami‘al-hajat, va tuballig‘una biha aqsol-murodi fid-dunya val-axiroh.',
        translation:
          'Ey Allohim! Sayyidimiz Muhammadga va u zotning oilalariga shunday salovat yo‘llaginki, uning vositasida bizni har qanday g‘am va tashvishdan qutqargin, barcha mashaqqatlarimizni aritgin, hojatlarimizni ravo qilgin va dunyo-yu oxiratdagi ezgu maqsadlarimizga yetkazgin.',
        source: 'An’anaviy Tunjina (najot) duolaridan',
      },
    ],
  },
  {
    id: 'shifo',
    order: 6,
    title: 'Salovati Shifo',
    shortDesc: 'Qalb va badan shifosi so‘raladigan salovat',
    description:
      'Qalblar tabibi Muhammad sollallohu alayhi vasallamga salovat aytib, Allohdan ruhiy va jismoniy shifo so‘rash duosi.',
    iconName: 'heart-pulse',
    defaultTarget: 33,
    items: [
      {
        id: 'shifo-1',
        title: 'Salovati Shifo (Tibbul-qulub)',
        arabic:
          'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ طِبِّ الْقُلُوبِ وَدَوَائِهَا، وَعَافِيَةِ الْأَبْدَانِ وَشِفَائِهَا، وَنُورِ الْأَبْصَارِ وَضِيَائِهَا، وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ',
        transliteration:
          'Allohumma solli ‘ala sayyidina Muhammadin tibbil-qulubi va davaiha, va ‘afiyatil-abdani va shifaiha, va nuril-absori va ziyaiha, va ‘ala alihi va sohbihi va sallim.',
        translation:
          'Ey Allohim! Qalblarning tabibi va davosi, badanlarning ofiyati va shifosi, ko‘zlarning nuri va ziyosi bo‘lgan sayyidimiz Muhammadga, u zotning oilalari va sahobalariga salovat va salom yo‘llagin.',
        source: 'Tibbul-qulub salovati (mumtoz majmua)',
      },
    ],
  },
  {
    id: 'qisqa',
    order: 7,
    title: 'Qisqa salovatlar',
    shortDesc: 'Har onda oson aytiladigan sahih salovatlar',
    description:
      'Yo‘lda, ishda va bo‘sh vaqtda tilingizni doimo salovat bilan namlab turish uchun qisqa va sahih lafzlar.',
    iconName: 'feather',
    defaultTarget: 100,
    items: [
      {
        id: 'qisqa-1',
        title: 'Sollallohu alayhi va sallam',
        arabic: 'صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
        transliteration: 'Sollallohu ‘alayhi va sallam.',
        translation: 'Alloh u zotga salovat va salom yo‘llasin.',
        source: 'Sahih sunnatda eng ko‘p qo‘llaniladigan lafz',
      },
      {
        id: 'qisqa-2',
        title: 'Allohumma solli va sallim',
        arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ',
        transliteration: 'Allohumma solli va sallim ‘ala nabiyyina Muhammad.',
        translation:
          'Ey Allohim, Payg‘ambarimiz Muhammadga salovat va salom yo‘llagin.',
        source: 'Kunlik zikrlarda tavsiya etilgan qisqa salovat',
      },
      {
        id: 'qisqa-3',
        title: 'Qisqa Ibrohimiya',
        arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ',
        transliteration: 'Allohumma solli ‘ala Muhammadin va ‘ala ali Muhammad.',
        translation:
          'Ey Allohim, Muhammadga va Muhammadning oilasiga salovat yo‘llagin.',
        source: 'Sahih hadis matnidan qisqa shakl',
      },
    ],
  },
  {
    id: 'salomlar',
    order: 8,
    title: 'Payg‘ambarimizga salomlar',
    shortDesc: 'Rasululloh ﷺ ga muhabbat va salom yo‘llash',
    description:
      'Payg‘ambarimiz Muhammad alayhissalomga tashahhud va salom majlislarida yo‘llanadigan go‘zal salomlar.',
    iconName: 'sparkles',
    defaultTarget: 33,
    items: [
      {
        id: 'salomlar-1',
        title: 'Tashahhuddagi salom',
        arabic: 'السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
        transliteration:
          'Assalamu ‘alayka ayyuhan-nabiyyu va rohmatullohi va barokatuh.',
        translation:
          'Ey Payg‘ambar! Sizga Allohning salomi, rahmati va barakotlari bo‘lsin.',
        source: 'Sahih Buxoriy va Muslim (Tashahhud)',
      },
      {
        id: 'salomlar-2',
        title: 'Rasulullohga salot va salom',
        arabic: 'الصَّلَاةُ وَالسَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ',
        transliteration: 'Assolatu vassalamu ‘alayka ya Rosulalloh.',
        translation: 'Ey Allohning Rasuli, sizga salot va salom bo‘lsin.',
        source: 'Masjidi Nabaviyda salom berish odobidan',
      },
      {
        id: 'salomlar-3',
        title: 'Habibullohga salom',
        arabic: 'الصَّلَاةُ وَالسَّلَامُ عَلَيْكَ يَا حَبِيبَ اللَّهِ',
        transliteration: 'Assolatu vassalamu ‘alayka ya Habiballoh.',
        translation: 'Ey Allohning habibi, sizga salot va salom bo‘lsin.',
        source: 'An’anaviy salom lafzlari',
      },
    ],
  },
  {
    id: 'quron-duolar',
    order: 9,
    title: 'Qur’onda kelgan duolar',
    shortDesc: 'Muqaddas Qur’on oyatlaridagi muborak duolar',
    description:
      'Qur’oni Karimda nozil bo‘lgan, payg‘ambarlar va mo‘minlar tilidan aytilgan eng fazilatli rabboniy duolar.',
    iconName: 'book-open',
    defaultTarget: 33,
    items: [
      {
        id: 'quron-1',
        title: 'Ikki dunyo saodati duosi',
        arabic:
          'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration:
          'Robbana atina fid-dunya hasanatan va fil-axiroti hasanatan va qina ‘azaban-nar.',
        translation:
          'Parvardigoro! Bizga bu dunyoda ham yaxshilik ato etgin, oxiratda ham yaxshilik ato etgin va bizni do‘zax azobidan asragin.',
        source: 'Baqara surasi, 201-oyat',
      },
      {
        id: 'quron-2',
        title: 'Qalb sobitligi duosi',
        arabic:
          'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ',
        transliteration:
          'Robbana la tuzig‘ qulubana ba‘da iz hadaytana va hab lana min ladunka rohmatan innaka antal-Vahhab.',
        translation:
          'Parvardigoro! Bizni hidoyat qilganingdan keyin qalblarimizni og‘dirmagin va bizga O‘z huzuringdan rahmat ato etgin. Albatta, Sen behisob ato etuvchi Zotsan.',
        source: 'Oli Imron surasi, 8-oyat',
      },
      {
        id: 'quron-3',
        title: 'Ishlar oson bo‘lishi duosi',
        arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
        transliteration: 'Robbi ishroh li sodri va yassir li amri.',
        translation:
          'Parvardigorim! Qalbimni keng qilgin va ishimni menga oson aylagin.',
        source: 'Toha surasi, 25–26-oyatlar',
      },
      {
        id: 'quron-4',
        title: 'Yunus alayhissalom duosi',
        arabic:
          'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
        transliteration:
          'La ilaha illa anta subhanaka inni kuntu minaz-zolimin.',
        translation:
          'Sendan o‘zga iloh yo‘q, Sen poksan. Albatta, men o‘zimga zulm qiluvchilardan bo‘ldim.',
        source: 'Anbiyo surasi, 87-oyat',
      },
    ],
  },
  {
    id: 'maxsus',
    order: 10,
    title: 'Maxsus salovatlar',
    shortDesc: 'Juma va muborak kunlar uchun tanlangan salovatlar',
    description:
      'Juma kuni va alohida zikr majlislarida o‘qish uchun tanlangan, sahih hadislarga asoslangan maxsus salovatlar.',
    iconName: 'crown',
    defaultTarget: 100,
    items: [
      {
        id: 'maxsus-1',
        title: 'Salovati Ummiy',
        arabic:
          'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ النَّبِيِّ الْأُمِّيِّ وَعَلَى آلِهِ وَسَلِّمْ تَسْلِيمًا',
        transliteration:
          'Allohumma solli ‘ala Muhammadin-nabiyyil-ummiyyi va ‘ala alihi va sallim taslima.',
        translation:
          'Ey Allohim! Ummiy Payg‘ambar Muhammadga va u zotning oilalariga ko‘pdan-ko‘p salovat va salom yo‘llagin.',
        source: 'Sunan Abu Dovud va Ahmad rivoyatlaridan',
      },
      {
        id: 'maxsus-2',
        title: 'Abduka va Rosulika salovati',
        arabic:
          'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ عَبْدِكَ وَرَسُولِكَ النَّبِيِّ الْأُمِّيِّ، وَعَلَى آلِ مُحَمَّدٍ وَأَزْوَاجِهِ وَذُرِّيَّتِهِ',
        transliteration:
          'Allohumma solli ‘ala Muhammadin ‘abdika va rosulikan-nabiyyil-ummiyyi va ‘ala ali Muhammadin va azvajihi va zurriyyatih.',
        translation:
          'Ey Allohim! Sening bandang va elching, ummiy Payg‘ambar Muhammadga, u zotning oilalariga, pok juftlariga va zurriyotlariga salovat yo‘llagin.',
        source: 'Sahih Buxoriy rivoyati',
      },
    ],
  },
];

export const TAKBIR_ITEMS: TakbirItem[] = [
  {
    id: 'takbir-tashriq',
    title: 'Takbiri Tashriq',
    shortDesc: 'Ulug‘ bayram va zikr kunlarining takbiri',
    arabic:
      'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
    transliteration:
      'Allohu akbar, Allohu akbar, la ilaha illallohu vallohu akbar, Allohu akbar va lillahil-hamd.',
    translation:
      'Alloh buyukdir, Alloh buyukdir. Allohdan o‘zga iloh yo‘q va Alloh buyukdir. Alloh buyukdir va barcha hamd Allohga xosdir.',
    source: 'Tashriq kunlari aytiladigan mashhur takbir',
    defaultTarget: 33,
  },
  {
    id: 'takbir-qisqa',
    title: 'Qisqa Takbir',
    shortDesc: 'Namozdan so‘ng va har onda aytiladigan takbir',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allohu akbar.',
    translation: 'Alloh eng buyukdir.',
    source: 'Har namozdan keyingi 33 martalik tasbih zikri',
    defaultTarget: 33,
  },
  {
    id: 'takbir-boqiyot',
    title: 'Boqiyotu Solihot',
    shortDesc: 'Tasbih, hamd, tahlil va takbir jamlanmasi',
    arabic:
      'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
    transliteration:
      'Subhanalloh, val-hamdulillah, va la ilaha illalloh, vallohu akbar.',
    translation:
      'Alloh barcha nuqsonlardan pokdir, hamd Allohga xosdir, Allohdan o‘zga iloh yo‘q va Alloh eng buyukdir.',
    source: 'Imom Muslim rivoyati',
    defaultTarget: 33,
  },
  {
    id: 'takbir-kabir',
    title: 'Takbiri Kabir',
    shortDesc: 'Ertalab va kechqurun Allohni ulug‘lash zikri',
    arabic:
      'اللَّهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا',
    transliteration:
      'Allohu akbar kabiro, val-hamdulillahi kasiro, va subhanallohi bukrotan va asilo.',
    translation:
      'Alloh behad buyukdir, Allohga ko‘pdan-ko‘p hamd bo‘lsin, ertayu kech Allohga tasbih bo‘lsin.',
    source: 'Imom Muslim rivoyati',
    defaultTarget: 33,
  },
];

export const TASBIH_PRESETS: TasbihPreset[] = [
  {
    id: 'tasbih-subhanalloh',
    title: 'Subhanalloh',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'Subhanalloh',
    translation: 'Alloh barcha nuqsonlardan pokdir.',
    defaultTarget: 33,
    categoryType: 'tasbih',
  },
  {
    id: 'tasbih-alhamdulillah',
    title: 'Alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation: 'Barcha hamd Allohga xosdir.',
    defaultTarget: 33,
    categoryType: 'tasbih',
  },
  {
    id: 'tasbih-allohu-akbar',
    title: 'Allohu akbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allohu akbar',
    translation: 'Alloh eng buyukdir.',
    defaultTarget: 33,
    categoryType: 'takbir',
  },
  {
    id: 'tasbih-salovat',
    title: 'Salovat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',
    transliteration: 'Allohumma solli ‘ala Muhammad',
    translation: 'Ey Allohim, Muhammadga salovat yo‘llagin.',
    defaultTarget: 100,
    categoryType: 'salawat',
  },
  {
    id: 'tasbih-istigfor',
    title: 'Astag‘firulloh',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ',
    transliteration: 'Astag‘firullohal-‘azim',
    translation: 'Ulug‘ Allohdan mag‘firat so‘rayman.',
    defaultTarget: 100,
    categoryType: 'tasbih',
  },
  {
    id: 'tasbih-tahlil',
    title: 'La ilaha illalloh',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    transliteration: 'La ilaha illalloh',
    translation: 'Allohdan o‘zga iloh yo‘q.',
    defaultTarget: 100,
    categoryType: 'tasbih',
  },
];

export function getDailyMotivation(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return DAILY_MOTIVATIONS[dayOfYear % DAILY_MOTIVATIONS.length];
}

export function buildAchievements(
  totalSalawat: number,
  totalTakbir: number,
  totalAllZikr: number,
  streak: number
): AchievementBadge[] {
  return [
    {
      id: 'first-step',
      title: 'Ilk qadam',
      description: 'Ilovada ilk 10 ta salovat yoki zikrni bajaring',
      requirementLabel: '10 ta zikr',
      unlocked: totalAllZikr >= 10,
      progress: Math.min(totalAllZikr, 10),
      target: 10,
      icon: 'crescent',
    },
    {
      id: 'salawat-100',
      title: '100 Salovat',
      description: 'Jami 100 marta salovat ayting',
      requirementLabel: '100 salovat',
      unlocked: totalSalawat >= 100,
      progress: Math.min(totalSalawat, 100),
      target: 100,
      icon: 'star',
    },
    {
      id: 'takbir-100',
      title: 'Takbir nuri',
      description: 'Jami 100 marta takbir ayting',
      requirementLabel: '100 takbir',
      unlocked: totalTakbir >= 100,
      progress: Math.min(totalTakbir, 100),
      target: 100,
      icon: 'compass',
    },
    {
      id: 'salawat-313',
      title: '313 Marafonchi',
      description: 'Jami 313 ta salovat marafonini yakunlang',
      requirementLabel: '313 salovat',
      unlocked: totalSalawat >= 313,
      progress: Math.min(totalSalawat, 313),
      target: 313,
      icon: 'award',
    },
    {
      id: 'streak-7',
      title: '7 kunlik barqarorlik',
      description: 'Ketma-ket 7 kun zikr va salovat ayting',
      requirementLabel: '7 kun',
      unlocked: streak >= 7,
      progress: Math.min(streak, 7),
      target: 7,
      icon: 'flame',
    },
    {
      id: 'zikr-1000',
      title: '1 000 Zikr sohibi',
      description: 'Barcha bo‘limlarda jami 1 000 ta zikr to‘plang',
      requirementLabel: '1 000 zikr',
      unlocked: totalAllZikr >= 1000,
      progress: Math.min(totalAllZikr, 1000),
      target: 1000,
      icon: 'heart',
    },
  ];
}
