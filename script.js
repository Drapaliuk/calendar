const previousMonthBtn = document.querySelector('.previous-month-btn');
const nextMonthBtn = document.querySelector('.next-month-btn');
const calendarHeader = document.querySelector('.calendar__header');
const monthWrapper = document.querySelector('.month-wrapper');
const month = document.querySelector('.month');
const header = document.querySelector('.calendar__header');
const year = document.querySelector('.calendar__year');


let yearCounter = 2020;
const monthsInfo = [
                      { name: "January", days: 31 },
                      { name: "February", days: 29 },
                      { name: "March", days: 31 },
                      { name: "April", days: 30 },
                      { name: "May", days: 31 },
                      { name: "Juan", days: 30 },
                      { name: "July", days: 31 },
                      { name: "August", days: 31 },
                      { name: "September", days: 30 },
                      { name: "October", days: 31 },
                      { name: "November", days: 30 },
                      { name: "December", days: 31 },
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



const monthDatesCreator = ({from = 31, to = 1}, isRestDays) => {
    if(!from) return [];
    const result = [];

    for(let i = from; i <= to; i++) {
        const date = document.createElement('div');
        isRestDays && date.classList.add('rest-days')
        date.textContent = i
        result.push(date)
    };

    return result
}



const createMonthElement = function(details, isFirstRender) {
    const {previousMonthDates, currentMonthDates, nextMonthDates, amountDatesForRender} = details;
    const dates = [ 
                    ...monthDatesCreator(previousMonthDates, true),
                    ...monthDatesCreator(currentMonthDates),
                    ...monthDatesCreator(nextMonthDates, true)
                  ]
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
    if(monthCounter === -1) {
        header.textContent = monthsInfo[0].name
    }
    header.textContent = monthsInfo[monthCounter].name
}

const refreshYear = () => {
    year.textContent = yearCounter;
}

const renderMonth = function(isFirstRender) {
    createMonthElement(monthComputer(2020, monthCounter), isFirstRender)
}

const remover = function() {
    document.querySelector('.month').remove()
}

previousMonthBtn.addEventListener('click', () => {
    console.log('From handler',monthCounter)
    if(monthCounter === -1 || firstRender) {
        yearCounter--
        monthCounter = 11
        setTimeout(() => {
            remover()
            refreshYear()
            refreshHeader()
            renderMonth()
        }, 0)
        
        return
    }


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
console.log('From doc',monthCounter)

    refreshHeader()
    refreshYear()
    renderMonth(true)

