# 成長記録アプリ（Nuxt Growth Tracker）

2 ヶ月の成長を“毎日記録し、直近 60 日をグラフ化して可視化するシンプルな Nuxt 3 アプリ。
入力 ⇢ 保存 ⇢ 即グラフ更新までを **localStorage** のみで完結。将来は Supabase 連携や GitHub API 連携へ拡張可能な構成になっている

---

## 特長

- **入力と可視化が 1 ページ完結**（`/pages/index.vue`）
- **0–10 点スライダー**で 4 項目（時間厳守 / 段取り / 掃除 / 自己研鑽）を評価
- **平均スコア**と**各項目**の折れ線グラフを**トグルスイッチ**で切替
- **直近 60 日だけをグラフ表示**（保存は全期間）
- **同日上書き**・**前日コピー**の初期値
- UI は軽量な**素の CSS**（Tailwind 不要）

---

## スタック

- **Nuxt 3**
- **Chart.js v4** + **vue-chartjs**
- **TypeScript**
- 保存：**localStorage**

---

## スクリーンショット（イメージ）

<img width="1084" height="868" alt="Image" src="https://github.com/user-attachments/assets/99b161b8-b449-4309-adec-803357c16347" />

> 起動後に `http://localhost:3000` を開いてご確認ください。

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

日付・今日の目標・4 項目に対する評価（0–10）・GitHub への push をしたかどうかのチェックを入力

保存をクリック → localStorage に保存 / グラフ自動更新

トグルで 平均スコア と 各項目 の折れ線グラフを切替

翌日の日付にすると、スライダー初期値へ前日の値をコピーした値が入る（前日の入力値がが無ければデフォルトで 5 の値が入る）
