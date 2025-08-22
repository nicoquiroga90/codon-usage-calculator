type CodonResult = {
  codon_counts: Record<string, number>;
  total_codons: number;
};

interface Props {
  result: CodonResult;
}

const CodonGrid: React.FC<Props> = ({ result }) => (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-4 text-center">Codon Counts</h2>
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {Object.entries(result.codon_counts).map(([codon, count]) => (
        <div
          key={codon}
          className="p-4 rounded-lg shadow text-center bg-blue-50 hover:bg-blue-100 transition"
        >
          <div className="font-bold text-lg">{codon}</div>
          <div className="text-gray-700">{count}</div>
        </div>
      ))}
    </div>
    <div className="mt-4 text-center text-gray-600">
      Total codons: {result.total_codons}
    </div>
  </div>
);

export default CodonGrid;
