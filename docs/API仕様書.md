# Hangeul Study API仕様書

* 作成日: 2025-07-29
* 詳細スキーマは openapi.yaml を参照

---

## 1. ベースURL

| 環境   | URL                                                    |
| ---- | ------------------------------------------------------ |
| ローカル | [http://localhost:5000/api](http://localhost:5000/api) |
| 本番   | https\://<your-app>.onrender.com/api                   |

---

## 2. 認証・セキュリティ

* CookieベースJWT認証（httpOnly, secure, sameSite=lax）
* 開発時は Bearer 併用可
* CSRF対策（double-submitトークン付与必須）
* レートリミット（IP＋メールの複合キー）

---

## 3. エンドポイント一覧

### Auth

| メソッド  | パス             | 概要         |
| ----- | -------------- | ---------- |
| POST  | /auth/register | ユーザー登録     |
| POST  | /auth/login    | ログイン       |
| POST  | /auth/logout   | ログアウト      |
| GET   | /auth/profile  | プロフィール取得   |
| PATCH | /auth/profile  | プロフィール編集   |
| GET   | /auth/csrf     | CSRFトークン取得 |

### Word（単語帳）

| メソッド   | パス          | 概要     |
| ------ | ----------- | ------ |
| GET    | /words      | 単語一覧取得 |
| POST   | /words      | 単語追加   |
| DELETE | /words/{id} | 単語削除   |

### Translate（翻訳）

| メソッド | パス         | 概要        |
| ---- | ---------- | --------- |
| POST | /translate | 日本語→韓国語変換 |

### Pronunciation（発音評価、拡張）

| メソッド | パス                   | 概要          |
| ---- | -------------------- | ----------- |
| POST | /pronunciation/score | 発音スコア算出（拡張） |

---

## 4. リクエスト・レスポンス例

### ユーザー登録

```json
POST /api/auth/register
{
  "username": "taro",
  "email": "taro@example.com",
  "password": "pass1234"
}
→
{
  "user": {
    "id": "xxx",
    "username": "taro",
    "email": "taro@example.com",
    "profileImage": null
  },
  "token": "jwt-token"
}
```

### 翻訳

```json
POST /api/translate
{
  "text": "こんにちは"
}
→
{
  "japanese": "こんにちは",
  "korean": "안녕하세요",
  "reading": "アンニョンハセヨ",
  "audioUrl": "https://.../tts.mp3"
}
```

---

## 5. エラーレスポンス例

| ステータス | 例                                        |
| ----- | ---------------------------------------- |
| 400   | { "message": "Invalid payload" }         |
| 401   | { "message": "Unauthorized" }            |
| 419   | { "message": "CSRF token invalid" }      |
| 429   | { "message": "Too many login attempts" } |
| 500   | { "message": "Internal server error" }   |

---

## 6. 注意点・補足

* 認証付きAPIは credentials: true 必須
* バリデーション・詳細レスポンスは openapi.yaml を一次情報とする
* Swagger Editor / Stoplight での可視化推奨

---

*以上*
