# Vet Exam Notes

獣医学生向けの国家試験対策Webアプリです。参考サイトの「過去問、解説記事、科目まとめ、問題演習」という情報設計を踏まえつつ、UI、コード、文言はオリジナルで実装しています。

## フォルダ構成

```txt
src/app/                  App Routerページ、SEO、OGP、sitemap
src/components/           画面コンポーネント
src/data/                 初期表示用ダミーデータ
src/lib/                  データ取得、Markdown、Supabaseクライアント
content/articles/         Markdown記事
supabase/schema.sql       認証、問題、記事、演習、課金拡張を見据えたDB設計
```

## 必要パッケージ

- Next.js latest
- React latest
- TypeScript
- Tailwind CSS latest
- `@tailwindcss/postcss`
- `@supabase/supabase-js`
- `@supabase/ssr`
- `gray-matter`
- `lucide-react`

## 実装済みページ

- `/` トップページ: 新着問題、科目一覧、人気記事、検索バー
- `/questions/anatomy-1` 問題詳細: 問題文、選択肢、正答、解説、重要度、関連問題
- `/questions` 問題一覧: 第76回A/B問題159問の検索、カテゴリ、問題区分フィルタ
- `/practice` 演習作成: 年度、分野、問題区分、必須、画像、苦手、間違い条件を組み合わせて抽出
- `/admin` 管理者ダッシュボード: 正答率ランキング、わからない数ランキング、分野別正答率
- `/subjects/bacteriology` 科目別まとめ: 目次、折りたたみセクション、重要ポイント、関連問題
- `/training/quiz/basic-67-2` 問題演習: 第76回A/B問題159問の1問表示、即時解説、ブックマーク、正答率、ローカル保存
- `/articles/how-to-review-bacteriology` Markdown記事

## DB設計

`supabase/schema.sql` に以下を定義しています。

- `users`: Supabase Authと連携するユーザー、Googleログイン、会員プラン、管理者ロール
- `subscriptions`: Stripeなどの課金状態
- `exams`: 国家試験の回次
- `subjects`: 科目
- `questions`: 問題、試験回、問題区分、必須問題フラグ、画像問題フラグ、正答、解説、重要度、有料フラグ
- `question_choices`: 選択肢
- `question_assets`: C/D画像問題用の画像、X線、病理、細胞診などのアセット
- `question_relations`: 関連問題
- `articles`: Markdown本文の記事
- `exam_sessions`, `exam_session_questions`: 年度横断・分野別・苦手問題などの演習セッション
- `userAnswers`: 回答履歴、正誤、わからない/難しいなどの復習評価
- `bookmarks`: ブックマーク
- `reviewSchedules`: Anki型復習の次回復習日、間隔、ease factor
- `question_answer_stats`, `subject_answer_stats`: 管理者分析用ビュー

RLSも含め、将来的な有料会員機能は `profiles.plan` と `is_premium` で拡張できます。

## Supabase設定

1. Supabaseでプロジェクトを作成
2. SQL Editorで `supabase/schema.sql` を実行
3. `.env.example` を `.env.local` にコピー
4. `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` を設定
5. 認証はEmail OTPを想定。トップ右上のログインボタンから確認メールを送れます。

## ローカル起動

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## Vercelデプロイ

1. GitHubへリポジトリをpush
2. VercelでNew Projectを作成
3. Framework PresetはNext.jsを選択
4. Environment Variablesに `.env.example` と同じキーを登録
5. Deployを実行

## ダミーデータ

初期データは `src/data` に配置しています。現在は第76回獣医師国家試験A/B問題159問を正式データとして収録しています。Supabase連携に切り替える場合は、`src/lib/data.ts` の取得関数をSupabaseクエリに差し替えるだけでページ構造を維持できます。
