import { configureStore } from "@reduxjs/toolkit";
import eventosReducer from "../features/calendar/eventosSlice";

// Configuración global de la store
export const store = configureStore({
	// Mapeo de reducers (modularización del estado)
	reducer: {
		eventos: eventosReducer, // Reducer para manejar eventos del calendario
	},
	// middleware: (getDefaultMiddleware) =>
	//   getDefaultMiddleware().concat(customMiddleware),
});

export default store;
