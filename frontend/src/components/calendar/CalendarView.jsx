import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

export default function CalendarView({
  citas,
  onEventClick,
  onDateSelect,
  onEventDrop,
  onEventResize,
  fechaSeleccionada
}) {

  const coloresEspecialidad = {
    Ortodoncia: "#097ca2",
    Endodoncia: "#66bb6a",
    Rehabilitacion: "#ef5350",
    "Odontología General": "#7e57c2"
  };
  
  return (

<FullCalendar
eventContent={(info) => {

  const { servicio, odontologo } =
    info.event.extendedProps;

  return (

<div className="fc-event-custom">
<div className="fc-event-hour">
{info.event.title.split("\n")[0]}
</div>
<div className="fc-event-patient">
{info.event.title.split("\n")[1]}
</div>
<div className="fc-event-service">
{servicio}
</div>

      <div className="fc-event-doctor">
        {odontologo}
      </div>

    </div>
  );
}}
locale={esLocale}
plugins={[
dayGridPlugin,
interactionPlugin,
timeGridPlugin
]}
firstDay={1}
eventClick={onEventClick}
editable={true}
eventDrop={onEventDrop}
eventResize={onEventResize}
selectable={true}
select={onDateSelect}
initialView={fechaSeleccionada? "timeGridDay": "timeGridWeek"}
initialDate={fechaSeleccionada ? fechaSeleccionada.format("YYYY-MM-DD"): undefined}
slotMinTime="08:00:00"
slotMaxTime="17:00:00"
slotDuration="00:30:00"
slotLabelInterval="00:30"
slotLabelFormat={{
  hour: "numeric",
  minute: "2-digit",
  hour12: true
}}
allDaySlot={false}
nowIndicator={true}
expandRows={true}
stickyHeaderDates={true}
contentHeight="auto"
eventTimeFormat={{
 hour: "2-digit",
 minute: "2-digit",
hour12: true
}}
eventDidMount={(info) => {
  info.el.title = `
Paciente: ${info.event.extendedProps.paciente}
Servicio: ${info.event.extendedProps.servicio}
Odontólogo: ${info.event.extendedProps.odontologo}
`;
}}
dayHeaderFormat={{
weekday: "short",
day: "numeric"
}}
businessHours={[
{
daysOfWeek: [1, 2, 3, 4, 5],
startTime: "08:00",
endTime: "12:00"
},
{
daysOfWeek: [1, 2, 3, 4, 5],
startTime: "14:00",
endTime: "17:00"
},
{
daysOfWeek: [0, 6],
startTime: "08:00",
endTime: "12:00"
}
]}
events={citas.map(c => ({

  id: c._id,

  title:
`${c.hora}
${c.paciente?.nombre}`,

  start:
`${new Date(c.fecha)
  .toISOString()
  .split("T")[0]}T${c.hora}`,

  backgroundColor:
    coloresEspecialidad[
      c.servicio?.nombre
    ] || "#1976d2",

  borderColor:
    coloresEspecialidad[
      c.servicio?.nombre
    ] || "#1976d2",

  textColor: "#fff",

  extendedProps: {

    servicio: c.servicio?.nombre,

    odontologo: c.odontologo?.nombre,

    paciente: c.paciente?.nombre,

    hora: c.hora

  }
}))}
/>
);
}