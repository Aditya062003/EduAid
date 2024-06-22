import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../../index.css";
import logo from "../../assets/aossie_logo.png";

function Question() {
  const [qaPairs, setQaPairs] = useState([]);
  const [questionType, setQuestionType] = useState(
    localStorage.getItem("selectedQuestionType")
  );

  useEffect(() => {
    const qaPairsFromStorage =
      JSON.parse(localStorage.getItem("qaPairs")) || {};
    setQaPairs(Object.entries(qaPairsFromStorage));
  }, []);

  const generateGoogleForm = async () => {
    const response = await fetch("http://127.0.0.1:8000/generate-gform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Question-Type": questionType, // send the selected question type
      },
      body: JSON.stringify({ qa_pairs: Object.fromEntries(qaPairs) }),
    });

    if (response.ok) {
      const result = await response.json();
      const formUrl = result.form_link;
    } else {
      console.error("Failed to generate Google Form");
    }
  };

  return (
    <div className="popup w-full h-full bg-[#02000F] flex justify-center items-center">
      <div className="w-full h-full bg-cust bg-opacity-50 bg-custom-gradient">
        <div className="flex flex-col h-full">
          <div className="flex items-end gap-[2px]">
            <img src={logo} alt="logo" className="w-16 my-4 ml-4 block" />
            <div className="text-2xl mb-3 font-extrabold">
              <span className="bg-gradient-to-r from-[#FF005C] to-[#7600F2] text-transparent bg-clip-text">
                Edu
              </span>
              <span className="bg-gradient-to-r from-[#7600F2] to-[#00CBE7] text-transparent bg-clip-text">
                Aid
              </span>
            </div>
          </div>
          <div className="font-bold text-xl text-white mt-3 mx-2">
            Generated Questions
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {qaPairs &&
              qaPairs.map(([question, answer], index) => (
                <div
                  key={index}
                  className="px-2 bg-[#d9d9d90d] border-black border my-1 mx-2 rounded-xl py-2"
                >
                  <div className="text-[#E4E4E4] text-sm">
                    Question {index + 1}
                  </div>
                  <div className="text-[#FFF4F4] text-[1rem] my-1">
                    {question}
                  </div>
                  <div className="text-[#E4E4E4] text-sm">Answer</div>
                  <div className="text-[#FFF4F4] text-[1rem]">{answer}</div>
                </div>
              ))}
          </div>
          <div className="items-center flex justify-center gap-6 mx-auto">
            <button
              className="bg-[#161E1E] my-2 text-white px-2 py-2 rounded-xl"
              onClick={() => {
                window.close();
              }}
            >
              Close
            </button>
            <button
              className="bg-[#518E8E] items-center flex gap-1 my-2 font-semibold text-white px-2 py-2 rounded-xl"
              onClick={generateGoogleForm}
            >
              Generate Google form
              <svg
                width="12"
                height="12"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.6123 0.0500488H0.549805V18.275H18.7748V13.2125H16.7498V16.25H2.5748V2.07505H5.6123V0.0500488ZM18.7748 0.0500488H9.6623V2.07505H15.3188L7.59681 9.79705L9.0278 11.228L16.7498 3.50605V9.16255H18.7748V0.0500488Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Question />, document.getElementById("root"));
