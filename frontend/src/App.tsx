import { useState } from "react";

type AnalysisResult = {
  total_codons: number;
  codon_counts: Record<string, number>;
  amino_acids: string;
};

function App() {
  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sequence }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze sequence");
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center p-6">
      <header className="max-w-3xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Codon Usage Calculator</h1>
        <p className="text-lg text-gray-600">
          Paste a DNA sequence and analyze codon usage and amino acid
          translation.
        </p>
      </header>

      <main className="max-w-3xl w-full">
        <textarea
          className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Paste your DNA sequence here..."
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
        />

        <button
          onClick={handleAnalyze}
          disabled={loading || !sequence}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {result && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Results</h2>

            <p className="mb-2">
              <strong>Total codons:</strong> {result.total_codons}
            </p>
            <p className="mb-6">
              <strong>Amino acids:</strong> {result.amino_acids}
            </p>

            <table className="w-full border-collapse border border-gray-300 shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Codon</th>
                  <th className="border border-gray-300 p-2 text-left">Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result.codon_counts).map(([codon, count]) => (
                  <tr key={codon}>
                    <td className="border border-gray-300 p-2">{codon}</td>
                    <td className="border border-gray-300 p-2">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
