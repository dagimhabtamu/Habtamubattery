import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
          <h2 className="text-lg font-bold text-stone-800">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded hover:bg-stone-100"
          >
            <X size={20} />
          </button>
        </header>
        <div className="px-6 py-4">{children}</div>
        {footer && <footer className="border-t border-stone-200 px-6 py-4">{footer}</footer>}
      </div>
    </div>
  );
}
