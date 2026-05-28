import type { Question } from "./types";

type RawOfficialQuestion = {
  id: number;
  category: string;
  text: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
  point: string;
  frequency: number;
};

const categoryMap: Record<string, { slug: string; subject: string }> = {
  解剖: { slug: "anatomy", subject: "解剖学" },
  生理: { slug: "physiology", subject: "生理学" },
  生化学: { slug: "biochemistry", subject: "生化学" },
  薬理: { slug: "pharmacology", subject: "薬理学" },
  中毒: { slug: "toxicology", subject: "中毒学" },
  病理: { slug: "pathology", subject: "病理学" },
  免疫: { slug: "immunology", subject: "免疫学" },
  腫瘍: { slug: "oncology", subject: "腫瘍学" },
  ウイルス: { slug: "virology", subject: "ウイルス学" },
  細菌: { slug: "bacteriology", subject: "細菌学" },
  真菌: { slug: "mycology", subject: "真菌学" },
  寄生虫: { slug: "parasitology", subject: "寄生虫学" },
  公衆衛生: { slug: "public-health", subject: "公衆衛生" },
  法規: { slug: "law", subject: "法規" },
  臨床: { slug: "clinical", subject: "臨床" },
  代謝: { slug: "metabolism", subject: "代謝" },
  画像: { slug: "imaging", subject: "画像診断" },
  麻酔: { slug: "anesthesia", subject: "麻酔学" },
  整形: { slug: "orthopedics", subject: "整形外科" },
  外科: { slug: "surgery", subject: "外科学" },
  繁殖: { slug: "reproduction", subject: "繁殖学" },
  遺伝: { slug: "genetics", subject: "遺伝学" }
};

const choiceIds = ["a", "b", "c", "d", "e"] as const;

function importanceFromFrequency(frequency: number): 1 | 2 | 3 {
  if (frequency >= 4) return 3;
  if (frequency === 3) return 2;
  return 1;
}

function titleFromText(text: string) {
  return text.split("\n")[0].replace(/。$/, "") + "。";
}

const rawOfficialQuestions: RawOfficialQuestion[] = [
  {
    id: 1,
    category: "解剖",
    text: "哺乳類家畜の消化器に関する記述として正しいのはどれか\na 固有食道腺は主に漿液細胞から構成される。\nb 馬の胃のヒダ状縁は幽門部にある。\nc 牛は盲腸膨起がある。\nd 犬は総肝管をもたない。\ne 副膵管は胎子の背側膵芽の導管に由来する。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 4,
    explanation:
      "固有食道腺は粘液腺であり、潤滑の役割を持つため漿液ではない。馬のヒダ状縁（margo plicatus）は非腺部と腺部の境界にあり、幽門ではない。盲腸膨起は馬で発達する構造であり、牛では見られない。犬は総肝管を形成しないことが多く、肝管が直接胆嚢管と合流する。副膵管は背側膵芽由来であり、主膵管は腹側膵芽由来である。",
    point: "犬は総肝管なし、副膵管は背側膵芽由来",
    frequency: 4
  },
  {
    id: 2,
    category: "解剖",
    text: "哺乳類家畜の泌尿器に関する記述として正しいのはどれか。\na 犬の左腎臓は右腎臓より頭側に位置する。\nb 豚の腎髄質には複数の腎錐体が存在する。\nc 腎皮質の間質細胞はエリスロポエチンを合成する。\nd 遠位直尿細管はネフロンループ下行部を形成する。\ne 成体の腎臓は胎子の中腎に由来する。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 2,
    explanation:
      "豚の腎臓は多錐体腎（多乳頭腎）→ 髄質が複数の腎錐体に分かれるのが特徴。エリスロポエチンは腎皮質の間質細胞で産生 → 低酸素時に赤血球産生を促進する重要ホルモン。a：右腎の方が頭側（左が尾側）d：ネフロンループは近位尿細管由来 e：成体腎は後腎由来（中腎ではない）",
    point: "豚は多錐体腎、エリスロポエチンは腎皮質間質細胞",
    frequency: 4
  },
  {
    id: 3,
    category: "解剖",
    text: "哺乳類家畜の感覚器に関する記述として正しいのはどれか。\na 網膜の色素細胞は血液－網膜関門を形成する。\nb 輝板は強膜に位置する。\nc 胎子の眼胞は茎により中脳とつながる。\nd 蝸牛の鼓室階は内リンパで満たされる。\ne 半規管の有毛細胞は膨大部稜に存在する。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 1,
    explanation:
      "a：正 網膜色素上皮は血液－網膜関門の一部を形成し、物質の透過を制御する。b：誤 輝板（tapetum）は脈絡膜に存在し、強膜ではない。c：誤 眼胞は間脳（前脳）由来であり、中脳とは連絡しない。d：誤 鼓室階は外リンパで満たされる。内リンパで満たされるのは蝸牛管である。e：正 半規管の膨大部稜には有毛細胞が存在し、回転加速度を感知する。【まとめ】外リンパ：前庭階・鼓室階 内リンパ：蝸牛管",
    point: "外リンパは前庭階・鼓室階、内リンパは蝸牛管",
    frequency: 4
  },
  {
    id: 4,
    category: "解剖",
    text: "哺乳類家畜の末梢神経系に関する記述として正しいのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 0,
    explanation:
      "無髄神経では1つのシュワン細胞が複数軸索を包む。肋間神経は肋骨の後縁（尾側）に沿って走行する。橈骨神経は伸筋群支配。頸動脈小体は舌咽神経。翼口蓋神経節は副交感神経節。",
    point: "無髄神経はシュワン細胞が複数軸索を包む",
    frequency: 3
  },
  {
    id: 5,
    category: "解剖",
    text: "鶏の解剖学的特徴に関する記述として正しいのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 2,
    explanation: "嗉嚢は胸郭入口付近。胸腺は頸静脈に沿う。腹気嚢は対。メッケル憩室は回腸。",
    point: "鶏の腹気嚢は対、メッケル憩室は回腸",
    frequency: 3
  },
  {
    id: 6,
    category: "解剖",
    text: "哺乳類家畜の胸部器官に関する記述として正しいのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 4,
    explanation: "内胸動脈は鎖骨下動脈分枝。大動脈は横隔膜脚の間を通る。",
    point: "内胸動脈は鎖骨下動脈から分枝",
    frequency: 3
  },
  {
    id: 7,
    category: "解剖",
    text: "犬の後肢に関する記述として正しいのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 1,
    explanation: "大腿直筋は寛骨由来。半月は線維軟骨。伏在神経は大腿内側皮膚感覚。",
    point: "半月は線維軟骨、伏在神経は大腿内側感覚",
    frequency: 3
  },
  {
    id: 8,
    category: "解剖",
    text: "哺乳類家畜の内分泌器官に関する記述として正しいのはどれか。",
    choices: [
      "副腎髄質は内胚葉由来",
      "犬には内上皮小体がない",
      "腺性下垂体の酸好性細胞にはGH産生細胞が含まれる",
      "後葉細胞は神経細胞",
      "副腎皮質網状帯は鉱質コルチコイド産生"
    ],
    correctAnswer: 2,
    explanation:
      "副腎髄質は神経堤由来。犬にも上皮小体はある。GH産生細胞は酸好性。後葉細胞は膠細胞様。網状帯は性ホルモン。",
    point: "GH産生細胞は酸好性細胞",
    frequency: 4
  },
  {
    id: 9,
    category: "解剖",
    text: "哺乳類家畜の呼吸器系に関する記述として正しいのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 4,
    explanation: "Ⅱ型肺胞上皮に層板小体。肺副葉は縦隔内。",
    point: "Ⅱ型肺胞上皮に層板小体あり",
    frequency: 3
  },
  {
    id: 10,
    category: "解剖",
    text: "哺乳類家畜の生殖器系に関する記述として正しいのはどれか。",
    choices: [
      "豚の精囊腺は精囊と呼ばれる",
      "海綿体洞は静脈洞",
      "犬は大前庭腺発達",
      "透明帯は一次卵胞で出現",
      "精管は線毛上皮"
    ],
    correctAnswer: 1,
    explanation: "海綿体洞は静脈洞。犬の前庭腺未発達。透明帯は一次卵母細胞期。精管は線毛なし。",
    point: "海綿体洞は静脈洞",
    frequency: 3
  },
  {
    id: 11,
    category: "解剖",
    text: "哺乳類家畜において前肢を前方へ引く筋はどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 2,
    explanation: "僧帽筋・菱形筋が前方牽引。",
    point: "僧帽筋・菱形筋が前肢を前方へ牽引",
    frequency: 3
  },
  {
    id: 12,
    category: "生理",
    text: "NOに関する記述として正しいのはどれか。",
    choices: ["膜受容体を介する", "メチオニン由来", "アデニル酸シクラーゼ活性化", "血管平滑筋弛緩", "小胞貯蔵"],
    correctAnswer: 3,
    explanation: "NOはcGMP系で血管平滑筋を弛緩。",
    point: "NOはcGMP経路で血管平滑筋弛緩",
    frequency: 4
  },
  {
    id: 13,
    category: "生理",
    text: "視床下部に存在するのはどれか。",
    choices: ["嘔吐中枢", "心臓抑制中枢", "血管運動中枢", "体温調節中枢", "嚥下中枢"],
    correctAnswer: 3,
    explanation: "視床下部は体温など恒常性調節。",
    point: "視床下部は体温調節中枢",
    frequency: 4
  },
  {
    id: 14,
    category: "生理",
    text: "ビタミンD3水酸化に関与するのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 1,
    explanation: "肝で25位、腎で1α水酸化。",
    point: "肝臓で25位、腎臓で1α位水酸化",
    frequency: 4
  },
  {
    id: 15,
    category: "生理",
    text: "内分泌器官でないのはどれか。",
    choices: ["胃", "腎臓", "心臓", "膵臓", "脾臓"],
    correctAnswer: 4,
    explanation: "脾臓は内分泌ではない。",
    point: "脾臓は内分泌器官ではない",
    frequency: 3
  },
  {
    id: 16,
    category: "生理",
    text: "自律神経の二重支配を受けるのはどれか。",
    choices: ["汗腺", "副腎髄質", "立毛筋", "瞳孔括約筋", "唾液腺"],
    correctAnswer: 4,
    explanation: "唾液腺は交感・副交感支配。",
    point: "唾液腺は二重支配",
    frequency: 4
  },
  {
    id: 17,
    category: "生理",
    text: "イオンチャネル共役型の味覚受容体が感知する基本味はどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 2,
    explanation: "酸味はH⁺チャネル、塩味はNa⁺チャネル。",
    point: "酸味・塩味はイオンチャネル共役型",
    frequency: 3
  },
  {
    id: 18,
    category: "解剖",
    text: "皮膚感覚の受容器でないのはどれか。",
    choices: ["マイスネル小体", "パチニ小体", "メルケル細胞", "メサンギウム細胞", "ルフィニ小体"],
    correctAnswer: 3,
    explanation: "メサンギウム細胞は腎糸球体細胞。",
    point: "メサンギウム細胞は腎糸球体の細胞",
    frequency: 3
  },
  {
    id: 19,
    category: "生理",
    text: "交尾排卵動物はどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 3,
    explanation: "猫・フェレットが交尾排卵。",
    point: "猫・フェレットは交尾排卵動物",
    frequency: 4
  },
  {
    id: 20,
    category: "生理",
    text: "呼吸に関する記述として誤っているのはどれか。",
    choices: [
      "呼吸に重要な胸郭は肋間筋や横隔膜などで囲まれている。",
      "横隔膜が収縮すると、肺が収縮して呼気が発生する。",
      "呼吸調節中枢は脳幹の橋に存在する。",
      "血中の酸素分圧や二酸化炭素分圧の変化は化学受容器で感知される。",
      "へーリング－ブロイエル反射では肺拡張後に吸息が抑制される。"
    ],
    correctAnswer: 1,
    explanation: "横隔膜収縮時は吸気が起こる。",
    point: "横隔膜収縮で吸気",
    frequency: 4
  },
  {
    id: 21,
    category: "生理",
    text: "神経筋接合部において終板電位を発生させるのはどれか。",
    choices: [
      "電位依存性Na+チャネル",
      "電位依存性Ca2+チャネル",
      "リアノジン感受性Ca2+チャネル",
      "ニコチン受容体",
      "グルタミン酸受容体"
    ],
    correctAnswer: 3,
    explanation: "ニコチン受容体開口で終板電位。",
    point: "ニコチン受容体が終板電位を発生",
    frequency: 4
  },
  {
    id: 22,
    category: "生化学",
    text: "肝臓で合成されたTGを末梢へ運ぶのはどれか。",
    choices: ["キロミクロン", "アダプタータンパク質", "VLDL", "LDL", "HDL"],
    correctAnswer: 2,
    explanation: "VLDLが肝TGを輸送。",
    point: "VLDLが肝臓のTGを輸送",
    frequency: 4
  },
  {
    id: 23,
    category: "生化学",
    text: "糖新生の基質にならないのはどれか。",
    choices: ["酢酸", "乳酸", "ピルビン酸", "グリセロール", "プロピオン酸"],
    correctAnswer: 0,
    explanation: "酢酸はアセチルCoAとなり糖新生不可。",
    point: "酢酸は糖新生の基質にならない",
    frequency: 4
  },
  {
    id: 24,
    category: "生化学",
    text: "負のアロステリック効果として正しいのはどれか。",
    choices: ["基質に直接結合", "遺伝子合成阻害", "分解促進", "別部位に結合し活性抑制", "補酵素作用"],
    correctAnswer: 3,
    explanation: "アロステリック阻害は活性部位以外への結合。",
    point: "負のアロステリック効果は活性部位以外への結合",
    frequency: 4
  },
  {
    id: 25,
    category: "薬理",
    text: "シロドシンの排尿改善機序はどれか。",
    choices: ["PDE阻害", "α1遮断", "M3遮断", "コリンエステラーゼ阻害", "β3遮断"],
    correctAnswer: 1,
    explanation: "α1遮断で尿道平滑筋弛緩。",
    point: "シロドシンはα1遮断薬",
    frequency: 4
  },
  {
    id: 26,
    category: "薬理",
    text: "中枢興奮薬と機序の正しい組合せはどれか。",
    choices: [
      "カフェイン―グリシン阻害",
      "テオブロミン―NA放出",
      "テオフィリン―PDE阻害",
      "メタンフェタミン―GABA阻害",
      "ストリキニーネ―DA阻害"
    ],
    correctAnswer: 2,
    explanation: "テオフィリンはPDE阻害。",
    point: "テオフィリンはPDE阻害薬",
    frequency: 4
  },
  {
    id: 27,
    category: "薬理",
    text: "糖尿病薬で正しいのはどれか。",
    choices: [
      "トルブタミドSGLT阻害",
      "メトホルミンKチャネル阻害",
      "アカルボースαグルコシダーゼ阻害",
      "ピオグリタゾンAMPK↑",
      "グリピジドPPAR刺激"
    ],
    correctAnswer: 2,
    explanation: "アカルボースはαグルコシダーゼ阻害。",
    point: "アカルボースはαグルコシダーゼ阻害薬",
    frequency: 4
  },
  {
    id: 28,
    category: "薬理",
    text: "非麻薬性鎮痛薬はどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 2,
    explanation: "ブトルファノール・ペンタゾシン。",
    point: "ブトルファノール・ペンタゾシンは非麻薬性",
    frequency: 4
  },
  {
    id: 29,
    category: "薬理",
    text: "抗菌薬とその作用機序の組合せとして正しいのはどれか。",
    choices: [
      "エリスロマイシン ― DNAジャイレース阻害",
      "ストレプトマイシン ― エルゴステロール合成阻害",
      "セファレキシン ― tRNA転移阻害",
      "クロラムフェニコール ― ペプチジルトランスフェラーゼ阻害",
      "エンロフロキサシン ― ペプチドグリカン合成阻害"
    ],
    correctAnswer: 3,
    explanation:
      "クロラムフェニコールはタンパク合成阻害（ペプチジルトランスフェラーゼ阻害）。",
    point: "クロラムフェニコールはペプチジルトランスフェラーゼ阻害",
    frequency: 4
  },
  {
    id: 30,
    category: "薬理",
    text: "抗てんかん薬はどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 3,
    explanation: "フェノバルビタールと臭化カリウムが代表的抗てんかん薬。",
    point: "フェノバルビタール・臭化カリウムが抗てんかん薬",
    frequency: 4
  },
  {
    id: 31,
    category: "薬理",
    text: "プロトンポンプを阻害する抗潰瘍薬はどれか。",
    choices: ["オメプラゾール", "ラニチジン", "ガストリン", "ケイ酸マグネシウム", "ミソプロストール"],
    correctAnswer: 0,
    explanation: "PPIはオメプラゾール。",
    point: "オメプラゾールはプロトンポンプ阻害薬",
    frequency: 4
  },
  {
    id: 32,
    category: "薬理",
    text: "イベルメクチンによる犬の神経毒性の原因はどれか。",
    choices: [
      "アストロサイト分化抑制",
      "神経髄鞘脱落",
      "Naチャネル持続開口",
      "ACh放出阻害",
      "P糖タンパク遺伝子変異"
    ],
    correctAnswer: 4,
    explanation: "MDR1変異によりBBB通過し神経毒性。",
    point: "MDR1遺伝子変異でBBB透過",
    frequency: 5
  },
  {
    id: 33,
    category: "中毒",
    text: "中毒とその原因物質の組合せとして正しいのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 3,
    explanation: "トリカブト＝アコニチン、スイートクローバー＝ジクマロール。",
    point: "トリカブトはアコニチン、スイートクローバーはジクマロール",
    frequency: 4
  },
  {
    id: 34,
    category: "中毒",
    text: "バイケイソウに含まれ単眼症を起こす物質はどれか。",
    choices: ["DES", "ヒヨスチアミン", "サイカシン", "ストロファンタス", "ベラトラムアルカロイド"],
    correctAnswer: 4,
    explanation: "胎子奇形原因はベラトラムアルカロイド。",
    point: "バイケイソウのベラトラムアルカロイドが単眼症原因",
    frequency: 3
  },
  {
    id: 35,
    category: "薬理",
    text: "ソリブジンにより毒性が増強する抗腫瘍薬はどれか。",
    choices: ["5-フルオロウラシル", "シクロホスファミド", "メトトレキサート", "イマチニブ", "メルファラン"],
    correctAnswer: 0,
    explanation: "5-FU分解阻害により致死的毒性増強。",
    point: "ソリブジンと5-FUの併用禁忌",
    frequency: 4
  },
  {
    id: 36,
    category: "病理",
    text: "皮膚粘液水腫の原因はどれか。",
    choices: ["うっ血性心不全", "慢性肝不全", "急性糸球体腎炎", "甲状腺機能低下症", "低栄養"],
    correctAnswer: 3,
    explanation: "ムコ多糖沈着は甲状腺低下症。",
    point: "甲状腺機能低下症でムコ多糖沈着",
    frequency: 4
  },
  {
    id: 37,
    category: "病理",
    text: "アミロイド沈着を認める猫疾患はどれか。",
    choices: ["２型糖尿病", "肥大型心筋症", "腸リンパ腫", "黄色腫", "肝リピドーシス"],
    correctAnswer: 0,
    explanation: "膵島アミロイド沈着が特徴。",
    point: "猫2型糖尿病は膵島アミロイド沈着",
    frequency: 4
  },
  {
    id: 38,
    category: "遺伝",
    text: "糖原蓄積病はどれか。",
    choices: ["ゴーシェ病", "糖尿病", "ポンペ病", "クラッベ病", "痛風"],
    correctAnswer: 2,
    explanation: "ポンペ病はリソソーム糖原蓄積。",
    point: "ポンペ病は糖原蓄積病",
    frequency: 3
  },
  {
    id: 39,
    category: "免疫",
    text: "犬B細胞表面分子はどれか。",
    choices: ["CD3", "CD8", "CD20", "c-kit", "CD204"],
    correctAnswer: 2,
    explanation: "CD20はB細胞マーカー。",
    point: "CD20はB細胞マーカー",
    frequency: 4
  },
  {
    id: 40,
    category: "病理",
    text: "死後変化はどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 3,
    explanation: "胆汁浸染と仮性メラノーシスは死後変化。",
    point: "胆汁浸染・仮性メラノーシスは死後変化",
    frequency: 3
  },
  {
    id: 41,
    category: "腫瘍",
    text: "脂腺由来の犬腫瘍はどれか。",
    choices: ["肛門嚢腺癌", "扁平上皮癌", "肝様腺腫", "耳垢腺腫", "毛芽腫"],
    correctAnswer: 2,
    explanation: "肛門周囲腺は脂腺由来。",
    point: "肝様腺腫は脂腺由来",
    frequency: 4
  },
  {
    id: 42,
    category: "生化学",
    text: "フリーラジカルはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 3,
    explanation: "スーパーオキシドとヒドロキシラジカル。",
    point: "スーパーオキシド・ヒドロキシラジカルがフリーラジカル",
    frequency: 3
  },
  {
    id: 43,
    category: "免疫",
    text: "Ⅲ型アレルギーはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 1,
    explanation: "アルサス反応と膜性腎症。",
    point: "アルサス反応・膜性腎症はⅢ型アレルギー",
    frequency: 4
  },
  {
    id: 44,
    category: "腫瘍",
    text: "フェレットに好発する腫瘍はどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 1,
    explanation: "副腎皮質腫瘍とインスリノーマが好発。",
    point: "フェレットは副腎腫瘍・インスリノーマ好発",
    frequency: 4
  },
  {
    id: 45,
    category: "ウイルス",
    text: "逆転写酵素をもつウイルスはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 0,
    explanation: "B型肝炎ウイルスと馬伝染性貧血ウイルス。",
    point: "B型肝炎ウイルス・馬伝染性貧血ウイルスに逆転写酵素",
    frequency: 4
  },
  {
    id: 46,
    category: "ウイルス",
    text: "オルトヘルペスウイルス科による感染症はどれか。",
    choices: ["鶏白血病", "鶏脳脊髄炎", "鶏封入体肝炎", "ニューカッスル病", "マレック病"],
    correctAnswer: 4,
    explanation: "マレック病は鶏ヘルペスウイルス。",
    point: "マレック病はヘルペスウイルス",
    frequency: 5
  },
  {
    id: 47,
    category: "ウイルス",
    text: "サルコイドの起因ウイルスはどれか。",
    choices: [
      "牛パピローマウイルス",
      "馬パピローマウイルス",
      "犬パピローマウイルス",
      "猫パピローマウイルス",
      "ショープ乳頭腫ウイルス"
    ],
    correctAnswer: 0,
    explanation: "馬サルコイドは牛パピローマウイルス。",
    point: "馬サルコイドは牛パピローマウイルス",
    frequency: 4
  },
  {
    id: 48,
    category: "ウイルス",
    text: "遺伝子再集合を起こすウイルスはどれか。",
    choices: [
      "猫汎白血球減少症ウイルス",
      "犬ジステンパーウイルス",
      "リフトバレー熱ウイルス",
      "豚伝染性胃腸炎ウイルス",
      "あひるB型肝炎ウイルス"
    ],
    correctAnswer: 2,
    explanation: "分節RNAウイルスは再集合。",
    point: "分節RNAウイルスは遺伝子再集合",
    frequency: 4
  },
  {
    id: 49,
    category: "ウイルス",
    text: "ウイルス増殖で正しいのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 1,
    explanation: "生細胞必須・暗黒期あり。",
    point: "ウイルスは生細胞必須、暗黒期あり",
    frequency: 3
  },
  {
    id: 50,
    category: "免疫",
    text: "mRNAワクチンの作用機序はどれか。",
    choices: ["IFN誘導", "ゲノム複製阻害", "液性免疫誘導", "アポトーシス誘導", "転写阻害"],
    correctAnswer: 2,
    explanation: "抗原タンパク産生→抗体誘導。",
    point: "mRNAワクチンは液性免疫誘導",
    frequency: 4
  },
  {
    id: 51,
    category: "細菌",
    text: "エンドトキシンとして作用する細胞壁成分はどれか。",
    choices: ["リピドA", "タイコ酸", "ポーリン", "コア多糖", "糖鎖"],
    correctAnswer: 0,
    explanation: "LPS毒性部分はリピドA。",
    point: "エンドトキシンの本体はリピドA",
    frequency: 5
  },
  {
    id: 52,
    category: "真菌",
    text: "酵母形態をとらないのはどれか。",
    choices: [
      "Microsporum canis",
      "Candida albicans",
      "Cryptococcus neoformans",
      "Malassezia pachydermatis",
      "Coccidioides immitis"
    ],
    correctAnswer: 0,
    explanation: "Microsporumは糸状菌、Coccidioidesは球状体。",
    point: "Microsporumは糸状菌",
    frequency: 4
  },
  {
    id: 53,
    category: "細菌",
    text: "炭疽菌で正しいのはどれか。",
    choices: ["莢膜が病原因子", "テタノスパスミン毒素", "セレウリド毒素", "エンテロトキシン毒素", "致死因子＋浮腫因子のみ"],
    correctAnswer: 0,
    explanation: "莢膜（ポリDグルタミン酸）が重要。",
    point: "炭疽菌の莢膜はポリDグルタミン酸",
    frequency: 4
  },
  {
    id: 54,
    category: "細菌",
    text: "サルモネラ血清型決定抗原はどれか。",
    choices: [
      "菌体抗原とべん毛抗原",
      "菌体抗原と線毛抗原",
      "菌体抗原と莢膜抗原",
      "莢膜抗原と線毛抗原",
      "莢膜抗原とべん毛抗原"
    ],
    correctAnswer: 0,
    explanation: "O抗原＋H抗原。",
    point: "サルモネラはO抗原とH抗原で血清型決定",
    frequency: 4
  },
  {
    id: 55,
    category: "寄生虫",
    text: "血管内吸血型節足動物はどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 4,
    explanation: "シラミとノミ。",
    point: "シラミ・ノミは血管内吸血型",
    frequency: 3
  },
  {
    id: 56,
    category: "寄生虫",
    text: "ミラシジウム形成卵を排泄するのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 0,
    explanation: "肝吸虫・膵蛭。",
    point: "肝吸虫・膵蛭はミラシジウム形成卵",
    frequency: 3
  },
  {
    id: 57,
    category: "寄生虫",
    text: "雄成虫尾部に交接嚢があるのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 4,
    explanation: "強口虫類に存在。",
    point: "強口虫類は交接嚢あり",
    frequency: 3
  },
  {
    id: 58,
    category: "寄生虫",
    text: "2倍体と3倍体が知られる寄生虫はどれか。",
    choices: ["肝吸虫", "ウェステルマン肺吸虫", "横川吸虫", "槍形吸虫", "日本住血吸虫"],
    correctAnswer: 1,
    explanation: "ウェステルマン肺吸虫。",
    point: "ウェステルマン肺吸虫は2倍体・3倍体",
    frequency: 3
  },
  {
    id: 59,
    category: "寄生虫",
    text: "経乳感染するのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 3,
    explanation: "犬回虫・猫回虫。",
    point: "犬回虫・猫回虫は経乳感染",
    frequency: 4
  },
  {
    id: 60,
    category: "寄生虫",
    text: "イエバエ類が媒介するのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 3,
    explanation: "Stephanofilaria と Draschia はハエ媒介。",
    point: "StephanofilariaとDraschiaはハエ媒介",
    frequency: 3
  },
  {
    id: 61,
    category: "寄生虫",
    text: "雌成虫が幼虫を産出するのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 4,
    explanation: "旋毛虫と犬糸状虫は幼虫産出。",
    point: "旋毛虫・犬糸状虫は幼虫産出",
    frequency: 4
  },
  {
    id: 62,
    category: "公衆衛生",
    text: "獣医師免許が法令上必要なのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 3,
    explanation: "と畜検査員と狂犬病予防員。",
    point: "と畜検査員・狂犬病予防員は獣医師免許必要",
    frequency: 4
  },
  {
    id: 63,
    category: "公衆衛生",
    text: "ジビエに関する記述で適切なのはどれか。",
    choices: ["環境省が指針作成", "と畜場法適用", "HACCP衛生管理義務", "獣医師解体前検査義務", "生食提供あり"],
    correctAnswer: 2,
    explanation: "HACCPに基づく衛生管理が求められる。",
    point: "ジビエはHACCP衛生管理義務",
    frequency: 4
  },
  {
    id: 64,
    category: "公衆衛生",
    text: "JVARMの対象でないのはどれか。",
    choices: [
      "野生動物由来耐性菌",
      "家畜由来耐性菌",
      "水産動物由来耐性菌",
      "愛玩動物由来耐性菌",
      "抗菌薬使用量"
    ],
    correctAnswer: 0,
    explanation: "野生動物は対象外。",
    point: "JVARMは野生動物対象外",
    frequency: 3
  },
  {
    id: 65,
    category: "公衆衛生",
    text: "家畜保健衛生所の業務でないのはどれか。",
    choices: ["伝染病予防検査", "人工授精事務", "衛生管理指導", "と畜検査", "BSE検査"],
    correctAnswer: 3,
    explanation: "と畜検査は家保業務でない。",
    point: "と畜検査は家保の業務ではない",
    frequency: 4
  },
  {
    id: 66,
    category: "法規",
    text: "人工授精簿の保存年数はどれか。",
    choices: ["1年", "3年", "5年", "8年", "10年"],
    correctAnswer: 2,
    explanation: "5年間保存義務。",
    point: "人工授精簿は5年保存",
    frequency: 3
  },
  {
    id: 67,
    category: "臨床",
    text: "肝合成能評価に最も適当なのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 2,
    explanation: "AlbとT-Chol。",
    point: "アルブミンと総コレステロールで肝合成能評価",
    frequency: 4
  },
  {
    id: 68,
    category: "臨床",
    text: "ショック所見として最も適当なのはどれか。",
    choices: ["四肢冷感", "心拍数低下", "呼吸数減少", "尿量増加", "高血圧"],
    correctAnswer: 0,
    explanation: "末梢循環低下で四肢冷感。",
    point: "ショックでは四肢冷感",
    frequency: 4
  },
  {
    id: 69,
    category: "臨床",
    text: "犬小腸疾患徴候として最も適当なのはどれか。",
    choices: ["しぶり", "メレナ", "排便困難", "血便", "便失禁"],
    correctAnswer: 1,
    explanation: "小腸出血は黒色便。",
    point: "小腸疾患ではメレナ（黒色便）",
    frequency: 4
  },
  {
    id: 70,
    category: "代謝",
    text: "牛ケトーシスで増加するのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 2,
    explanation: "アセトンとアセト酢酸。",
    point: "ケトーシスでアセトン・アセト酢酸増加",
    frequency: 4
  },
  {
    id: 71,
    category: "画像",
    text: "脊髄造影の造影剤注入部位はどれか。",
    choices: ["硬膜外", "硬膜とくも膜間", "くも膜下腔", "軟膜と脊髄間", "脊髄内"],
    correctAnswer: 2,
    explanation: "CSFスペースに注入。",
    point: "脊髄造影はくも膜下腔に注入",
    frequency: 4
  },
  {
    id: 72,
    category: "画像",
    text: "散乱線で誤りはどれか。",
    choices: ["鮮鋭度低下", "低kVほど増加", "不規則方向", "皮膚吸収", "グリッドで低減"],
    correctAnswer: 1,
    explanation: "高kVで増加。",
    point: "散乱線は高kVで増加",
    frequency: 3
  },
  {
    id: 73,
    category: "麻酔",
    text: "鎮痛作用がないのはどれか。",
    choices: ["ブプレノルフィン", "アセトアミノフェン", "プロポフォール", "リドカイン", "メデトミジン"],
    correctAnswer: 2,
    explanation: "プロポフォールは催眠のみ。",
    point: "プロポフォールは鎮痛作用なし",
    frequency: 4
  },
  {
    id: 74,
    category: "整形",
    text: "皮質骨連続性が一部保たれる骨折はどれか。",
    choices: ["粉砕骨折", "蝶形骨折", "長斜骨折", "若木骨折", "らせん骨折"],
    correctAnswer: 3,
    explanation: "若木骨折は不完全骨折。",
    point: "若木骨折は不完全骨折",
    frequency: 4
  },
  {
    id: 75,
    category: "外科",
    text: "腸端々吻合に最適なのはどれか。",
    choices: ["ブンネル", "クッシング", "ギャンビー", "コンネル", "パーカー・カー"],
    correctAnswer: 2,
    explanation: "ギャンビー縫合。",
    point: "腸吻合はギャンビー縫合",
    frequency: 4
  },
  {
    id: 76,
    category: "麻酔",
    text: "馬麻酔で適切なのはどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 0,
    explanation: "PaCO2は換気評価、顔面動脈で血圧測定可能。",
    point: "PaCO2で換気評価、顔面動脈で血圧測定",
    frequency: 3
  },
  {
    id: 77,
    category: "繁殖",
    text: "豚妊娠認識物質はどれか。",
    choices: ["プロジェステロン", "インヒビン", "IFN-τ", "エストロジェン", "オキシトシン"],
    correctAnswer: 3,
    explanation: "胚由来エストロゲン。",
    point: "豚の妊娠認識物質はエストロゲン",
    frequency: 4
  },
  {
    id: 78,
    category: "繁殖",
    text: "牛40日以内妊娠診断法はどれか。",
    choices: ["a, b", "a, e", "b, c", "c, d", "d, e"],
    correctAnswer: 3,
    explanation: "超音波とノンリターン法。",
    point: "40日以内は超音波・ノンリターン法",
    frequency: 4
  },
  {
    id: 79,
    category: "繁殖",
    text: "eCGの産生部位はどれか。",
    choices: ["視床下部", "下垂体前葉", "下垂体後葉", "子宮内膜杯", "黄体"],
    correctAnswer: 3,
    explanation: "胎盤由来（子宮内膜杯）。",
    point: "eCGは子宮内膜杯で産生",
    frequency: 4
  }
];

export const officialQuestions: Question[] = rawOfficialQuestions.map((raw) => {
  const category = categoryMap[raw.category];
  const sameCategory = rawOfficialQuestions
    .filter((candidate) => candidate.category === raw.category && candidate.id !== raw.id)
    .slice(0, 3);

  return {
    slug: `${category.slug}-${raw.id}`,
    sourceId: raw.id,
    category: raw.category,
    examYear: 76,
    section: "A",
    isImageQuestion: false,
    isRequired: false,
    exam: `第76回 A問題 問${raw.id}`,
    subjectSlug: category.slug,
    subject: category.subject,
    title: titleFromText(raw.text),
    body: raw.text,
    choices: raw.choices.map((text, index) => ({
      id: choiceIds[index] ?? String(index + 1),
      text
    })),
    correctChoiceIds: [choiceIds[raw.correctAnswer] ?? "a"],
    difficulty: raw.frequency >= 4 ? "標準" : "易",
    importance: importanceFromFrequency(raw.frequency),
    explanation: raw.explanation,
    point: raw.point,
    frequency: raw.frequency,
    keyPoints: [raw.point],
    related: sameCategory.map((question) => {
      const relatedCategory = categoryMap[question.category];
      return {
        slug: `${relatedCategory.slug}-${question.id}`,
        title: titleFromText(question.text)
      };
    }),
    publishedAt: "2026-05-21"
  };
});
