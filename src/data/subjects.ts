import type { Subject, SubjectSummary } from "./types";

export const subjects: Subject[] = [
  {
    slug: "anatomy",
    name: "解剖学",
    description: "消化器、泌尿器、感覚器、神経、運動器を構造から整理。",
    questionCount: 27,
    color: "bg-mint"
  },
  {
    slug: "physiology",
    name: "生理学",
    description: "恒常性、神経、内分泌、呼吸、生殖を機能でつなぐ。",
    questionCount: 23,
    color: "bg-amber/30"
  },
  {
    slug: "biochemistry",
    name: "生化学",
    description: "脂質輸送、糖新生、酵素調節、酸化ストレスを確認。",
    questionCount: 11,
    color: "bg-coral/15"
  },
  {
    slug: "bacteriology",
    name: "細菌学",
    description: "染色、毒素、主要菌種、感染経路を国試目線で整理。",
    questionCount: 8,
    color: "bg-mint"
  },
  {
    slug: "pharmacology",
    name: "薬理学",
    description: "作用機序、副作用、禁忌、代表薬をつなげて暗記。",
    questionCount: 24,
    color: "bg-amber/30"
  },
  {
    slug: "internal-medicine",
    name: "内科学",
    description: "犬猫、馬、産業動物の内科疾患を症候と治療から整理。",
    questionCount: 15,
    color: "bg-coral/15"
  },
  {
    slug: "toxicology",
    name: "中毒学",
    description: "植物毒、原因物質、胎子毒性をセットで復習。",
    questionCount: 9,
    color: "bg-sky-100"
  },
  {
    slug: "pathology",
    name: "病理学",
    description: "変性、沈着、死後変化、疾患別病変を整理。",
    questionCount: 11,
    color: "bg-coral/15"
  },
  {
    slug: "immunology",
    name: "免疫学",
    description: "細胞マーカー、アレルギー、ワクチン機序を確認。",
    questionCount: 5,
    color: "bg-mint"
  },
  {
    slug: "oncology",
    name: "腫瘍学",
    description: "好発腫瘍と由来組織を短く結びつける。",
    questionCount: 6,
    color: "bg-amber/30"
  },
  {
    slug: "virology",
    name: "ウイルス学",
    description: "逆転写、再集合、代表疾患とウイルス科を整理。",
    questionCount: 14,
    color: "bg-sky-100"
  },
  {
    slug: "mycology",
    name: "真菌学",
    description: "酵母、糸状菌、二形性真菌の形態を見分ける。",
    questionCount: 4,
    color: "bg-coral/15"
  },
  {
    slug: "infectious-diseases",
    name: "感染症学",
    description: "家畜伝染病、人獣共通感染症、病原体と病変を整理。",
    questionCount: 12,
    color: "bg-mint"
  },
  {
    slug: "parasitology",
    name: "寄生虫学",
    description: "生活環、宿主、検査法を図解しやすい粒度で復習。",
    questionCount: 20,
    color: "bg-sky-100"
  },
  {
    slug: "public-health",
    name: "公衆衛生",
    description: "食品衛生、薬剤耐性、行政組織、ジビエを確認。",
    questionCount: 46,
    color: "bg-mint"
  },
  {
    slug: "law",
    name: "法規",
    description: "保存年限や資格要件など数字で問われる論点を整理。",
    questionCount: 19,
    color: "bg-amber/30"
  },
  {
    slug: "clinical",
    name: "臨床",
    description: "身体所見、検査値、症候を病態と結びつける。",
    questionCount: 5,
    color: "bg-coral/15"
  },
  {
    slug: "metabolism",
    name: "代謝",
    description: "産業動物で頻出の代謝性疾患を確認。",
    questionCount: 2,
    color: "bg-sky-100"
  },
  {
    slug: "imaging",
    name: "画像診断",
    description: "造影、散乱線、読影前提の基礎を押さえる。",
    questionCount: 12,
    color: "bg-mint"
  },
  {
    slug: "anesthesia",
    name: "麻酔学",
    description: "鎮痛、換気評価、周術期管理を整理。",
    questionCount: 5,
    color: "bg-amber/30"
  },
  {
    slug: "orthopedics",
    name: "整形外科",
    description: "骨折分類や運動器疾患を演習で確認。",
    questionCount: 3,
    color: "bg-coral/15"
  },
  {
    slug: "surgery",
    name: "外科学",
    description: "縫合法、吻合、基本手技を国試目線で復習。",
    questionCount: 11,
    color: "bg-sky-100"
  },
  {
    slug: "reproduction",
    name: "繁殖学",
    description: "妊娠認識、妊娠診断、胎盤性ホルモンを確認。",
    questionCount: 14,
    color: "bg-mint"
  },
  {
    slug: "genetics",
    name: "遺伝病学",
    description: "遺伝性疾患と代謝異常を関連づけて整理。",
    questionCount: 3,
    color: "bg-amber/30"
  },
  {
    slug: "production-animal-internal",
    name: "産業動物内科学",
    description: "牛の代謝、消化器、栄養性疾患を現場目線で確認。",
    questionCount: 9,
    color: "bg-coral/15"
  },
  {
    slug: "nutrition",
    name: "栄養学",
    description: "ビタミン、飼料、栄養障害を国試頻出論点で整理。",
    questionCount: 5,
    color: "bg-sky-100"
  },
  {
    slug: "neurology",
    name: "神経病学",
    description: "前庭障害など神経徴候を病変部位と結びつける。",
    questionCount: 2,
    color: "bg-mint"
  },
  {
    slug: "behavior",
    name: "行動学",
    description: "問題行動の背景、身体疾患、環境要因を整理。",
    questionCount: 3,
    color: "bg-amber/30"
  },
  {
    slug: "laboratory-animal",
    name: "実験動物学",
    description: "ウサギ、げっ歯類などの特性と麻酔管理を確認。",
    questionCount: 6,
    color: "bg-coral/15"
  },
  {
    slug: "fish-diseases",
    name: "魚病学",
    description: "魚類感染症、寄生虫病、栄養性疾患を整理。",
    questionCount: 5,
    color: "bg-sky-100"
  }
];

export const subjectSummaries: SubjectSummary[] = [
  {
    slug: "bacteriology",
    title: "細菌学 重要ポイント総まとめ",
    description:
      "国試で繰り返し問われる総論、グラム染色、毒素、代表菌の特徴を短時間で確認できます。",
    sections: [
      {
        id: "overview",
        title: "総論",
        lead: "まずは分類と検査の軸を押さえると、個別菌の知識が整理しやすくなります。",
        points: [
          "グラム染色は細胞壁構造の違いを利用する基本検査。",
          "芽胞形成菌、抗酸菌、マイコプラズマは例外として出題されやすい。",
          "培養条件、酸素要求性、動物種ごとの好発疾患をセットで覚える。"
        ],
        relatedQuestionSlugs: ["bacteriology-51", "bacteriology-53"]
      },
      {
        id: "toxin",
        title: "内毒素と外毒素",
        lead: "毒素問題は由来、熱安定性、免疫原性の比較が頻出です。",
        points: [
          "内毒素はグラム陰性菌外膜のLPSに由来する。",
          "外毒素はタンパク質性で、毒素型食中毒や神経症状と結びつく。",
          "ショック、発熱、DICなど全身反応は内毒素の典型論点。"
        ],
        relatedQuestionSlugs: ["bacteriology-51"]
      },
      {
        id: "clinical",
        title: "臨床と結びつける",
        lead: "菌名だけでなく、検体、症状、治療方針まで一本の線で思い出せる状態を作ります。",
        points: [
          "呼吸器、泌尿器、皮膚など臓器別に代表菌を整理する。",
          "人獣共通感染症では届出・公衆衛生上の扱いも確認する。",
          "抗菌薬は第一選択だけでなく、耐性機序もセットで復習する。"
        ],
        relatedQuestionSlugs: ["bacteriology-54"]
      }
    ]
  }
];
