import mobilenet from "@tensorflow-models/mobilenet";
import React, { useEffect, useState } from "react";
import { compareSignatures, loadModel } from "./lib/signatureVerification";
import SignaturePad from "./SignaturePad";

const App: React.FC = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [signature1, setSignature1] = useState<string | null>(null);
  const [signature2, setSignature2] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    async function initModel() {
      const loadedModel = await loadModel();
      setModel(loadedModel);
    }
    initModel();
  }, []);

  const handleVerify = async () => {
    console.log("Start");
    if (!model || !signature1 || !signature2) return;
    console.log("Bef");
    const similarity = await compareSignatures(model, signature1, signature2);
    console.log("After");
    setResult(
      (similarity > 0.8 ? "Match: " : "Not a Match: ") +
        Number(similarity).toPrecision(2)
    );
  };

  return (
    <div className="p-2 flex flex-col gap-y-2">
      <h2>Signature Verification</h2>
      <div>
        <h3>Signature 1</h3>
        <SignaturePad onSave={setSignature1} />
      </div>
      <div>
        <h3>Signature 2</h3>
        <SignaturePad onSave={setSignature2} />
      </div>
      <button
        className="px-3 py-1 text-sm border rounded-md cursor-pointer"
        onClick={handleVerify}
        disabled={!model}
      >
        Verify
      </button>
      {result && <h3>Result: {result}</h3>}
    </div>
  );
};

export default App;
