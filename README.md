# Delete dateless events
### *Package Name*: remove-dateless-events
### *Child Type*: post import
### *Platform*: all
### *Required*: Recommended

This child module is built to be used by the Brigham Young University - Idaho D2L to Canvas Conversion Tool. It utilizes the standard `module.exports => (course, stepCallback)` signature and uses the Conversion Tool's standard logging functions. You can view extended documentation [Here](https://github.com/byuitechops/d2l-to-canvas-conversion-tool/tree/master/documentation).

## Purpose

This child module deletes calendar events in a Canvas course which have no start & end dates attached. They have to be removed via APi since they cannot be accessed through the calendar.

## How to Install

```
npm install remove-dateless-events
```

## Run Requirements

Only `course.info.canvasOU` is required to run this child module.

## Options

This child module has no required options.

## Outputs

This child module does not have any outputs.

## Process

1. Get all events for the current course
2. Filter out events without start and end dates
3. Delete these events

## Log Categories

The following log categories are used by this child module:

- Event without date deleted

## Requirements

This child module was created in response to a request from the FTC. Calendar events without dates appear on the syllabus in Canvas, and they must be deleted with the API
since they don't appear in the calendar anywhere.