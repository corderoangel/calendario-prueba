import { X } from "lucide-react"; // Importamos el icono de Lucide React
import { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ open, onClose, children }) {
	useEffect(() => {
		// Deshabilita el scroll del fondo cuando el modal está abierto
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		// Agrega un listener para cerrar el modal con la tecla Escape
		const handleEscape = (e) => {
			if (e.key === "Escape" && open) {
				onClose();
			}
		};
		document.addEventListener("keydown", handleEscape);

		// Limpia los efectos al desmontar el componente
		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", handleEscape);
		};
	}, [open, onClose]);

	// Si el modal no está abierto, no renderiza nada
	if (!open) return null;

	// Renderiza el modal en un portal
	return ReactDOM.createPortal(
		<div onClick={onClose} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
				onClick={(e) => e.stopPropagation()}
				className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-lg transition-transform transform scale-100 opacity-100">
				{/* Botón de cierre */}
				<button onClick={onClose} aria-label="Cerrar modal" className="absolute top-2 right-2 p-2 text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer">
					<X className="w-5 h-5" /> {/* Ícono de Lucide React */}
				</button>

				{/* Contenido del modal */}
				<div>{children}</div>
			</div>
		</div>,
		document.body // Nodo del portal
	);
}
