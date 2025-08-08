import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/userStore.js'
// import api from '@/libs/axios'

export default function Auth() {
  const [mode, setMode] = useState('login') // 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const setUser = useUserStore(s => s.setUser)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      // 本実装時：
      // if (mode==='signup') await api.post('/auth/register',{username,email,password})
      // const res = await api.post('/auth/login',{email,password})
      // setUser(res.data.user)

      // ダミー
      setUser({ id: 'u1', username: username || 'guest', email })
      navigate('/app')
    } catch {
      alert('認証に失敗しました')
    }
  }

  return (
    <section className="max-w-md mx-auto">
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{mode === 'login' ? 'ログイン' : 'サインアップ'}</h2>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            >
              {mode === 'login' ? '新規登録へ' : 'ログインへ'}
            </button>
          </div>

          <form className="space-y-3" onSubmit={submit}>
            {mode === 'signup' && (
              <input
                className="input input-bordered w-full"
                placeholder="ユーザー名"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
              />
            )}
            <input
              className="input input-bordered w-full"
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
            <input
              className="input input-bordered w-full"
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
            <button className="btn btn-primary w-full" type="submit">
              {mode === 'login' ? 'ログイン' : 'サインアップ'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
