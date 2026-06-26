import { useState } from "react";
import Tesseract from "tesseract.js";
import "./OCRDemo.css";

export default function OcrRedactor() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [redactedText, setRedactedText] = useState("");
  const [loading, setLoading] = useState(false);

  // Original OCR + redaction logic — untouched
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setLoading(true);
    setText("");
    setRedactedText("");

    try {
      const result = await Tesseract.recognize(file, "eng");
      const extractedText = result.data.text;
      let cleanedText = extractedText
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      setText(extractedText);

      let redacted = cleanedText;
      redacted = redacted.replace(/[\w.-]+@[\w.-]+\.\w+/g, "[REDACTED EMAIL]");
      redacted = redacted.replace(/\b\d{10}\b/g, "[REDACTED PHONE]");
      redacted = redacted.replace(/\d{4}\s?\d{4}\s?\d{4}\s?\d{4}/g, "[REDACTED CARD]");

      setRedactedText(redacted);
    } catch (err) {
      console.error("OCR FAILED:", err);
    }

    setLoading(false);
  };

  return (
    <section className="ocr-section" aria-labelledby="ocr-heading">
      <div className="section-container">
        <div className="ocr-header">
          <p className="section-eyebrow">Live Demo</p>
          <h2 className="section-title" id="ocr-heading">
            OCR + Redaction Demo
          </h2>
          <p className="section-subtitle">
            Upload any image containing sensitive text. PurgeAI will scan it
            with OCR and automatically redact emails, phone numbers, and card
            numbers.
          </p>
        </div>

        {/* Upload area */}
        <div className="ocr-upload-area">
          <label htmlFor="ocr-file-input" className="ocr-dropzone">
            {image ? (
              <img
                src={image}
                alt="Uploaded document for OCR scanning"
                className="ocr-preview-img"
              />
            ) : (
              <div className="ocr-dropzone-inner">
                <span className="ocr-upload-icon" aria-hidden="true">↑</span>
                <span className="ocr-upload-text">
                  Drop an image or click to upload
                </span>
                <span className="ocr-upload-hint">
                  PNG, JPG, WEBP — max 10 MB
                </span>
              </div>
            )}
            <input
              id="ocr-file-input"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="ocr-file-input"
              aria-label="Upload image for OCR scanning"
            />
          </label>
        </div>

        {/* Scanning indicator */}
        {loading && (
          <div className="ocr-loading" role="status" aria-live="polite">
            <div className="ocr-loading-bar" aria-hidden="true" />
            <span>Scanning image for sensitive data…</span>
          </div>
        )}

        {/* Results pane */}
        {(text || redactedText) && !loading && (
          <div className="ocr-results">
            <div className="ocr-pane card">
              <div className="ocr-pane-header">
                <span className="ocr-pane-label">Before</span>
                <span className="ocr-pane-tag" style={{ color: "#f87171", borderColor: "rgba(248,113,113,0.3)" }}>
                  Raw OCR output
                </span>
              </div>
              <pre className="ocr-pre ocr-pre-raw">{text}</pre>
            </div>

            <div className="ocr-pane card">
              <div className="ocr-pane-header">
                <span className="ocr-pane-label">After</span>
                <span className="ocr-pane-tag" style={{ color: "#22d97a", borderColor: "rgba(34,217,122,0.3)" }}>
                  PII Redacted
                </span>
              </div>
              <pre className="ocr-pre ocr-pre-redacted">{redactedText}</pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
