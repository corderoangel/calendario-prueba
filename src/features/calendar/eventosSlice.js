import { createSlice } from "@reduxjs/toolkit";

const eventosSlice = createSlice({
	name: "eventos",
	initialState: {
		eventos: [
			{
				id: "2025-01-24T17:30:00-2025-01-24T19:30:00",
				title: "Evento #1",
				description: "Descripción de evento #1",
				start: "2025-01-24T17:30:00",
				end: "2025-01-24T19:30:00",
				// backColor: "#6aa84f",
			},
		],
	},
	reducers: {
		addEvent: (state, action) => {
			state.eventos.push(action.payload); // Agrega un nuevo evento
		},
		editEvent: (state, action) => {
			const { id, updatedEvent } = action.payload;
			const index = state.eventos.findIndex((event) => event.id === id);
			if (index !== -1) {
				state.eventos[index] = { ...state.eventos[index], ...updatedEvent };
			} else {
				console.error(`Evento con id ${id} no encontrado`);
			}
		},
		deleteEvent: (state, action) => {
			const id = action.payload;

			state.eventos = state.eventos.filter((event) => event.id !== id); // Elimina el evento
		},
	},
});

export const { addEvent, editEvent, deleteEvent } = eventosSlice.actions;
export default eventosSlice.reducer;
