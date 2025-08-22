interface Props {
  sequence: string;
  setSequence: (seq: string) => void;
  onAnalyze: () => void;
  loading: boolean;
}

const SequenceInput: React.FC<Props> = ({ sequence, setSequence, onAnalyze, loading }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <textarea
      className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-gray-800 resize-none"
      rows={6}
      placeholder="Paste your DNA sequence here..."
      value={sequence}
      onChange={(e) => setSequence(e.target.value.toUpperCase())}
    />
    <button
      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
      onClick={onAnalyze}
      disabled={loading}
    >
      {loading ? "Analyzing..." : "Analyze"}
    </button>
  </div>
);

export default SequenceInput;
