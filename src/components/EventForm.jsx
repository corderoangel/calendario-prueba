import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, editEvent } from "../features/calendar/eventosSlice";

const EventForm = ({ date, onClose, event }) => {
	const dispatch = useDispatch();
	const eventos = useSelector((state) => state.eventos.eventos);

	// Estados locales para manejar los valores del formulario
	const [formState, setFormState] = useState({
		title: "",
		description: "",
		timeStart: "",
		timeEnd: "",
	});

	const [error, setError] = useState(""); // Manejo de errores

	// Maneja los cambios de los inputs del formulario
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormState((prevState) => ({ ...prevState, [name]: value }));
	};

	// Verifica si el rango de tiempo se solapa con eventos existentes
	const isOverlapping = useCallback(
		(start, end) => {
			const newStart = new Date(`${date}T${start}:00`);
			const newEnd = new Date(`${date}T${end}:00`);
			return eventos.some((event) => {
				const eventStart = new Date(event.start);
				const eventEnd = new Date(event.end);
				return (newStart >= eventStart && newStart < eventEnd) || (newEnd > eventStart && newEnd <= eventEnd) || (newStart <= eventStart && newEnd >= eventEnd);
			});
		},
		[eventos, date]
	);

	// Maneja el envío del formulario
	const handleSubmit = (e) => {
		e.preventDefault();
		setError(""); // Limpia errores previos

		const { title, description, timeStart, timeEnd } = formState;

		if (!title || !timeStart || !timeEnd) {
			setError("Todos los campos son obligatorios.");
			return;
		}

		if (timeStart >= timeEnd) {
			setError("La hora de inicio debe ser antes de la hora de fin.");
			return;
		}

		if (!event && isOverlapping(timeStart, timeEnd)) {
			setError("El intervalo de tiempo se solapa con otro evento.");
			return;
		}

		const newEvent = {
			id: `${date}T${timeStart}:00-${date}T${timeEnd}:00`,
			title,
			description,
			start: `${date}T${timeStart}:00`,
			end: `${date}T${timeEnd}:00`,
		};

		if (event) {
			dispatch(editEvent({ id: JSON.parse(event).id, updatedEvent: newEvent }));
		} else {
			dispatch(addEvent(newEvent));
		}

		onClose();
	};

	// Efecto para cargar datos de un evento existente
	useEffect(() => {
		if (event) {
			const parsedEvent = JSON.parse(event);
			setFormState({
				title: parsedEvent.title || "",
				description: parsedEvent.description || "",
				timeStart: parsedEvent.start.split("T")[1]?.slice(0, 5) || "",
				timeEnd: parsedEvent.end.split("T")[1]?.slice(0, 5) || "",
			});
		}
	}, [event]);

	return (
		<form onSubmit={handleSubmit} className="p-4">
			<h3 className="text-lg font-bold">{event ? "Editar Evento" : "Agregar Evento"}</h3>

			{error && <p className="text-red-500 mt-2">{error}</p>}

			<div className="mt-2">
				<input type="text" name="title" placeholder="Título" value={formState.title} onChange={handleInputChange} className="w-full p-2 border rounded" />
			</div>

			<div className="mt-2">
				<textarea name="description" placeholder="Descripción" value={formState.description} onChange={handleInputChange} className="w-full h-30 p-2 border rounded" />
			</div>

			<div className="mt-2 flex gap-2">
				<input type="time" name="timeStart" value={formState.timeStart} onChange={handleInputChange} className="p-2 border rounded" />
				<input type="time" name="timeEnd" value={formState.timeEnd} onChange={handleInputChange} className="p-2 border rounded" />
			</div>

			<div className="mt-4 flex justify-between">
				<button type="button" className="px-4 py-2 bg-red-500 text-white rounded" onClick={onClose}>
					Cancelar
				</button>
				<button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
					{event ? "Actualizar" : "Agregar"}
				</button>
			</div>
		</form>
	);
};

export default EventForm;
