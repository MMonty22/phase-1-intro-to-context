// Your code here

function createEmployeeRecord (array) {
    const employeeObj = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
    return employeeObj
}

function createEmployeeRecords (array) {
    return array.map(employeeInfo => createEmployeeRecord(employeeInfo))
}

function createTimeInEvent (recordObj, dateStamp) {
    let dateTimeArray = dateStamp.split(' ')
    //console.log('dateTimeArray', dateTimeArray)
    let timeInRecord = {
        type: 'TimeIn',
        hour: parseInt(dateTimeArray[1], 10),
        date: dateTimeArray[0]
    }    
    recordObj.timeInEvents.push(timeInRecord)
    return recordObj
}

function createTimeOutEvent (recordObj, dateStamp) {
    let dateTimeArray = dateStamp.split(' ')
    //console.log('dateTimeArray', dateTimeArray)
    let timeOutRecord = {
        type: 'TimeOut',
        hour: parseInt(dateTimeArray[1], 10),
        date: dateTimeArray[0]
    }    
    recordObj.timeOutEvents.push(timeOutRecord)
    return recordObj
}

function hoursWorkedOnDate (recordObj, dateStamp) {
    const timeIn = recordObj.timeInEvents.find(element => element.date === dateStamp)
    const timeOut = recordObj.timeOutEvents.find(element => element.date === dateStamp)
    return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate (recordObj, dateStamp) {
    return recordObj.payPerHour * hoursWorkedOnDate(recordObj, dateStamp)
}

function allWagesFor (recordObj) {
    const timeIn = recordObj.timeInEvents.map(element => element.date)
        let total = timeIn.reduce((previousValue, currentValue) => {
            //console.log('prev', previousValue)
            //console.log('current', currentValue)
        return previousValue + wagesEarnedOnDate(recordObj, currentValue)
    },0)
    return total
}

function calculatePayroll (employeeRecordsArray) {
    //console.log('employeeArray', employeeRecordsArray)
    const timeIn = employeeRecordsArray.map(element => {
        //console.log('employeeInfoTimeIn', element.timeInEvents)
        for (let i = 0; i < element.timeInEvents.length; i++) {
            console.log('element.timeInEvents[i]',element.timeInEvents[i].date)
            return element.timeInEvents[i].date.reduce((previousValue, currentValue) => {
                return previousValue + wagesEarnedOnDate(employeeRecordsArray, currentValue)
            }, 0)
        }
    })
}