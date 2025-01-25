import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../features/calendar/eventosSlice";

const EventForm = ({ date, onClose }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [timeStart, setTimeStart] = useState("");
	const [timeEnd, setTimeEnd] = useState("");
	const eventos = useSelector((state) => state.eventos.eventos);
	const [error, setError] = useState(""); // Estado para mostrar errores

	const dispatch = useDispatch();

	// Validar si el rango de tiempo se solapa con algún evento existente
	const isOverlapping = (start, end) => {
		const newStart = new Date(`${date}T${start}:00`);
		const newEnd = new Date(`${date}T${end}:00`);
		return eventos.some((event) => {
			const eventStart = new Date(event.start);
			const eventEnd = new Date(event.end);
			return (
				(newStart >= eventStart && newStart < eventEnd) || // Inicio dentro del rango existente
				(newEnd > eventStart && newEnd <= eventEnd) || // Fin dentro del rango existente
				(newStart <= eventStart && newEnd >= eventEnd) // Cubre completamente un evento existente
			);
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setError(""); // Limpiar errores previos

		if (!title || !timeStart || !timeEnd) {
			setError("Todos los campos son obligatorios.");
			return;
		}

		if (timeStart >= timeEnd) {
			setError("La hora de inicio debe ser antes de la hora de fin.");
			return;
		}

		if (isOverlapping(timeStart, timeEnd)) {
			setError("El intervalo de tiempo se solapa con otro evento.");
			return;
		}

		const newEvent = {
			id: `${date}T${timeStart}:00-${date}T${timeEnd}:00`,
			text: title,
			description,
			start: `${date}T${timeStart}:00`,
			end: `${date}T${timeEnd}:00`,
		};
		dispatch(addEvent(newEvent));
		onClose();
	};
	return (
		<form onSubmit={handleSubmit} className="p-4">
			<h3 className="text-lg font-bold">Agregar evento</h3>
			{error && <p className="text-red-500 mt-2">{error}</p>} {/* Mostrar error */}
			<div className="mt-2">
				<input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
			</div>
			<div className="mt-2">
				<textarea placeholder="Descripción" className="w-full h-30 p-2 border rounded" onChange={(e) => setDescription(e.target.value)} />
			</div>
			<div className="mt-2 flex gap-2">
				<input type="time" value={timeStart} onChange={(e) => setTimeStart(e.target.value)} className="p-2 border rounded" />
				<input type="time" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} className="p-2 border rounded" />
			</div>
			<div className="mt-4 flex justify-between">
				<button type="button" className="px-4 py-2 bg-red-500 text-white rounded" onClick={onClose}>
					Cancelar
				</button>
				<button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
					Agregar
				</button>
			</div>
		</form>
	);
};

export default EventForm;
