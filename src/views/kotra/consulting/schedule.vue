<template>
  <div class="components-container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

export default {
  name: 'ConsultingSchedule',
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, resourceTimelinePlugin ],
        // initialView: 'dayGridMonth',
        initialView: 'resourceTimelineDay',
        schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
        aspectRatio: 1.5,
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
        },
        editable: true,
        resourceAreaHeaderContent: 'Rooms',
        resources: 'https://fullcalendar.io/demo-resources.json?with-nesting&with-colors',
        events: 'https://fullcalendar.io/demo-events.json?single-day&for-resource-timeline'
      }
    }
  },
  methods: {
    
  }
}
</script>
