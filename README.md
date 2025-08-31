# 成長記録アプリ（Nuxt Growth Tracker）

2 ヶ月の成長を“毎日記録し、直近 2 ヶ月をグラフ化して可視化するシンプルな Nuxt3 アプリ
入力 → 保存 → 即グラフ更新までを **localStorage** のみで完結。将来は Supabase 連携や GitHub API 連携へ拡張可能な構成になっている

---

## 特長

- **入力と可視化が 1 ページ完結**（`/pages/index.vue`）
- **0–10 点スライダー**で 4 項目（時間厳守 / 段取り / 掃除 / 自己研鑽）を評価
- **平均スコア**と**各項目**の折れ線グラフを**トグルスイッチ**で切替
- **直近 2 ヶ月だけをグラフ表示**（保存は全期間）
- **同日上書き**・**前日コピー**の初期値
- UI は軽量な**素の CSS**

---

## スタック

- **Nuxt 3**
- **Chart.js v4** + **vue-chartjs**
- **TypeScript**
- 保存：**localStorage**

---

## スクリーンショット（イメージ）

<img width="1084" height="868" alt="Image" src="https://github.com/user-attachments/assets/99b161b8-b449-4309-adec-803357c16347" />

> 起動後に `http://localhost:3000` を開いて確認

- 入力フォーム：日付 / 目標 / 4 つのスライダー / GitHub チェック
- グラフ：平均スコア ↔ 各項目（トグル切替）
- 履歴テーブル：日付 / 目標 / 平均 / GitHub

---

## セットアップ

### 1 プロジェクト作成（初回のみ）

```bash
npx nuxi init nuxt-growth-tracker
cd nuxt-growth-tracker

```

### 2 依存関係インストール

```
 # npm
 npm install

 # or pnpm install
```

### 3 起動

```
 npm run dev
 # or pnpm dev
```

http://localhost:3000 を開くと画面が表示される

### 使い方

- 日付・今日の目標・4 項目に対する評価（0–10）・GitHub への push をしたかどうかのチェックを入力

- 保存をクリック → localStorage に保存 / グラフ自動更新

- トグルで 平均スコア と 各項目 の折れ線グラフを切替

- 翌日の日付にすると、スライダー初期値へ前日の値をコピーした値が入る（デフォルトは 5）

### DB

- `supabase` を使用
  <img width="1629" height="274" alt="Image" src="https://github.com/user-attachments/assets/e11d0224-adfe-4bee-a035-bf33a1f573bf" />
- supabase への接続情報を.env へ追加
  ```
  SUPABASE_URL=
  SUPABASE_API_KEY=
  ```

### 残課題

- CI の追加
  - format
  - lint
  - テスト
- 認証・認可機能の追加
  - 第 3 者がアプリを使用可能
