import { useState } from 'react'
// import api from '@/libs/axios' // API接続時に使用

export default function HomePublic() {
  const [jp, setJp] = useState('')
  const [ko, setKo] = useState('')
  const [reading, setReading] = useState('')

  const handleTranslate = async () => {
    // TODO: API接続
    // const res = await api.post('/translate', { text: jp })
    // setKo(res.data.korean); setReading(res.data.reading)
    setKo('안녕하세요')
    setReading('アンニョンハセヨ')
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">翻訳（ログイン不要）</h2>
      <div className="grid gap-3">
        <textarea
          className="textarea textarea-bordered w-full min-h-28"
          placeholder="日本語を入力"
          value={jp}
          onChange={(e) => setJp(e.target.value)}
        />
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={handleTranslate}>翻訳</button>
          <button className="btn" onClick={() => { setJp(''); setKo(''); setReading('') }}>クリア</button>
        </div>
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body">
            <p className="text-sm opacity-70">韓国語</p>
            <p className="text-2xl font-bold break-words">{ko || '—'}</p>
            <p className="opacity-70 mt-2">読み（カタカナ）：{reading || '—'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
