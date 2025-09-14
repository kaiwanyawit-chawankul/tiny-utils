import { useState } from 'react'

export default function PasteForm() {
  const [content, setContent] = useState('')
  const [password, setPassword] = useState('')
  const [burnAfterRead, setBurnAfterRead] = useState(false)
  const [expiresAt, setExpiresAt] = useState('')
  const [link, setLink] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('/api/paste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, password, burnAfterRead, expiresAt }),
    })
    const data = await res.json()
    setLink(`${window.location.origin}/${data.id}`)
  }

  return (
    <div>
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <input type="password" placeholder="Password (optional)" value={password} onChange={e => setPassword(e.target.value)} />
      <label>
        <input type="checkbox" checked={burnAfterRead} onChange={() => setBurnAfterRead(!burnAfterRead)} />
        Burn After Read
      </label>
      <input type="datetime-local" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} />
      <button onClick={handleSubmit}>Create Paste</button>
      {link && <p>Link: <a href={link}>{link}</a></p>}
    </div>
  )
}
