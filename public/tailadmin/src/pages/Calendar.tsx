import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput } from "@fullcalendar/core";
import PageMeta from "../components/common/PageMeta";

interface CalendarEvent extends EventInput {
    extendedProps: {
        calendar: string; // color name, e.g., "Danger"
        branch: number;   // branch number, e.g., 1, 2, 3, 4
        containerCount: number; // number of containers arrived
    };
}

const Calendar: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const calendarRef = useRef<FullCalendar>(null);

    useEffect(() => {
        const today = new Date();
        const toDateString = (date: Date) => date.toISOString().split("T")[0];

        // Sample data: containers arriving at branches on different days
        setEvents([
            {
                id: "1",
                title: "2 containers arrived at Branch 1",
                start: toDateString(today),
                extendedProps: { calendar: "Danger", branch: 1, containerCount: 2 },
            },
            {
                id: "2",
                title: "1 container arrived at Branch 2",
                start: toDateString(new Date(today.getTime() + 86400000)),
                extendedProps: { calendar: "Success", branch: 2, containerCount: 1 },
            },
            {
                id: "3",
                title: "4 containers arrived at Branch 3",
                start: toDateString(new Date(today.getTime() + 2 * 86400000)),
                extendedProps: { calendar: "Primary", branch: 3, containerCount: 4 },
            },
            {
                id: "4",
                title: "3 containers arrived at Branch 1",
                start: toDateString(new Date(today.getTime() + 3 * 86400000)),
                extendedProps: { calendar: "Warning", branch: 1, containerCount: 3 },
            },
            {
                id: "5",
                title: "2 containers arrived at Branch 4",
                start: toDateString(new Date(today.getTime() + 4 * 86400000)),
                extendedProps: { calendar: "Info", branch: 4, containerCount: 2 },
            },
            {
                id: "6",
                title: "1 container arrived at Branch 2",
                start: toDateString(new Date(today.getTime() + 5 * 86400000)),
                extendedProps: { calendar: "Secondary", branch: 2, containerCount: 1 },
            },
            {
                id: "7",
                title: "2 containers arrived at Branch 3",
                start: toDateString(new Date(today.getTime() + 5 * 86400000)),
                extendedProps: { calendar: "Primary", branch: 3, containerCount: 2 },
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
    const { containerCount, branch, calendar } = eventInfo.event.extendedProps;
    const colorClass = `fc-bg-${calendar?.toLowerCase()}`;

    return (
        <div className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}>
            <div className="fc-daygrid-event-dot"></div>
            <div className="fc-event-title">
                {containerCount} container{containerCount > 1 ? "s" : ""} arrived at Branch {branch}
            </div>
        </div>
    );
};

export default Calendar;
