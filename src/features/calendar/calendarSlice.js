import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
	name: "calendar",
	initialState: {
		events: [],
	},
	reducers: {
		addEvent: (state, action) => {
			state.events.push(action.payload);
		},
		editEvent: (state, action) => {
			const { id, updatedEvent } = action.payload;
			const index = state.events.findIndex((event) => event.id === id);
			if (index !== -1) {
				state.events[index] = { ...state.events[index], ...updatedEvent };
			}
		},
		deleteEvent: (state, action) => {
			const id = action.payload;
			state.events = state.events.filter((event) => event.id !== id);
		},
	},
});

export const { addEvent, editEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
