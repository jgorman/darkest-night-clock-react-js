# darkest-night-clock-react-js

## A very dimmable night clock web app written in React.js

You can make the clock display quite dim in order to be readable
at night without adding much illumination to the room.
Studies have shown that ambient light at night can reduce
sleep quality and can also lead to nearsightedness due to
the eyes constantly attempting to focus while sleeping.

Run the __[Live demo](https://johngorman.io/darkest-night-clock/run)__

## Controls

- Adjust clock brightness by swiping left and right.
- Toggle control bar visibility by clicking on the time display.
- The plus (+) and minus (-) buttons also control the brightness.
- The color (<span style="color: gold">*</span>) button
  brings up the color selections.
- The seconds (:) button toggles seconds display.
- The date (/) button toggles date display.

## Technical Details

- Written in React.js with Redux state management.
- Co-written for Android and iOS as
  __[Darkest Night Clock - React Native](https://github.com/jgorman/darkest-night-clock-react-native)__
- There is a lot of shared code between the two projects.
  - The main application logic in Clock.js is identical.
  - The appstate.js Redux reducer file is identical.
- A great way to see exactly how React.js and React Native differ.
- Both projects store the app preferences state between sessions.

Let me know if you have any comments or suggestions!
