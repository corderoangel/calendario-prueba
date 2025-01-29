import { createSlice } from "@reduxjs/toolkit";

const eventosSlice = createSlice({
	name: "eventos", // Nombre del slice
	initialState: {
		eventos: [
			{
				id: "2025-01-24T17:30:00-2025-01-24T19:30:00", // ID único del evento
				title: "Evento #1", // Título del evento
				description: "Descripción de evento #1", // Descripción del evento
				start: "2025-01-24T17:30:00", // Hora de inicio (ISO 8601)
				end: "2025-01-24T19:30:00", // Hora de fin (ISO 8601)
				backColor: "#30B0C7", // Color de fondo para el evento
			},
			{
				id: "2025-02-03T09:00:00-2025-02-03T10:30:00",
				title: "Reunión de equipo",
				description: "Planificación semanal con el equipo de desarrollo",
				start: "2025-02-03T09:00:00",
				end: "2025-02-03T10:30:00",
				backColor: "#30B0C7",
			},
			{
				id: "2025-02-07T14:00:00-2025-02-07T15:30:00",
				title: "Llamada con cliente",
				description: "Presentación de avances del proyecto",
				start: "2025-02-07T14:00:00",
				end: "2025-02-07T15:30:00",
				backColor: "#30B0C7",
			},
			{
				id: "2025-02-10T11:00:00-2025-02-10T12:00:00",
				title: "Revisión de código",
				description: "Analizar PRs pendientes en GitHub",
				start: "2025-02-10T11:00:00",
				end: "2025-02-10T12:00:00",
				backColor: "#30B0C7",
			},
			{
				id: "2025-02-14T18:00:00-2025-02-14T19:00:00",
				title: "Cena de San Valentín ❤️",
				description: "Reservación en restaurante",
				start: "2025-02-14T18:00:00",
				end: "2025-02-14T19:00:00",
				backColor: "#30B0C7",
			},
			{
				id: "2025-02-21T08:30:00-2025-02-21T09:30:00",
				title: "Gym",
				description: "Sesión de entrenamiento",
				start: "2025-02-21T08:30:00",
				end: "2025-02-21T09:30:00",
				backColor: "#30B0C7",
			},
			{
				id: "2025-02-25T16:00:00-2025-02-25T17:00:00",
				title: "Entrega de proyecto",
				description: "Enviar la versión final al cliente",
				start: "2025-02-25T16:00:00",
				end: "2025-02-25T17:00:00",
				backColor: "#30B0C7",
			},
			{
				id: "2025-02-28T20:00:00-2025-02-28T22:00:00",
				title: "Noche de cine 🎬",
				description: "Ver película en casa con amigos",
				start: "2025-02-28T20:00:00",
				end: "2025-02-28T22:00:00",
				backColor: "#30B0C7",
			},
		],
	},
	reducers: {
		// Agregar un nuevo evento al estado
		addEvent: (state, action) => {
			// Validar que el payload tenga los campos necesarios
			if (!action.payload.id || !action.payload.title || !action.payload.description || !action.payload.start || !action.payload.end) {
				console.error("Faltan campos requeridos en el evento");
				return;
			}
			state.eventos.push(action.payload);
		},
		// Editar un evento existente
		editEvent: (state, action) => {
			const { id, updatedEvent } = action.payload;
			const index = state.eventos.findIndex((event) => event.id === id);

			if (index !== -1) {
				state.eventos[index] = { ...state.eventos[index], ...updatedEvent };
			} else {
				console.error(`Evento con id ${id} no encontrado`);
			}
		},
		// Eliminar un evento por ID
		deleteEvent: (state, action) => {
			const id = action.payload;

			// Validar que el ID exista antes de intentar eliminarlo
			const index = state.eventos.findIndex((event) => event.id === id);
			if (index !== -1) {
				state.eventos = state.eventos.filter((event) => event.id !== id);
			} else {
				console.error(`No se puede eliminar: Evento con id ${id} no encontrado`);
			}
		},
	},
});

// Exportar acciones
export const { addEvent, editEvent, deleteEvent } = eventosSlice.actions;

// Exportar reducer para usarlo en el store
export default eventosSlice.reducer;
