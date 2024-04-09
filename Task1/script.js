const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(document.getElementById("date-input").value);

    const birthDetails = {
        date: birthDate.getDate(),
        month: birthDate.getMonth() + 1,
        year: birthDate.getFullYear(),
    };

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
        alert("Not Born Yet");
        displayResult("-", "-", "-");
        return;
    }

    const { years, months, days } = calculateDifference(
        birthDetails,
        currentYear,
        currentMonth,
        currentDate
    );

    displayResult(days, months, years);
};

const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
    return (
        birthDetails.year > currentYear ||
        (birthDetails.year === currentYear &&
            (birthDetails.month > currentMonth ||
                (birthDetails.month === currentMonth &&
                    birthDetails.date > currentDate)))
    );
};

const calculateDifference = (birthDetails, currentYear, currentMonth, currentDate) => {
    let years = currentYear - birthDetails.year;
    let months, days;

    if (currentMonth < birthDetails.month) {
        years--;
        months = 12 - (birthDetails.month - currentMonth);
    } else {
        months = currentMonth - birthDetails.month;
    }

    if (currentDate < birthDetails.date) {
        months--;
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);
        days = daysInLastMonth - (birthDetails.date - currentDate);
    } else {
        days = currentDate - birthDetails.date;
    }
    return { years, months, days };
};

const getDaysInMonth = (month, year) => {
    const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month - 1];
};

const displayResult = (birthDate, birthMonth, birthYear) => {
    document.getElementById("years").textContent = birthYear;
    document.getElementById("months").textContent = birthMonth;
    document.getElementById("days").textContent = birthDate;
};

document.getElementById("calc-age-btn").addEventListener("click", calculateAge);

document.getElementById("date-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      calculateAge();
    }
});
