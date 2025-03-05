import mobilenet from "@tensorflow-models/mobilenet";
import React, { useEffect, useState } from "react";
import { compareSignatures, loadModel } from "./lib/signatureVerification";
import SignaturePad from "./SignaturePad";

const App: React.FC = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [signature1, setSignature1] = useState<string | null>(null);
  const [signature2, setSignature2] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initModel() {
      setIsLoading(true);
      const loadedModel = await loadModel();
      setModel(loadedModel);
      setIsLoading(false);
    }
    initModel();
  }, []);

  const handleVerify = async () => {
    console.log("Start");
    if (!model || !signature1 || !signature2) return;
    console.log("Bef");
    const similarity = await compareSignatures(model, signature1, signature2);
    console.log("After");
    const accuracy = +(+Number(similarity) * 100).toFixed(0);
    setResult(
      (accuracy > 80 ? "Match: " : "Not a Match: ") +
        (accuracy > 100 ? 100 : accuracy) +
        "%"
    );
  };

  return (
    <div className="p-2 flex flex-col gap-y-5">
      <h1 className="text-4xl font-extrabold text-center">
        Basic Signature Verification Prototype
      </h1>
      {isLoading && (
        <h1 className="text-4xl font-extrabold text-center">
          Model is Loading...
        </h1>
      )}
      <div>
        <h3 className="text-xl font-bold">Signature 1</h3>
        <SignaturePad onSave={setSignature1} />
      </div>
      <div>
        <h3 className="text-xl font-bold">Signature 2</h3>
        <SignaturePad onSave={setSignature2} />
      </div>
      <div className="">
        <button
          className="px-3 py-1 text-sm border rounded-md cursor-pointer"
          onClick={handleVerify}
          disabled={!model}
        >
          Verify
        </button>
      </div>
      {result && <h3>Result - {result}</h3>}
    </div>
  );
};

export default App;
