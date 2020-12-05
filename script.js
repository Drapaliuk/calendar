const previousMonthBtn = document.querySelector('.previous-month-btn');
const nextMonthBtn = document.querySelector('.next-month-btn');
const calendarHeader = document.querySelector('.calendar__header');
const monthWrapper = document.querySelector('.month-wrapper');
const month = document.querySelector('.month')
const header = document.querySelector('.calendar__header')
console.log(header)
const monthsInfo = [
                      {name: "January", days: 31, diapason: {from: 1, to: 31}},
                      {name: "February", days: 29, diapason: {from: 32, to: 59}},
                      {name: "March", days: 31, diapason: {from: 60, to: 91}},
                      {name: "April", days: 30, diapason: {from: 92, to: 121}},
                      {name: "May", days: 31, diapason: {from: 122, to: 152}},
                      {name: "Juan", days: 30, diapason: {from: 153, to: 182}},
                      {name: "July", days: 31, diapason: {from: 183, to: 213}},
                      {name: "August", days: 31, diapason: {from: 214, to: 244}},
                      {name: "September", days: 30, diapason: {from: 245, to: 274}},
                      {name: "October", days: 31, diapason: {from: 275, to: 305}},
                      {name: "November", days: 30, diapason: {from: 306, to: 335}},
                      {name: "December", days: 31, diapason: {from: 336, to: 366}},
                    ];
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
let monthCounter = 0;

const serviceObj = {
    isFirstRender: false,
    linkToFirstMonth: null
}


const monthComputer = function(year, month) {
    const currentDate = new Date(year, month); //поточна дата
    const currentMonth = currentDate.getMonth() //поточний місяць
    const previousMonth = new Date(currentDate.getFullYear(), (currentDate.getMonth() - 1)).getMonth() // попередні місяць (число)
    const lastDayOfTheCurrentMonth = new Date(currentDate.getFullYear(), currentMonth, monthsInfo[currentMonth].days).getDay();        // Oстанній день тижня поточного місяця (ПОРЯДКОВИЙ НОМЕР)
    const firstDayOfTheCurrentMonth = new Date(currentDate.getFullYear(), currentMonth, 1).getDay();

    const toShowDaysNextMonth = (7 - lastDayOfTheCurrentMonth) - 1;
    const toShowDaysPreviousMonth = firstDayOfTheCurrentMonth;
    const amountDatesForRender = toShowDaysPreviousMonth + monthsInfo[currentMonth].days + toShowDaysNextMonth

    const resultObj = {
        previousMonthDates: {from: monthsInfo[previousMonth].days - (toShowDaysPreviousMonth - 1), to: monthsInfo[previousMonth].days },
        currentMonthDates: {from: 1, to: monthsInfo[currentMonth].days},
        nextMonthDates: {from: 1, to: toShowDaysNextMonth},
        amountDatesForRender
    }

    return resultObj
    
}



const monthDatesCreator = ({from = 31, to = 1}) => {
    if(!from) return [];
    const result = [];

    for(let i = from; i <= to; i++) {
        const date = document.createElement('div')
        date.textContent = i
        result.push(date)
    };

    return result
}



const createMonthElement = function(details, isFirstRender) {
    const {previousMonthDates, currentMonthDates, nextMonthDates, amountDatesForRender} = details;
    const dates = [...monthDatesCreator(previousMonthDates), ...monthDatesCreator(currentMonthDates), ...monthDatesCreator(nextMonthDates)]
    if(isFirstRender) {
        document.querySelector('.month').append(...dates)
        return
    }

    let month = document.createElement('div')
    month.classList.add('month')
    month.append(...dates);
    monthWrapper.append(month)
}


const refreshHeader = function() {
    header.textContent = monthsInfo[monthCounter].name
}

const renderMonth = function(isFirstRender) {
    createMonthElement(monthComputer(2020, monthCounter), isFirstRender)
}

const remover = function() {
    document.querySelector('.month').remove()
}

previousMonthBtn.addEventListener('click', () => {
    if(monthCounter === 0) return
    remover()
    refreshHeader()
    renderMonth()
    --monthCounter
})





nextMonthBtn.addEventListener('click', () => {
    if(monthCounter === 11) return
    remover()
    refreshHeader()
    renderMonth()

    ++monthCounter

})


    console.log('asdasd')
    refreshHeader()
    renderMonth(true)

