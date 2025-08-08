import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '@/components/Header.jsx'
import HomePublic from '@/pages/HomePublic.jsx'
import HomePrivate from '@/pages/HomePrivate.jsx'
import Auth from '@/pages/Auth.jsx'
import { useUserStore } from '@/store/userStore.js'

function ProtectedRoute({ children }) {
  const user = useUserStore(s => s.user)
  if (!user) return <Navigate to="/auth" replace />
  return children
}

export default function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <Header />
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          {/* 公開HOME（ログイン不要） */}
          <Route path="/" element={<HomePublic />} />
          {/* 認証ページ（ログイン/サインアップ） */}
          <Route path="/auth" element={<Auth />} />
          {/* ログイン後HOME（保護ルート） */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <HomePrivate />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
