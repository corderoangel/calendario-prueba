import { createSlice } from "@reduxjs/toolkit";

const eventosSlice = createSlice({
	name: "eventos",
	initialState: {
		eventos: [
			{
				id: 1,
				text: "Event 1",
				start: "2025-01-24T14:45:00",
				end: "2025-01-24T16:00:00",
				participants: 2,
			},
			{
				id: 2,
				text: "Event 2",
				start: "2025-01-24T17:30:00",
				end: "2025-01-24T19:30:00",
				backColor: "#6aa84f",
				participants: 1,
			},
		],
	},
	reducers: {
		addEvent: (state, action) => {
			state.eventos.push(action.payload); // Agrega un nuevo evento
		},
		// editEvent: (state, action) => {
		// 	const { id, updatedEvent } = action.payload;
		// 	const index = state.eventos.findIndex((event) => event.id === id);
		// 	if (index !== -1) {
		// 		state.eventos[index] = { ...state.eventos[index], ...updatedEvent }; // Edita el evento
		// 	}
		// },
		// deleteEvent: (state, action) => {
		// 	const id = action.payload;
		// 	state.eventos = state.eventos.filter((event) => event.id !== id); // Elimina el evento
		// },
	},
});

export const { addEvent /*editEvent, deleteEvent*/ } = eventosSlice.actions;
export default eventosSlice.reducer;
