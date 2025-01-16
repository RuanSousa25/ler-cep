import "./CustomFileInput.css";
import { useRef, useState } from "react";

export default function CustomFileInput({ accept }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  function handleFileUploadClick() {
    fileInputRef.current.click();
  }
  function updateFile(e) {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      setFile(newFile);
    }
  }
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleFileDrop(e) {
    e.preventDefault();
  }
  return (
    <div className="custom-input">
      <div
        className="drop-zone"
        onDrag={handleDragOver}
        onDrop={handleFileDrop}
        onClick={handleFileUploadClick}
      >
        {file ? (
          <span>{file.name} inserido</span>
        ) : (
          <span>Arraste e solte aqui!</span>
        )}
        <input
          type="file"
          accept={accept}
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={updateFile}
        />
      </div>
    </div>
  );
}
