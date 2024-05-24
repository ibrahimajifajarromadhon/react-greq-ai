import "./App.css";
import { useState } from "react";
import { requestToGroqAi } from "./utils/groq";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { typeText } from "./utils/typeText";

function App() {
  const [content, setContent] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("EN");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ai = await requestToGroqAi(content);
    typeText(setData, ai, language, () => {
      setLoading(false);
    });
  };

  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto">
      <h1 className="text-4xl font-bold text-center mb-5 text-indigo-500">
        REACT | GROQ AI
      </h1>
      <div className="flex justify-between gap-4 py-4 w-full">
        <button
          className={`language-button ${language === "EN" ? "active bg-indigo-500 text-white" : ""} w-full rounded-md`}
          onClick={() => handleLanguageChange("EN")}
        >
          English
        </button>
        <button
          className={`language-button ${language === "ID" ? "active bg-indigo-500 text-white" : ""} w-full rounded-md`}
          onClick={() => handleLanguageChange("ID")}
        >
          Bahasa Indonesia
        </button>
      </div>
      <form className="flex flex-col gap-4 py-4 w-full">
        <input
          type="text"
          placeholder="Tuliskan permintaan kamu disini..."
          className="py-2 px-4 rounded-md text-md"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md font-bold justify-center items-center"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <div className="loading-spinner"></div> : "Kirim"}
        </button>
      </form>
      <div className="max-w-xl text-white">
        {data ? (
          <SyntaxHighlighter
            language="javascript"
            style={darcula}
            wrapLongLines={true}
          >
            {data}
          </SyntaxHighlighter>
        ) : null}
      </div>
    </main>
  );
}

export default App;
