import { FaPaperPlane } from "react-icons/fa";

interface SubmitBtnProps {
  disabled?: boolean;
}

export default function SubmitBtn({ disabled = false }: SubmitBtnProps) {
  return (
    <button
      type="submit"
      className="group flex items-center justify-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-8 py-4 text-white hover:bg-white/20 hover:scale-105 active:scale-100 focus:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white/10 font-medium"
      disabled={disabled}
    >
      {disabled ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
      ) : (
        <>
          Submit{" "}
          <FaPaperPlane className="text-sm opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </>
      )}
    </button>
  );
}