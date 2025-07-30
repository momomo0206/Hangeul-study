# Hangeul Study データベース設計

* 作成日: 2025-07-29

---

## 1. User（ユーザー）

| フィールド        | 型        | 制約               | 説明              |
| ------------ | -------- | ---------------- | --------------- |
| \_id         | ObjectId | PK               | ユーザーID          |
| username     | String   | required, unique | ユーザー名           |
| email        | String   | required, unique | メールアドレス         |
| password     | String   | required         | パスワード(ハッシュ)     |
| profileImage | String   | optional         | Cloudinary画像URL |
| createdAt    | Date     | 自動               | 登録日             |
| updatedAt    | Date     | 自動               | 更新日             |

```js
const userSchema = new mongoose.Schema({
  username:    { type: String, required: true, unique: true, trim: true },
  email:       { type: String, required: true, unique: true, trim: true },
  password:    { type: String, required: true, minlength: 6 },
  profileImage:{ type: String, default: null }
}, { timestamps: true });
```

---

## 2. Word（単語帳）

| フィールド     | 型        | 制約          | 説明     |
| --------- | -------- | ----------- | ------ |
| \_id      | ObjectId | PK          | 単語ID   |
| user      | ObjectId | ref: 'User' | 所有ユーザー |
| japanese  | String   | required    | 日本語    |
| korean    | String   | required    | 韓国語    |
| reading   | String   | optional    | カタカナ読み |
| createdAt | Date     | 自動          | 追加日    |
| updatedAt | Date     | 自動          | 更新日    |

```js
const wordSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  japanese:  { type: String, required: true },
  korean:    { type: String, required: true },
  reading:   { type: String }
}, { timestamps: true });

wordSchema.index({ user: 1, japanese: 1, korean: 1 }, { unique: true });
wordSchema.index({ user: 1, createdAt: -1 });
```

---

## 3. Pronunciation（発音評価履歴、拡張）

| フィールド     | 型        | 制約          | 説明              |
| --------- | -------- | ----------- | --------------- |
| \_id      | ObjectId | PK          | 発音評価ID          |
| user      | ObjectId | ref: 'User' | 所有ユーザー          |
| word      | ObjectId | ref: 'Word' | 該当単語            |
| audioUrl  | String   | required    | Cloudinary音声URL |
| score     | Number   | optional    | AI評価スコア         |
| createdAt | Date     | 自動          | 作成日             |

```js
const pronunciationSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  word:      { type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true },
  audioUrl:  { type: String, required: true },
  score:     { type: Number }
}, { timestamps: true });
```

---

## 4. ER図イメージ

```
User 1 --- n Word
User 1 --- n Pronunciation
Word 1 --- n Pronunciation
```

* ユーザーは複数単語帳、複数発音評価を持つ

---

## 5. コレクション一覧

* users
* words
* pronunciations（拡張時）

---

## 6. 備考

* Cloudinary画像/音声URLは直接保存
* インデックス・スキーマは拡張可能（例：SRS, タグ, 難易度 等）
* createdAt, updatedAtは自動付与

---

*以上*
