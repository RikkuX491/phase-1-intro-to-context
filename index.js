function createEmployeeRecord(employeeDataArray){
    return {
        firstName: employeeDataArray[0],
        familyName: employeeDataArray[1],
        title: employeeDataArray[2],
        payPerHour: employeeDataArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfEmployeeDataArrays){
    return arrayOfEmployeeDataArrays.map(createEmployeeRecord)
}

// createTimeEvent is a helper function that is called from createTimeInEvent and createTimeOutEvent
function createTimeEvent(employeeRecordObject, dateStamp, eventType){
    const [date, hour] = dateStamp.split(' ')
    
    const timeEvent = {
        type: eventType,
        hour: Number(hour),
        date: date
    }

    if(eventType === 'TimeIn'){
        employeeRecordObject.timeInEvents.push(timeEvent)
    }
    else{
        employeeRecordObject.timeOutEvents.push(timeEvent)
    }
    return employeeRecordObject
}

function createTimeInEvent(employeeRecordObject, dateStamp){
    return createTimeEvent(employeeRecordObject, dateStamp, 'TimeIn')
}

function createTimeOutEvent(employeeRecord, dateStamp){
    return createTimeEvent(employeeRecord, dateStamp, "TimeOut")
}

function hoursWorkedOnDate(employeeRecordObject, date){
    const timeInEventForDate = employeeRecordObject.timeInEvents.find(timeInEvent => {
        return timeInEvent.date === date
    })
    const timeOutEventForDate = employeeRecordObject.timeOutEvents.find(timeOutEvent => {
        return timeOutEvent.date === date
    })
    const numberHours = Math.abs(timeInEventForDate.hour - timeOutEventForDate.hour)
    const stringHours = numberHours.toString()
    return Number(stringHours.slice(0, stringHours.length - 2))
}

function wagesEarnedOnDate(employeeRecordObject, date){
    return hoursWorkedOnDate(employeeRecordObject, date) * employeeRecordObject.payPerHour
}

function allWagesFor(employeeRecordObject){
    const timeEvents = [...employeeRecordObject.timeInEvents, ...employeeRecordObject.timeOutEvents]
    const dates = timeEvents.map(timeEvent => {
        return timeEvent.date
    })
    const uniqueDates = Array.from(new Set(dates))
    const totalWages = uniqueDates.reduce((accumulator, date) => {
        return accumulator + wagesEarnedOnDate(employeeRecordObject, date)
    }, 0)
    return totalWages
}

function calculatePayroll(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce((accumulator, employeeRecordObject) => {
        return accumulator + allWagesFor(employeeRecordObject)
    }, 0)
}

const items = [
    {
        "name": "apple",
        "price": 4.99
    },
    {
        "name": "banana",
        "price": 0.99
    },
    {
        "name": "broomstick",
        "price": 12.00
    }
]

const totalPrice = items.reduce((accumulator, item) => {
    return accumulator + item.price
}, 0)

const dateSet = new Set()
dateSet.add("2024-11-20")
dateSet.add("2024-11-21")
dateSet.add("2024-11-20")
console.log(dateSet)

dateSet.forEach(date => {
    console.log(date)
})
console.log(Array(dateSet))