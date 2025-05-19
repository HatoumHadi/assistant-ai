import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import PageMeta from "../components/common/PageMeta";

interface CalendarEvent extends EventInput {
    extendedProps: {
        calendar: string;
        soldCount: number;
    };
}

const Calendar: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const calendarRef = useRef<FullCalendar>(null);

    useEffect(() => {
        // Example items sold per day
        setEvents([
            {
                id: "1",
                title: "5 items sold",
                start: new Date().toISOString().split("T")[0],
                extendedProps: { calendar: "Danger", soldCount: 5 },
            },
            {
                id: "2",
                title: "3 items sold",
                start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
                extendedProps: { calendar: "Success", soldCount: 3 },
            },
            {
                id: "3",
                title: "10 items sold",
                start: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
                end: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
                extendedProps: { calendar: "Primary", soldCount: 10 },
            },
        ]);
    }, []);

    return (
        <>
            <PageMeta title="Sales Calendar" description="Sales Calendar" />
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="custom-calendar">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: "prev,next",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        events={events}
                        selectable={false}
                        eventClick={() => {}}
                        select={() => {}}
                        eventContent={renderEventContent}
                    />
                </div>
            </div>
        </>
    );
};

const renderEventContent = (eventInfo: any) => {
    const soldCount = eventInfo.event.extendedProps?.soldCount ?? 0;
    const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar?.toLowerCase()}`;

    return (
        <div
            className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
        >
            <div className="fc-daygrid-event-dot"></div>
            <div className="fc-event-title">
                {soldCount} items sold
            </div>
        </div>
    );
};

export default Calendar;
