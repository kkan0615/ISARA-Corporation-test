# ISARA Corporation Test

## How to start

### Dev
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
Before you start production, you should build first.
```bash
npm run start
```

## Versions


## Todo
- Express.js
- React.js
- Vite

- [v] Self contained .zip file, or link to github code repository containing Javascript and package configuration files to start an ExpressJS server, which serves no content
- [v] Server serves a ReactJS page which is static, but similar in shape to the above. Components are preferred a single render function building everything.
- [v] ReactJS page where each X above is replaced with some HTML control allowing a staff  member to be selected for a slot.
- [v] 4 ReactJS page displays all staff in the Load section, with their number of slots correct for each day, and the correct total for the week
- [] ReactJS page prevents – or displays warning – when a staff member is in consecutive lunch slots on the same day.
- [] ReactJS page prevents – or displays warning – when a staff member has more than 2 shifts per day
- [] ReactJS page prevents – or displays warning – when a staff member has more than 7 shifts per week
- [] ReactJS page prevents – or displays warning – when a staff member is selected to be in two places at once. (eg: UpStairs and Parking Lot)
- [] ReactJS page allows randomised population of currently empty shifts, respecting the above rules. At this level, clearing all shifts should be supported too.
- [] ReactJS page reports how many staff members are needed to fill all shifts, respecting the above rules.
- [] ReactJS page stores current progress at the server (globally)
- [] ReactJS page can retrieve current state when re-opened (globally)
- [] ReactJS page supports undo/redo
