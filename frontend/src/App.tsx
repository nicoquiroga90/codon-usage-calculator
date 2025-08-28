import { useState } from "react";
import SequenceInput from "./components/SequenceInput";
import CodonGrid from "./components/CodonGrid";

type CodonResult = {
  codon_counts: Record<string, number>;
  total_codons: number;
};

const App: React.FC = () => {
  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState<CodonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!sequence.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-50%">
        <h1 className="text-4xl font-bold text-center mb-8">Codon Usage Calculator</h1>
        <SequenceInput
          sequence={sequence}
          setSequence={setSequence}
          onAnalyze={handleAnalyze}
          loading={loading}
        />
        {error && (
          <div className="mt-4 text-red-600 font-medium text-center">{error}</div>
        )}
        {result && <CodonGrid result={result} />}
      </div>
    </div>
  );
};

export default App;
