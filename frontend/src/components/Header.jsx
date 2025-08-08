import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/userStore.js'

export default function Header() {
  const user = useUserStore(s => s.user)
  const logout = useUserStore(s => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    // 本来はAPI呼び出し→成功時にlogout()
    logout()
    navigate('/')
  }

  const toggleTheme = () => {
    const html = document.documentElement
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', next)
  }

  return (
    <header className="sticky top-0 z-10 bg-base-100/80 backdrop-blur border-b border-base-300">
      <div className="max-w-5xl mx-auto px-4 py-2 grid grid-cols-3 items-center">
        {/* 左：ロゴ */}
        <div className="flex items-center gap-2">
          <Link to="/" className="font-bold text-lg hover:opacity-80">Hangeul Study</Link>
          <button className="btn btn-ghost btn-sm" onClick={toggleTheme}>Theme</button>
        </div>

        {/* 中央：ウェルカム（ログイン時のみ） */}
        <div className="text-center">
          {user ? <span className="opacity-80">ようこそ、{user.username} さん</span> : null}
        </div>

        {/* 右：アバター & ボタン */}
        <div className="flex justify-end items-center gap-2">
          {user ? (
            <>
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8">
                  <span>{(user.username?.[0] || 'U').toUpperCase()}</span>
                </div>
              </div>
              <Link to="/app" className="btn btn-sm">HOME</Link>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/" className="btn btn-sm">HOME</Link>
              <Link to="/auth" className="btn btn-primary btn-sm">Login / Signup</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
