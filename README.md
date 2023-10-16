# ISARA Corporation Test
This repository is ISARA Corporation's test.


## How to start

### Dev
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production Start
```bash
npm run start
```

## Versions
- Node.js: 18.12.1
- Express.js: Backend
- React.js: Frontend
- Vite: Frontend build

## Todo


- [v] Self contained .zip file, or link to github code repository containing Javascript and package configuration files to start an ExpressJS server, which serves no content
- [v] Server serves a ReactJS page which is static, but similar in shape to the above. Components are preferred a single render function building everything.
- [v] ReactJS page where each X above is replaced with some HTML control allowing a staff  member to be selected for a slot.
- [v] 4 ReactJS page displays all staff in the Load section, with their number of slots correct for each day, and the correct total for the week
- [v] ReactJS page prevents – or displays warning – when a staff member is in consecutive lunch slots on the same day.
- [v] ReactJS page prevents – or displays warning – when a staff member has more than 2 shifts per day
- [v] ReactJS page prevents – or displays warning – when a staff member has more than 7 shifts per week
- [v] ReactJS page prevents – or displays warning – when a staff member is selected to be in two places at once. (eg: UpStairs and Parking Lot)
- [v] ReactJS page allows randomised population of currently empty shifts, respecting the above rules. At this level, clearing all shifts should be supported too.
- [v] ReactJS page reports how many staff members are needed to fill all shifts, respecting the above rules.
- [v] ReactJS page stores current progress at the server (globally)
- [v] ReactJS page can retrieve current state when re-opened (globally)
- [v] ReactJS page supports undo/redo


## Folder Directory
```text
├─ client/                      # React folder
│  ├─ dist/                     # API, File name will be path
│  ├─ public/                   # Data for server
│  ├─ src/                      # Generate page from serverside
│  │  ├─ .eslintrc.cjs          # Eslint config.
│  │  ├─ assets/                # Assets (Videos, fonts ...)
├─ .gitignore                   # gitignore.
├─ index.mjs                    # Server main file
├─ package.json                 # Package.json
├─ README.md                    # README.md
```
