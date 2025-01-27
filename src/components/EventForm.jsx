import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, editEvent } from "../features/calendar/eventosSlice";

const EventForm = ({ date, onClose, event }) => {
	// Inicializar los valores con un fallback
	const [title, setTitle] = useState(event?.title || "");
	const [description, setDescription] = useState(event?.description || "");
	const [timeStart, setTimeStart] = useState(event?.start?.split("T")[1]?.slice(0, 5) || "");
	const [timeEnd, setTimeEnd] = useState(event?.end?.split("T")[1]?.slice(0, 5) || "");
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

		const newEvent = {
			id: `${date}T${timeStart}:00-${date}T${timeEnd}:00`,
			title: title,
			description: description,
			start: `${date}T${timeStart}:00`,
			end: `${date}T${timeEnd}:00`,
		};

		if (event) {
			console.log("edit");

			dispatch(editEvent({ id: JSON.parse(event).id, updatedEvent: newEvent })); // Editar evento existente
		} else {
			console.log("create");

			if (isOverlapping(timeStart, timeEnd)) {
				setError("El intervalo de tiempo se solapa con otro evento.");
				return;
			}
			dispatch(addEvent(newEvent)); // Crear nuevo evento
		}

		onClose();
	};

	useEffect(() => {
		if (event) {
			console.log(JSON.parse(event));

			setTitle(JSON.parse(event)?.title || "");
			setDescription(JSON.parse(event)?.description || "");
			setTimeStart(JSON.parse(event).start.split("T")[1]?.slice(0, 5));
			setTimeEnd(JSON.parse(event).end.split("T")[1]?.slice(0, 5));
		}
	}, [event]);

	return (
		<form onSubmit={handleSubmit} className="p-4">
			<h3 className="text-lg font-bold">Agregar evento</h3>
			{error && <p className="text-red-500 mt-2">{error}</p>} {/* Mostrar error */}
			<div className="mt-2">
				<input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
			</div>
			<div className="mt-2">
				<textarea placeholder="Descripción" value={description} className="w-full h-30 p-2 border rounded" onChange={(e) => setDescription(e.target.value)} />
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
