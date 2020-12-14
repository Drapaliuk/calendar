


class Calendar {
    constructor(container) {
        this.container = document.querySelector(container)
    }
    // container = document.querySelector('.container');
    currentMonth = 11;
    currentYear = 2020;
    weekDays = [ {fullName: 'Sunday', shortName: 'Sun'},
                {fullName: 'Monday', shortName: 'Mon'},
                {fullName: 'Tuesday', shortName: 'Tue'},
                {fullName: 'Wednesday', shortName: 'Wed'},
                {fullName: 'Thursday', shortName: 'Thur'},
                {fullName: 'Friday', shortName: 'Fri'},
                {fullName: 'Saturday', shortName: 'Sat'}
              ];
    monthsInfo = [
        {name: "January", days: 31},
        {name: "February", days: 28},
        {name: "March", days: 31},
        {name: "April", days: 30},
        {name: "May", days: 31},
        {name: "June", days: 30},
        {name: "July", days: 31},
        {name: "August", days: 31},
        {name: "September", days: 30},
        {name: "October", days: 31},
        {name: "November", days: 30},
        {name: "December", days: 31},
    ];
    DOMReferences = {
        year: null,
        monthName: null,
        monthWrapper: null,
        month: null,
    };


    computerDates () {

        const currentDate = new Date(this.currentYear, this.currentMonth); //поточна дата
        const currentMonth = currentDate.getMonth() //поточний місяць
        const previousMonth = new Date(currentDate.getFullYear(), (currentDate.getMonth() - 1)).getMonth() // попередні місяць (число)
        const lastDayOfTheCurrentMonth = new Date(currentDate.getFullYear(), currentMonth, this.monthsInfo[currentMonth].days).getDay(); // Oстанній день тижня поточного місяця (ПОРЯДКОВИЙ НОМЕР)
        const firstDayOfTheCurrentMonth = new Date(currentDate.getFullYear(), currentMonth, 1).getDay();

        const toShowDaysNextMonth = (7 - lastDayOfTheCurrentMonth) - 1;
        const toShowDaysPreviousMonth = firstDayOfTheCurrentMonth;
        const amountDatesForRender = toShowDaysPreviousMonth + this.monthsInfo[currentMonth].days + toShowDaysNextMonth

        const resultObj = {
        previousMonthDates: {
            from: this.monthsInfo[previousMonth].days - (toShowDaysPreviousMonth - 1),
            to: this.monthsInfo[previousMonth].days
        },
        currentMonthDates: {
            from: 1,
            to: this.monthsInfo[currentMonth].days
        },
        nextMonthDates: {
            from: 1,
            to: toShowDaysNextMonth
        },
        amountDatesForRender
        }

        return resultObj
    }

    


    DOMStructureCreator (dates = []) {
        const nextMonthHandler = this.nextMonthHandler.bind(this)
        const previousMonthHandler = this.previousMonthHandler.bind(this)

        const calendarWrapper = document.createElement('div')
        calendarWrapper.classList.add('calendar');
        
        const year = document.createElement('div')
        year.classList.add('year');
        year.textContent = this.currentYear;

        const monthName = document.createElement('div');
        monthName.classList.add('monthName');
        monthName.textContent = this.monthsInfo[this.currentMonth].name
        const weekDays = document.createElement('div');
        weekDays.classList.add('days');
        weekDays.append(...this.weekDays.map(day => {
            const dayElement = document.createElement('div')
            dayElement.textContent = day.shortName
            return dayElement;
        }))
        const monthWrapper = document.createElement('div')
        const month = document.createElement('div');
        monthWrapper.append(month);
        const nextMonthBtn = document.createElement('button');

        nextMonthBtn.textContent = 'next';

        nextMonthBtn.addEventListener('click', nextMonthHandler)

        const prevMonthBtn = document.createElement('button');
        prevMonthBtn.textContent = 'prev';
        prevMonthBtn.addEventListener('click', previousMonthHandler)




        month.classList.add('month');
        month.append(...dates);

        this.setDOMReferences(year, monthName, monthWrapper, month)
        calendarWrapper.append(...[year, monthName, weekDays, monthWrapper, prevMonthBtn, nextMonthBtn]);
        
        

        this.container.append(calendarWrapper)

    }

    createDates  (data) {
        const {
            previousMonthDates,
            currentMonthDates,
            nextMonthDates
        } = data;

        const monthDatesCreator = ({from = 31, to = 1}, isRemainderDates) => {
            if (!from) return [];
            const months = [];
        
            for (let i = from; i <= to; i++) {
                const date = document.createElement('div');
                isRemainderDates && date.classList.add('rest-days')
                date.textContent = i
                months.push(date)
            };
        
            return months
        };
        const dates = [
            ...monthDatesCreator(previousMonthDates, true),
            ...monthDatesCreator(currentMonthDates),
            ...monthDatesCreator(nextMonthDates, true)
        ];
    
        return dates
    }

    setDOMReferences (year, monthName, monthWrapper, month) {
        this.DOMReferences.year = year;
        this.DOMReferences.monthName = monthName;
        this.DOMReferences.monthWrapper = monthWrapper;
        this.DOMReferences.month = month;

    }

    changeDOMReference (DOMElement, newReference) {
        this.DOMReferences[DOMElement] = newReference;
    }

    getDOMReference (DOMElement) {
        return this.DOMReferences[DOMElement]
    }

    initialize () {
        if(this.isLeapYear) {
            this.monthsInfo[1].days = 29;
        }
        const computedMonths = this.computerDates();
        const dates = this.createDates(computedMonths);
        this.DOMStructureCreator(dates);
    }


    monthRerender () {
        this.DOMReferences.month.remove();
        const newMonth = document.createElement('div');
        newMonth.classList.add('month');
        this.changeDOMReference('month', newMonth);
        const dates = this.createDates(this.computerDates());
        newMonth.append(...dates);
        this.DOMReferences.monthWrapper.append(newMonth);
    }

    monthNameRerender () {
        const newName = this.monthsInfo[this.currentMonth].name;
        this.DOMReferences.monthName.textContent = newName;
    }



    nextMonthHandler () {
        this.monthIncrem();
        if(this.isLeapYear) {
            this.monthsInfo[1].days === 29;
        }
        
        if(+this.getDOMReference('year').textContent !== this.currentYear) {
            this.getDOMReference('year').textContent = this.currentYear
        };

        this.getDOMReference('month').remove()
        this.monthNameRerender();
        this.monthRerender();
    }

    previousMonthHandler () {
        this.monthDecrem();
        const isLeapYear = this.isLeapYear();
        if(+this.getDOMReference('year').textContent !== this.currentYear) {
            this.getDOMReference('year').textContent = this.currentYear
        };
        this.getDOMReference('month').remove()
        this.monthNameRerender();
        this.monthRerender();
    }

    monthIncrem () {
        if(this.currentMonth === 11) {
            this.yearIncrem()
            return this.currentMonth = 0;
        }

        return this.currentMonth++
    }

    monthDecrem () {
        if(this.currentMonth === 0) {
            this.yearDecrem()
            return this.currentMonth = 11;
        }

        return this.currentMonth--
    }

    isLeapYear () {
        return this.currentYear % 4 === 0
    }

    yearIncrem () {
        this.currentYear++
    }

    yearDecrem () {
        this.currentYear--
    }

    getYear () {
        return this.year
    }

    getMonth () {
        return this.month
    }

    setDate (dateRequest) {
        const {year, month, day} = dateRequest;

    }

    findDateHandler () {
        const handler = function(dateRequest) {
            setDate(dateRequest)
            console.log(this)
        }

        return handler.bind(this)
    }

}



const myCalendar = new Calendar('.container')
myCalendar.initialize();

const handler = myCalendar.findDateHandler()

console.log(handler())