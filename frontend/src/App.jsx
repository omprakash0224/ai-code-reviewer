import { useEffect, useState } from 'react';
import './App.css'
import "prismjs/themes/prism-tomorrow.css";
import Markdown from 'react-markdown'
import Editor from "react-simple-code-editor"
import prism from "prismjs";
import axios from 'axios';

function App() {
  const [code, setCode] = useState(``)
  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll();
  })

  async function reviewCode(){
    setLoading(true)
    const apiUrl ='https://codesensei-6ysm.onrender.com';
    const response = await axios.post(`${apiUrl}/ai/get-review`, { code });
    setReview(response.data)
    setLoading(false)
    console.log(response.data)
  }

  return (
    <>
    <header className="navbar">
    <div className="navbar-logo">
    <img src="/logo2.png" alt="CodeSensei Logo" />
  </div>
      <div className="navbar-brand">CodeSensei</div>
      <div className="navbar-tagline">Your AI Mentor for Cleaner Code</div>
    </header>
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              height: '100%',
              width: '100%',
              border: '1px solid #000',
              borderRadius: '5px'
            }}
          />
        </div>
        <div
        onClick={reviewCode} 
        className="review">Review</div>
      </div>
      <div className="right">
      {loading ? <div className="loader"></div> : <Markdown>{review}</Markdown>}
      </div>
    </main>
    </>
  )
}

export default App
