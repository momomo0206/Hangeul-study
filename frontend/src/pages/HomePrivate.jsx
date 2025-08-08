import HomePublic from './HomePublic.jsx'

export default function HomePrivate() {
  // MVPでは公開HOMEと同じUIを流用（将来：お気に入り追加や履歴保存など拡張）
  return (
    <div className="space-y-2">
      <HomePublic />
      <p className="text-sm opacity-70">（ログイン中：単語保存や履歴は今後ここに追加します）</p>
    </div>
  )
}
