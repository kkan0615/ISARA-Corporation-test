import { useEffect, useMemo, useState } from 'react'
import { Days, Staffs, Works } from './data.js'
import './App.css'

function App() {
  /** Shift */
  const [shifts, setShifts] = useState([])
  /** Edit mode status */
  const [isEditMode, setIsEditMode] = useState(false)

  const [undo, setUndo] = useState(null)
  const [redo, setRedo] = useState(null)

  useEffect(() => {
    initData()
      .catch(console.error)
  }, [])

  /**
   * Initialize saved shift
   */
  const initData = async () => {
    const res = await fetch('/api/load')
    const resJson = await res.json()
    setShifts(resJson?.data || [])
  }

  /**
   * Work: { day: { test: 'test } }
   * @type {{}}
   */
  const staffAndWorkMap = useMemo(() => {
    if (!shifts.length) return {}

    const result = {}
    shifts.map(shiftEl => {
      if (!result[shiftEl.staff]) result[shiftEl.staff] = {}
      result[shiftEl.staff][shiftEl.day] = shiftEl.work
    })

    return result
  }, [shifts])

  const worksAndStaffMap = useMemo(() => {
    if (!shifts.length) return {}

    const result = {}
    shifts.map(shiftEl => {
      if (!result[shiftEl.work]) result[shiftEl.work] = {}
      result[shiftEl.work][shiftEl.day] = shiftEl.staff
      console.log('shiftEl.day', shiftEl.day)
    })

    return result
  }, [shifts])

  const clearShift = () => {
    setUndo(null)
    setRedo(null)
    setShifts([])
  }

  const handleScheduleChange = (event, work, day) => {
    const staff = event.target.value
    const newShifts = [...shifts]
    // Remove previous Staff
    const prevStaff = worksAndStaffMap[work]?.[day]
    const foundPrevIndex = shifts.findIndex(shiftEl => shiftEl.staff === prevStaff && shiftEl.day === day && shiftEl.work === work)
    if (foundPrevIndex !== -1) {
      newShifts.splice(foundPrevIndex, 1)
    }
    const newShift = staff ? {
      staff,
      day,
      work,
    } : {}
    setUndo({
      prev: shifts[foundPrevIndex],
      new: newShift,
    })
    // reset redo
    setRedo(null)
    if (staff) {
      newShifts.push(newShift)
    }
    setShifts(newShifts)
    // changeShifts({ work, staff, day })
  }

  const handleLoadChange = (event, staff, day) => {
    const work = event.target.value
    const newShifts = [...shifts]
    // Remove previous work
    const prevWork = staffAndWorkMap[staff]?.[day]
    const foundPrevIndex = shifts.findIndex(shiftEl => shiftEl.work === prevWork && shiftEl.day === day && shiftEl.staff === staff)
    if (foundPrevIndex !== -1) {
      newShifts.splice(foundPrevIndex, 1)
    }
    const newShift = work ? {
      staff,
      day,
      work,
    } : {}
    setUndo({
      prev: shifts[foundPrevIndex],
      new: newShift,
    })
    // reset redo
    setRedo(null)
    if (work) {
      newShifts.push(newShift)
    }
    setShifts(newShifts)
  }

  /**
   * Change to edit mode
   */
  const openEditMode = () => {
    setIsEditMode(true)
  }

  /**
   * Save current state of shift
   * @return {Promise<void>}
   */
  const saveShift = async () => {
    await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ shifts, })
    })

    setIsEditMode(false)
  }

  /**
   * Undo
   */
  const handleUndo = () => {
    const newShifts = [...shifts]
    // Remove new data
    const foundNewIndex = shifts.findIndex(shiftEl => shiftEl.work === undo.new.work && shiftEl.day === undo.new.day && shiftEl.staff === undo.new.staff)
    console.log('foundNewIndex', foundNewIndex)
    if (foundNewIndex !== -1) {
      newShifts.splice(foundNewIndex, 1)
    }

    if (undo.prev) {
      newShifts.push(undo.prev)
    }
    setRedo(undo)
    // reset undo
    setUndo(null)
    setShifts(newShifts)
  }

  /**
   * Redo
   */
  const handleRedo = () => {
    const newShifts = [...shifts]
    // Remove previous data
    const foundPrevIndex = shifts.findIndex(shiftEl => shiftEl.work === redo.prev.work && shiftEl.day === redo.prev.day && shiftEl.staff === redo.prev.staff)
    if (foundPrevIndex !== -1) {
      newShifts.splice(foundPrevIndex, 1)
    }

    if (redo.new) {
      newShifts.push(redo.new)
    }
    setUndo(redo)
    // reset redo
    setRedo(null)
    setShifts(newShifts)
  }

  return (
    <div>
      {/* Actions */}
      <div>
        <button
          type='button'
          onClick={clearShift}
        >
          Clear shift
        </button>
        <button
          type='button'
          onClick={isEditMode ? saveShift : openEditMode}
        >
          { isEditMode ? 'Save' : 'Edit' }
        </button>
        {!!undo &&
          <button
            type='button'
            onClick={handleUndo}
          >
            undo
          </button>
        }
        {!!redo &&
          <button
            type='button'
            onClick={handleRedo}
          >
            redo
          </button>
        }
      </div>
      <div>
        staffAndWorkMap
        {JSON.stringify(staffAndWorkMap, null, 2)}
      </div>
      <div>
        worksAndStaffMap
        {JSON.stringify(worksAndStaffMap, null, 2)}
      </div>
      <div>
        shifts
        {JSON.stringify(shifts, null, 2)}
      </div>
      <div>
        undo
        {JSON.stringify(undo, null, 2)}
      </div>
      <div>
        redo
        {JSON.stringify(redo, null, 2)}
      </div>
      {/* Schedule section */}
      <section>
        <h2>
          Schedule
        </h2>
        <table border={1}>
          <thead>
          <tr>
            <th />
            { Days.map(dayEl => (
              <th key={ dayEl }>{ dayEl }</th>
            )) }
          </tr>
          </thead>
          <tbody>
            { Works.map(workEl => (
              <tr key={ workEl }>
                <td> { workEl }</td>
                { Days.map(dayEl => (
                  <td key={ dayEl }>
                    { isEditMode ?
                      <select
                        value={worksAndStaffMap[workEl]?.[dayEl] || ''}
                        onChange={(event) => handleScheduleChange(event, workEl, dayEl)}
                        name={workEl}
                      >
                        <option value=''></option>
                        { Staffs.map(staffEl => (
                          <option
                            key={ staffEl }
                            value={ staffEl }
                            disabled={ shifts.find(shiftEl => shiftEl.staff === staffEl && shiftEl.day === dayEl) }
                          >
                            { staffEl }
                          </option>
                        )) }
                      </select> :
                      worksAndStaffMap[workEl]?.[dayEl] || '' }
                  </td>
                )) }
              </tr>
            )) }
          </tbody>
        </table>
      </section>
      {/* Load section */}
      <section>
        <h2>
          Load
        </h2>
        <table border={1}>
          <thead>
            <tr>
              <th />
              { Days.map(dayEl => (
                <th key={ dayEl }>{ dayEl }</th>
              )) }
              <th>
                Totals
              </th>
            </tr>
          </thead>
          <tbody>
          { Staffs.map(staffEl => (
            <tr key={ staffEl }>
              <td> { staffEl }</td>
              { Days.map(dayEl => (
                <td key={ dayEl }>
                  { isEditMode ?
                    <select
                      value={staffAndWorkMap[staffEl]?.[dayEl] || ''}
                      onChange={(event) => handleLoadChange(event, staffEl, dayEl)}
                      name={staffEl}
                    >
                      <option value=''></option>
                      { Works.map(workEl => (
                        <option
                          key={ workEl }
                          value={ workEl }
                          disabled={ shifts.find(shiftEl => shiftEl.work === workEl && shiftEl.day === dayEl) }
                        >
                          { workEl }
                        </option>
                      )) }
                    </select> :
                    staffAndWorkMap[staffEl]?.[dayEl] || ''
                  }
                </td>
              )) }
              <td width='250px'>{ Object.values(staffAndWorkMap[staffEl] || []).join(', ') }</td>
            </tr>
          )) }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App
