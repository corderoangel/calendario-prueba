import { DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import { useState } from "react";
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
					<DayPilotNavigator selectMode={"Day"} onTimeRangeSelected={handleDateSelect} />
				</div>
				<div>
					<DayPilotCalendar {...config} events={eventos} />
				</div>
				<Modal open={openModal} onClose={() => setOpenModal(false)}>
					<EventForm date={selectedDate} onClose={() => setOpenModal(false)} />
				</Modal>
			</div>
		</>
	);
};

export default CalendarView;
