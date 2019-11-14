import {Component, OnInit} from '@angular/core';
// import 'fullcalendar';

@Component({
  selector: 'hi-page',
  templateUrl: './calendar-demo.template.html'
})

export class CalendarDemoComponent implements OnInit {

  ngOnInit() {

    /*$(function () {
       // FULL CALENDAR
       $('.cat__apps__calendar').fullCalendar({
         height: 800,
         header: {
           left: 'prev, next',
           center: 'title',
           right: 'month, agendaWeek, agendaDay'
         },
         buttonIcons: {
           prev: 'none fa fa-arrow-left',
           next: 'none fa fa-arrow-right',
           prevYear: 'none fa fa-arrow-left',
           nextYear: 'none fa fa-arrow-right'
         },
         defaultDate: '2016-05-12',
         editable: true,
         eventLimit: true, // allow "more" link when too many events
         viewRender: function (view, element) {
          /!* if (!(/Mobi/.test(navigator.userAgent)) && jQuery.jScrollPane) {
             $('.fc-scroller').jScrollPane({
               autoReinitialise: true,
               autoReinitialiseDelay: 100
             });
           }*!/
         },
         events: [
           {
             title: 'All Day Event',
             start: '2016-05-01',
             className: 'fc-event-success'
           },
           {
             title: 'Long Event',
             start: '2016-05-07',
             end: '2016-05-10'
           },
           {
             id: 999,
             title: 'Repeating Event',
             start: '2016-05-09T16:00:00',
             className: 'fc-event-default'
           },
           {
             id: 999,
             title: 'Repeating Event',
             start: '2016-05-16T16:00:00',
             className: 'fc-event-success'
           },
           {
             title: 'Conference',
             start: '2016-05-11',
             end: '2016-05-13',
             className: 'fc-event-danger'
           },
           {
             title: 'Meeting',
             start: '2016-05-12T10:30:00',
             end: '2016-05-12T12:30:00',
             className: 'fc-event-default'
           },
           {
             title: 'Lunch',
             start: '2016-05-12T12:00:00',
             className: 'fc-event-default'
           },
           {
             title: 'Meeting',
             start: '2016-05-12T14:30:00',
             className: 'fc-event-info'
           },
           {
             title: 'Happy Hour',
             start: '2016-05-12T17:30:00'
           },
           {
             title: 'Dinner',
             start: '2016-05-12T20:00:00'
           },
           {
             title: 'Birthday Party',
             start: '2016-05-13T07:00:00',
             className: 'fc-event-danger'
           },
           {
             title: 'Click for Google',
             url: 'javascript: alert("Clicked: External URL");',
             start: '2016-05-28',
             className: 'fc-event-warning'
           }
         ],
         eventClick: function (calEvent, jsEvent, view) {
           if (!$(this).hasClass('event-clicked')) {
             $('.fc-event').removeClass('event-clicked');
             $(this).addClass('event-clicked');
           }
         }
       });

     });
     */

  }

}
