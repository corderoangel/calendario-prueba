// import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
// import { useState } from "react";
// import Modal from "./Modal";
// import { useSelector } from "react-redux";
// import Navbar from "./Navbar";
// import EventForm from "./EventForm";

// const CalendarView = () => {
// 	const [openModal, setOpenModal] = useState(false);
// 	const [selectedDate, setSelectedDate] = useState(null);
// 	const eventos = useSelector((state) => state.eventos.eventos);

// 	const config = {
// 		viewType: "Day",
// 		timeFormat: "Clock24Hours",
// 	};

// 	const handleDateSelect = (args) => {
// 		const dateOnly = new Date(args.day).toISOString().split("T")[0];
// 		setSelectedDate(dateOnly);
// 		setOpenModal(true);
// 	};

// 	return (
// 		<>
// 			<Navbar />
// 			<div className="flex">
// 				<div>
// 					<DayPilotNavigator selectMode={"Day"} onTimeRangeSelected={handleDateSelect} />
// 				</div>
// 				<div>
// 					<DayPilotCalendar {...config} events={eventos} startDate={selectedDate} />
// 				</div>
// 				<Modal open={openModal} onClose={() => setOpenModal(false)}>
// 					<EventForm date={selectedDate} onClose={() => setOpenModal(false)} />
// 				</Modal>
// 			</div>
// 		</>
// 	);
// };

// export default CalendarView;

import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import { useState, useMemo } from "react";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import EventForm from "./EventForm";

const CalendarView = () => {
	const [openModal, setOpenModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const eventos = useSelector((state) => state.eventos.eventos);

	const config = {
		viewType: "Day",
		timeFormat: "Clock24Hours",
	};

	// Obtener las fechas únicas con eventos
	// const eventDates = [...new Set(eventos.map((event) => event.start.split("T")[0]))];
	// Calcular fechas únicas con eventos una sola vez
	const eventDates = useMemo(() => [...new Set(eventos.map((event) => event.start.split("T")[0]))], [eventos]);

	const handleDateSelect = (args) => {
		const dateOnly = new Date(args.day).toISOString().split("T")[0];
		setSelectedDate(dateOnly);
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
							console.log("args.start:", args.cell.day.value);

							if (!isNaN(start.getTime())) {
								const dateOnly = start.toISOString().split("T")[0];
								console.log("dateOnly: " + dateOnly);

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
					<EventForm date={selectedDate} onClose={() => setOpenModal(false)} />
				</Modal>
			</div>
		</>
	);
};

export default CalendarView;
