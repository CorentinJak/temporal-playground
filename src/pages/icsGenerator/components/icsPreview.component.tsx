import "./IcsPreview.css";

interface IcsPreviewProps {
  icsContent: string;
  onDownload: () => void;
}

function IcsPreview({ icsContent, onDownload }: IcsPreviewProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(icsContent);
  };

  return (
    <div className="ics-preview">
      <h2>Aperçu ICS</h2>

      <div className="preview-content">
        <pre>{icsContent}</pre>
      </div>

      <div className="action-buttons">
        <button onClick={copyToClipboard} className="btn-copy">
          Copier
        </button>
        <button onClick={onDownload} className="btn-download">
          Télécharger
        </button>
      </div>
    </div>
  );
}

export default IcsPreview;
