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

  useEffect(() => {
    prism.highlightAll();
  })

  async function reviewCode(){
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
    console.log(response.data)
  }

  return (
    <>
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
        <Markdown>{review}</Markdown>
      </div>
    </main>
    </>
  )
}

export default App
