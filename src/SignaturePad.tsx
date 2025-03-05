import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignaturePadProps {
  onSave: (dataUrl: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
  const sigPadRef = useRef<SignatureCanvas | null>(null);

  const handleSave = () => {
    if (sigPadRef.current) {
      const dataUrl = sigPadRef.current.getCanvas().toDataURL("image/png");
      onSave(dataUrl);
    }
  };

  const handleClear = () => {
    if (sigPadRef.current) sigPadRef.current.clear();
  };

  return (
    <div className="">
      <SignatureCanvas
        penColor="white"
        ref={sigPadRef}
        canvasProps={{
          width: 400,
          height: 200,
          className: "signatureCanvas border border-white",
        }}
      />
      <div className="flex flex-row gap-5">
        <button
          className="px-3 py-1 w-auto text-sm border rounded-md cursor-pointer"
          onClick={handleSave}
        >
          Save Signature
        </button>
        <button
          className="px-3 py-1 text-sm border rounded-md cursor-pointer"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;
