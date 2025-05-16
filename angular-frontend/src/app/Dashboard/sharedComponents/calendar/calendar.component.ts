import { Component,ViewEncapsulation } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';



@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent {
  calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, googleCalendarPlugin],
    initialView: 'dayGridMonth',
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    buttonText: {
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
      list: 'Lista',
    },
    googleCalendarApiKey: 'AIzaSyBR-HYzjx4V0M_13WWr8xHpQtlIE2wT-aM',
    events: {
      googleCalendarId: '98025d53a185e2b10d7d6c19f6316695e3a754b82e1d29ff74f7259b2c9f095b@group.calendar.google.com',
    },
    eventColor: '#3b82f6',
    eventTextColor: 'white',
    height: 'auto',
    dayMaxEventRows: true,
    aspectRatio: 1.35,
  };
}