import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import { useState, useMemo } from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import EventForm from "./EventForm";

const CalendarView = () => {
	const [openModal, setOpenModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const eventos = useSelector((state) => state.eventos.eventos);

	const config = {
		viewType: "Day",
		timeFormat: "Clock24Hours",
		onEventClick: (args) => {
			const event = eventos.find((e) => e.id === args.e.data.id);
			setSelectedEvent(JSON.stringify(event, null, 2));
			setSelectedDate(event.start.split("T")[0]);
			setOpenModal(true);
		},
		onBeforeEventRender: (args) => {
			args.data.text = args.data.title + " - " + args.data.description;
		},
	};

	// Obtener las fechas únicas con eventos
	// const eventDates = [...new Set(eventos.map((event) => event.start.split("T")[0]))];
	// Calcular fechas únicas con eventos una sola vez
	const eventDates = useMemo(() => [...new Set(eventos.map((event) => event.start.split("T")[0]))], [eventos]);

	const handleDateSelect = (args) => {
		const dateOnly = new Date(args.day).toISOString().split("T")[0];
		setSelectedDate(dateOnly);
		setSelectedEvent(null); // Limpia el evento seleccionado para un nuevo evento
		setOpenModal(true);
	};

	return (
		<>
			<Navbar />
			<div className="flex">
				<div>
					<DayPilotNavigator
						selectMode={"Day"}
						days={30} // Muestra un rango de 30 días
						onTimeRangeSelected={handleDateSelect}
						onBeforeCellRender={(args) => {
							const start = new Date(args.cell.day.value); // Convertir a un formato legible
							if (!isNaN(start.getTime())) {
								const dateOnly = start.toISOString().split("T")[0];
								if (eventDates.includes(dateOnly)) {
									args.cell.cssClass = "day-with-event"; // Asignar la clase personalizada
								}
							}
						}}
					/>
				</div>
				<div>
					<DayPilotCalendar {...config} events={eventos} startDate={selectedDate} />
				</div>
				<Modal open={openModal} onClose={() => setOpenModal(false)}>
					<EventForm date={selectedDate} event={selectedEvent || null} onClose={() => setOpenModal(false)} />
				</Modal>
			</div>
		</>
	);
};

export default CalendarView;
