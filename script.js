


class Calendar {
    constructor(container) {
        this.container = document.querySelector(container)
    };

    actualDate = {
        year: null,
        month: null,
        date: null
    };



    selectedDiapason = {
                        from: {year: null, month: null, date: null},
                        to: {year: null, month: null, date: null},
                        };

    currentMonth = null;
    currentYear = null;
    currentDate = null;

    weekDays = [{fullName: 'Sunday', shortName: 'Sun'},
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

    CONSTANT_PREVIOUS_MONTH = 'previous-month';
    CONSTANT_CURRENT_MONTH = 'current-month';
    CONSTANT_NEXT_MONTH = 'next-month';



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

    

    diapasonSelectHandler (event) {
        const date = event.target;
        const dateBelonging = date.dataset.belonging;
        const dateValue = Number(date.textContent);
        
        let clickCounter = 0;
        console.log(clickCounter)
        if(dateBelonging === this.CONSTANT_PREVIOUS_MONTH) {
            if(clickCounter === 0) {
                const diapasonValue = {
                    year: this.currentYear,
                    month: this.currentMonth - 1,
                    date: dateValue
                };

                this.selectedDiapason.from = diapasonValue
            }

            if(clickCounter === 1) {
                const diapasonValue = {
                    year: this.currentYear,
                    month: this.currentMonth - 1,
                    date: dateValue
                };

                this.selectedDiapason.to = diapasonValue
            }
            return clickCounter++

        }

        if(dateBelonging === this.CONSTANT_CURRENT_MONTH) {

            if(clickCounter === 0) {
                const diapasonValue = {
                    year: this.currentYear,
                    month: this.currentMonth,
                    date: dateValue
                };

                this.selectedDiapason.from = diapasonValue

            }

            if(clickCounter === 1) {
                const diapasonValue = {
                    year: this.currentYear,
                    month: this.currentMonth,
                    date: dateValue
                };

                this.selectedDiapason.to = diapasonValue
            }
            return clickCounter++

        }

        if(dateBelonging === this.CONSTANT_NEXT_MONTH) {

            if(clickCounter === 0) {
                const diapasonValue = {
                    year: this.currentYear,
                    month: this.currentMonth + 1,
                    date: dateValue
                };

                this.selectedDiapason.from = diapasonValue
            }

            if(clickCounter === 1) {
                const diapasonValue = {
                    year: this.currentYear,
                    month: this.currentMonth + 1,
                    date: dateValue
                };

                this.selectedDiapason.to = diapasonValue
            }
            return clickCounter++

        }

        console.log(this.selectedDiapason)
    }


    DOMStructureCreator (dates = []) {
        const nextMonthHandler = this.nextMonthHandler.bind(this)
        const previousMonthHandler = this.previousMonthHandler.bind(this)
        const diapasonSelectHandler = this.diapasonSelectHandler.bind(this);

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
        monthWrapper.addEventListener('click', diapasonSelectHandler)
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


        const monthDatesCreator = ({from = 31, to = 1}, isRemainderDates, belongingToMonth) => {
            if (!from) return [];
            const months = [];
        
            for (let i = from; i <= to; i++) {
                const isToday = this.actualDate.year === this.currentYear &&
                            this.actualDate.month === this.currentMonth &&
                            this.actualDate.date === i
                const date = document.createElement('div');
                date.textContent = i
                date.classList.add('calendar__day')
                date.setAttribute('data-belonging', belongingToMonth)

                if(isToday){
                    date.classList.add('calendar__day_today')
                    months.push(date)
                    continue
    
                }
                if(isRemainderDates) {
                    date.classList.add('calendar__day_remainder_day')
                }


                months.push(date)
            };
        
            return months
        };
        const dates = [
            ...monthDatesCreator(previousMonthDates, true, 'previous-month'),
            ...monthDatesCreator(currentMonthDates, false, 'current-month'),
            ...monthDatesCreator(nextMonthDates, true, 'next-month')
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

    _initializeDates () {
        const actualFullDate = new Date(Date.now());

        this.actualDate.year = actualFullDate.getFullYear();
        this.actualDate.date = actualFullDate.getDate();
        this.actualDate.month = actualFullDate.getMonth();

        this.currentYear = actualFullDate.getFullYear();
        this.currentDate = actualFullDate.getDate();
        this.currentMonth = actualFullDate.getMonth();
    }

    initialize () {
        this._initializeDates();
        this.isLeapYear()
       
        const computedMonths = this.computerDates();
        const dates = this.createDates(computedMonths);
        this.DOMStructureCreator(dates);
    }

    yearRerender () {
        return this.getDOMReference('year').textContent = this.currentYear
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

    wasChangedYear () {
        const wasChangedYear = +this.getDOMReference('year').textContent !== this.currentYear;
        if(wasChangedYear) {
            this.yearRerender();
        };

        return wasChangedYear;
    }

    nextMonthHandler () {
        this.monthIncrem();
        this.isLeapYear();
        this.wasChangedYear();
        this.getDOMReference('month').remove()
        this.monthNameRerender();
        this.monthRerender();
    }

    previousMonthHandler () {
        this.monthDecrem();
        this.isLeapYear();
        this.wasChangedYear();
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
        const LEAP_YEAR_FEBRUARY_DAYS = 29;
        const REGULAR_YEAR_FEBRUARY_DAYS = 28;
        const February = this.monthsInfo[1];

        const isLeapYear = this.currentYear % 4 === 0;

        if(isLeapYear) {
            February.days = LEAP_YEAR_FEBRUARY_DAYS;
        } else {
            February.days = REGULAR_YEAR_FEBRUARY_DAYS;
        }

        return isLeapYear
    }

    yearIncrem () {
        this.currentYear++
    }

    yearDecrem () {
        this.currentYear--
    }

    getCurrentYear () {
        return function() {
            return this.currentYear;
        }.bind(this)
    }

    getCurrentMonth () {
        return function() {
            return this.currentMonth;
        }.bind(this)
    }

    setDate (dateRequest) {
        const {year, month, day} = dateRequest;
        this.currentYear = year;
        this.currentMonth = month;
        this.yearRerender()
        this.monthNameRerender()
        this.monthRerender()
    }

    dateRequest(dateRequest) {
        console.log(dateRequest)
        this.setDate(dateRequest)
    }

    getHandlers () {
        return {
            previousMonth: this.previousMonthHandler.bind(this),
            nextMonth: this.nextMonthHandler.bind(this),
            dateRequest: this.dateRequest.bind(this),
        }
    }
}



const myCalendar = new Calendar('.container')
myCalendar.initialize();



const days = document.querySelectorAll('.calendar__day');
console.log(days[0].dataset.role)