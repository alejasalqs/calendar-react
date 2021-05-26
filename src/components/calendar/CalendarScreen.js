import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import { Navbar } from "../ui/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendarConfig";
import { CalendarEvent } from "./CalendarEvent";

// Cambio de idioma de moment a español
moment.locale("es");

// Esto usa la configuracion de momento para las fechas
const localizer = momentLocalizer(moment);

const eventsList = [
  {
    title: "Este es el titulo que se muestra",
    start: moment().toDate(), // Get date pero con moment
    end: moment().add(2, "hour").toDate(), // Agregar 2 horas a la actual
    bgcolog: "#fafafa",
    user: {
      uid: "123",
      name: "Alejandro",
    },
  },
];

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastview") || "month"
  );
  const onDoubleClick = (e) => {
    console.log(e);
  };

  const onSelectEvent = (e) => {
    console.log(e);
  };

  const onViewChanged = (e) => {
    //console.log(e);
    //Cuando se cambia la vista vamos a guardar en el localStorage para que lo recuerde
    setLastView(e);
    localStorage.setItem("lastview", e);
  };
  const eventStylesGetter = ({ event, start, end, isSelected }) => {
    // Esta funcion es el estilo que se le va a aplicar a los eventos
    const style = {
      backgroundColor: "#367cF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <>
      <div className="calendar-screen">
        <Navbar />

        <Calendar
          className="pt-5"
          localizer={localizer}
          events={eventsList}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={eventStylesGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChanged}
          view={lastView}
          components={{
            event: CalendarEvent, //Este es el component que vamos a dibujar dentro del evento
          }}
        />
      </div>
    </>
  );
};
