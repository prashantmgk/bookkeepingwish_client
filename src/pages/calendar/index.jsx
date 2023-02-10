import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from '@fullcalendar/core'
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import useMediaQuery from '@mui/material/useMediaQuery';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import { tokens } from "../../theme";
import Header from "../../components/Header";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const large = useMediaQuery(theme.breakpoints.up('lg'));

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  return (

    <Box 
      sx={{
        margin: { lg: "10px", xs: "0"}
      }}
    >
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      <Box 
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        columnGap={2}
        rowGap={3}
        alignItems="center"
        justifyContent="center"
        
      >
        {/* CALENDAR */}
        <Box 
          sx={{
            gridColumn: { lg: "span 9", xs: "span 12" }
          }}
        >
          <FullCalendar
            height="70vh"
            sx={{
              wdith: { lg: "100vw", xs: "100vw"}
            }}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: `prev,next${large ? ' today' : ',today'}`,
              center: `${large? 'title' : ''}`,
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
              },
            ]}
          />
        </Box>

        {/* CALENDAR SIDEBAR */}
        <Box
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
          height="70vh"
          
          sx={{
            overflow: "hidden",
            overflowY: "scroll",
            gridColumn: { lg: "span 3", xs: "span 12" }
          }}
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
