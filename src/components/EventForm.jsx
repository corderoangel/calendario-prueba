import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../features/calendar/eventosSlice";

const EventForm = ({ date, onClose }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [timeStart, setTimeStart] = useState("");
	const [timeEnd, setTimeEnd] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const newEvent = {
			id: Date.now(),
			text: title,
			description: description,
			start: `${date}T${timeStart}:00`,
			end: `${date}T${timeEnd}:00`,
		};
		dispatch(addEvent(newEvent));
		onClose();
	};

	return (
		<form onSubmit={handleSubmit} className="p-4">
			<h3 className="text-lg font-bold">Agregar evento</h3>
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
