import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import { useState, useMemo, useCallback } from "react";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import EventForm from "./EventForm";
import { deleteEvent } from "../features/calendar/eventosSlice";

const CalendarView = () => {
	// Estado para controlar el modal
	const [openModal, setOpenModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);

	// Nuevo estado para el tipo de vista
	const [viewType, setViewType] = useState("Day"); // "Day" o "Week"

	// Acceso a eventos desde Redux
	const eventos = useSelector((state) => state.eventos.eventos);
	const dispatch = useDispatch();

	// Configuración del calendario
	const calendarConfig = useMemo(
		() => ({
			viewType: viewType,
			timeFormat: "Clock24Hours",
			heightSpec: "Full",

			onEventClick: (args) => {
				const event = eventos.find((e) => e.id === args.e.data.id);
				if (event) {
					setSelectedEvent(JSON.stringify(event, null, 2));
					setSelectedDate(event.start.split("T")[0]);
					setOpenModal(true);
				}
			},
			onBeforeEventRender: (args) => {
				// args.data.text = `${args.data.title} - ${args.data.description}`;
				const isSmallScreenWeekView = viewType === "Week" && window.innerWidth < 768;
				args.data.text = isSmallScreenWeekView ? "" : `${args.data.title} - ${args.data.description}`;
				args.data.areas = [
					{
						top: 4,
						right: 10,
						width: 20,
						height: 20,
						action: "None",
						html: `<div style='color: #000000; 
						  font-size: 14px; 
						  background-color:rgb(247, 80, 80); 
						  text-align: center;
						  border-radius: 10px'>X</div>`,
						toolTip: "Eliminar evento",
						onClick: (args) => {
							const eventId = args.source?.data?.id;
							if (eventId) {
								dispatch(deleteEvent(eventId));
							} else {
								console.error("El ID del evento es inválido o no existe.");
							}
						},
					},
				];
			},
		}),
		[eventos, dispatch, viewType]
	);

	// Fechas únicas con eventos
	const eventDates = useMemo(() => {
		return [...new Set(eventos.map((event) => event.start.split("T")[0]))];
	}, [eventos]);

	// Manejar selección de fecha en el navegador
	const handleDateSelect = useCallback((args) => {
		const dateOnly = new Date(args.day).toISOString().split("T")[0];
		setSelectedDate(dateOnly);
		setSelectedEvent(null); // Limpia el evento seleccionado para un nuevo evento
		setOpenModal(true);
	}, []);

	// Manejar cambio de tipo de vista
	const handleViewTypeChange = (event) => {
		setViewType(event.target.value); // Actualiza el estado del tipo de vista
	};

	return (
		<>
			<Navbar />
			<div className="flex flex-col md:flex-row h-screen">
				<div className="flex flex-col items-center">
					<DayPilotNavigator
						selectMode={"Day"}
						days={30} // Muestra un rango de 30 días
						onTimeRangeSelected={handleDateSelect}
						onBeforeCellRender={(args) => {
							const start = new Date(args.cell.day.value); // Convertir a un formato legible
							if (!isNaN(start.getTime())) {
								const dateOnly = start.toISOString().split("T")[0];
								if (eventDates.includes(dateOnly)) {
									args.cell.cssClass = "day-with-event"; // Clase css personalizada
								}
							}
						}}
					/>
					{/* Select para cambiar el tipo de vista */}
					<div className="mt-4">
						<label htmlFor="viewType" className="block mb-2 text-sm font-medium text-gray-700">
							Tipo de vista
						</label>
						<select id="viewType" className="p-2 border border-gray-300 rounded-md" value={viewType} onChange={handleViewTypeChange}>
							<option value="Day">Día</option>
							<option value="Week">Semana</option>
							<option value="Month">Mes</option>
						</select>
					</div>
				</div>
				<div className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto">
					<DayPilotCalendar {...calendarConfig} events={eventos} startDate={selectedDate} height={850} />
				</div>
			</div>

			<Modal open={openModal} onClose={() => setOpenModal(false)}>
				<EventForm date={selectedDate} event={selectedEvent || null} onClose={() => setOpenModal(false)} />
			</Modal>
		</>
	);
};

export default CalendarView;
