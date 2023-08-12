const COSTS = document.querySelectorAll('.cost');



const COSTS_ARR = [];

let result = 0;

// Собор всех цен в массив COSTS_ARR
for(let i = 0; i < COSTS.length; i = i + 1) {
    COSTS_ARR.push(COSTS[i].innerHTML);
}

// Помещение сегоднейшней даты в block
function getDateToday() {
    const TIME = document.querySelector('.time');
    const DATE = new Date();
    const MONTH = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
    const DATE_TODAY = DATE.getDate()+ " " + MONTH[DATE.getMonth()] + " " + DATE.getFullYear() + " года. ";

    TIME.textContent = DATE_TODAY;
}

getDateToday();

function clearForm () {
    const CLEAR_BUTTON = document.querySelector(".clear-button");
    const INPUT_QUANTITY = document.querySelectorAll('.input-quantity');

    CLEAR_BUTTON.addEventListener('click', function () {
        INPUT_QUANTITY.forEach(item => item.value = "0");
        getResult();
    
        calculateTotal();
        clearNotification()
    });

}

clearForm ();

function clearNotification() {
    alert("Введенные данные успешно удалены!");
}

function percentAddWorks() {
    const ADD_WORKS_INPUTS = document.querySelectorAll(".additional-works-input");
    let result = 1;

    ADD_WORKS_INPUTS.forEach(function (input) {
        const inputValue = parseInt(input.value) / 100;

        if (input.checked) result += inputValue;

        input.addEventListener('change', percentAddWorks)
    });

    addWorksCheck(COSTS, result);
    getResult();
    calculateTotal();
    return result;
}

percentAddWorks();

// Изменение значений масива в зависимости от коэффициента за дополнительные работы
function addWorksCheck(arr, value) {
    
    for(let i = 0; i < arr.length; i = i + 1) {
        let defaultCost = parseInt(COSTS_ARR[i]);
        arr[i].textContent = (defaultCost * value).toFixed(2);
    }
}

function changeQuantity () {
    const ROWS = document.querySelectorAll('.row');

    ROWS.forEach((row) => {
        row.addEventListener('change', function () {
            getResult();
            calculateTotal();
        });
    });
}

changeQuantity ()

function getResult() {
    const COSTS = document.querySelectorAll('.cost');
    const INPUT_QUANTITY = document.querySelectorAll('.input-quantity');
    const RESULT = document.querySelectorAll('.result');

    for(let i = 0; i < COSTS.length; i = i + 1) {
        let cost = parseInt(COSTS[i].innerHTML);
        let quantity = parseInt(INPUT_QUANTITY[i].valueAsNumber);
        let result = RESULT[i];

        result.textContent = multyplyRow(cost, quantity);
    }
}

function multyplyRow(cost, quantity) {
    return cost.toFixed(2) * quantity;
}

function calculateTotal() {
    const SUMMA = document.querySelector(".summa");
    const RESULT = document.querySelectorAll('.result');
    let total = 0;
    RESULT.forEach(result => total += parseFloat(result.textContent));
    return SUMMA.textContent = total;
}

function changeInput() {
    const INPUT = document.querySelectorAll('.input-quantity');

    INPUT.forEach((input) => {
        const up = input.nextElementSibling;
        const down = input.previousElementSibling;

        up.addEventListener('click', function () {
            input.stepUp();
            getResult();
            calculateTotal();
        });
        down.addEventListener('click', function () {
            input.stepDown();
            getResult();
            calculateTotal();
        });
    });
    
}

changeInput();