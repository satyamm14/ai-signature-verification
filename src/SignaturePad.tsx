import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignaturePadProps {
  onSave: (dataUrl: string) => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
  const sigPadRef = useRef<SignatureCanvas | null>(null);
  const [willDraw, setWillDraw] = useState(true);

  const handleSave = () => {
    if (sigPadRef.current) {
      const dataUrl = sigPadRef.current.getCanvas().toDataURL("image/png");
      onSave(dataUrl);
    }
  };

  const handleClear = () => {
    if (sigPadRef.current) sigPadRef.current.clear();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setWillDraw(false);
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          onSave(reader.result as string);
          console.log(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max">
      {willDraw && (
        <SignatureCanvas
          penColor="white"
          ref={sigPadRef}
          canvasProps={{
            width: 400,
            height: 200,
            className: "signatureCanvas border border-white",
          }}
        />
      )}
      <div className="flex flex-col gap-y-2 max-w-64">
        <input
          type="file"
          accept="image/*"
          className="border px-2 py-1"
          onChange={handleFileChange}
        />
        <div className="flex flex-row gap-5">
          {willDraw && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignaturePad;
