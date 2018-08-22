/*eslint-env node, es6*/

/* Module Description */
/* delete calendar events that have no start & end time */

/* Put dependencies here */
const canvas = require('canvas-wrapper');
const asyncLib = require('async');

module.exports = (course, stepCallback) => {

    /* delete a single calendar event */
    function deleteEvent(event, cb) {
        canvas.delete(`/api/v1/calendar_events/${event}`, (err, result) => {
            if (err)
                course.error(err);
            else
                course.log('Event without date deleted', {
                    name: result.title,
                    id: result.id
                });

            cb(null);
        });
    }

    /* get calendar items associated with the course */
    canvas.get(`/api/v1/calendar_events?type=event&context_codes[]=course_${course.info.canvasOU}&all_events=1&excludes[]=assignment&excludes[]=description&excludes[]=child_events%27`, (err, allEvents) => {
        if (err) {
            course.error(err);
            stepCallback(null, course);
            return;
        }

        var eventIDs = allEvents.reduce((ids, event) => {
            if (event.start_at == null && event.end_at == null) ids.push(event.id);
            return ids;
        }, []);

        asyncLib.eachLimit(eventIDs, 5, deleteEvent, (err) => {
            if (err)
                course.error(err);

            stepCallback(null, course);
        });

    });
};