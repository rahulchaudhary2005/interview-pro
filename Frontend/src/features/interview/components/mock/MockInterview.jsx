import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Mic,
  Send,
  BrainCircuit,
  Timer,
} from "lucide-react";

import "../../style/mockInterview.scss";

const MockInterview = () => {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [timer, setTimer] = useState(0);

  const recognitionRef = useRef(null);
  const listeningRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      null;

    if (!SpeechRecognition) {
      setVoiceSupported(false);
      console.warn("Speech Recognition is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let text = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript((prev) => {
        if (!prev) return text;
        return text || prev;
      });
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error !== "no-speech") {
        setListening(false);
        listeningRef.current = false;
      }
    };

    recognition.onend = () => {
      if (listeningRef.current) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) {
      setVoiceSupported(false);
      return;
    }

    listeningRef.current = true;
    setListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;

    listeningRef.current = false;
    setListening(false);
    recognitionRef.current.stop();
  };

  return (
    <div className="mock-interview">

      {/* HEADER */}

      <div className="mock-header">

        <div className="mock-title">
          <BrainCircuit />

          <h1>
            AI Mock Interview
          </h1>
        </div>

        <div className="mock-timer">
          <Timer />

          <span>
            {timer}s
          </span>
        </div>

      </div>



      {/* QUESTION */}

      <div className="mock-question">

        <span className="question-tag">
          Advanced Technical
        </span>

        <h2>
          Explain Transformer
          Architecture and
          Attention Mechanism.
        </h2>

      </div>



      {/* VOICE BUTTON */}

      <div className="voice-container">

        <button
          className={
            listening
              ? "mic-btn active"
              : "mic-btn"
          }
          onClick={
            listening
              ? stopListening
              : startListening
          }
          disabled={!voiceSupported}
          title={voiceSupported ? "Use voice input" : "Voice input not supported in this browser"}
        >

          <Mic />

        </button>
        {!voiceSupported && (
          <p className="voice-warning">Voice input is not supported in this browser. Please use the text area instead.</p>
        )}

      </div>



      {/* ANSWER INPUT */}

      <textarea
        className="answer-box"
        placeholder="Your answer will appear here..."
        value={transcript}
        onChange={(e) =>
          setTranscript(
            e.target.value
          )
        }
      />



      {/* SUBMIT BUTTON */}

      <button className="submit-btn">

        <Send />

        Submit Answer

      </button>

    </div>
  );
};

export default MockInterview;