document.addEventListener("DOMContentLoaded", ready)

function ready() {
    const buttons = document.querySelectorAll(".test__btn");
    const selectBtn = document.querySelector("#selectBtn");
    const selectDay = document.querySelector("#day");
    const selectMonth = document.querySelector("#month");
    const selectYear = document.querySelector("#year");
    const selects = document.querySelectorAll(".select");
    const loader = document.querySelector(".loader__inner");
    const date = new Date();
    window.date = date;
    const questionNumberWrapper = document.querySelector(".test__questions-number");
    const microBtns = document.querySelectorAll('.pre-micro-btn');
    const callBtn = document.querySelector('.phoneCall__btn');

    // /* На случай, если блок с номером вопроса не должен двигаться */
    // const questionItems = document.querySelectorAll(".test__questions-item");

    // Функция для отображения следующего вопроса
    function showNextQuestion(el) {

        questionNumberWrapper.innerHTML = '';

        const block = document.getElementById(el.parentNode.id);
        const nextBlock = block.nextElementSibling;


        const numberOfQuestion = nextBlock.getAttribute('data-number');


        const numberHTML = document.createElement('p');
        numberHTML.classList.add('subtitle');
        numberHTML.innerHTML = `<span>Вопрос ${numberOfQuestion}-5</span>`;
        questionNumberWrapper.append(numberHTML);


        // /* На случай, если блок с номером вопроса не должен двигаться */
        // questionItems.forEach(item => {

        //     if (!item.classList.contains('height')) {
        //         item.classList.add('height')
        //     }
        // })



        block.classList.remove("active");
        nextBlock.classList.add("active");


        block.classList.remove("fadeIn");
        block.classList.add("fadeOut");
        nextBlock.classList.add("fadeIn");
    }

    buttons.forEach(function (item) {
        item.addEventListener("click", function () {
            showNextQuestion(this)
        })
    })


    selectBtn.addEventListener('click', function () {

        const dayValue = selectDay.options[selectDay.options.selectedIndex].value;
        const monthValue = selectMonth.options[selectMonth.options.selectedIndex].value;
        const yearValue = selectYear.options[selectYear.options.selectedIndex].value;

        const age = date.getFullYear() - yearValue;
        const middleAge = document.querySelector(".middleAge");
        const oldAge = document.querySelector(".oldAge");



        // Проверка value у select
        selects.forEach(function (select) {
            const selectValue = select.options[select.options.selectedIndex].value;

            if (dayValue == "" || monthValue == "" || yearValue == "") {
                selectValue == "" ? select.style.border = "1px solid red" : select.style.border = "1px solid transparent"
            } else {
                showNextQuestion(selectBtn)
                setTimeout(function () {
                    showNextQuestion(loader)
                }, 2000)
            }
        })

        // Проверка возраста для отображения нужного текста
        if (age >= 36 && age <= 45) {
            middleAge.classList.add("active")
        } else if (age > 36) {
            oldAge.classList.add("active")
        }


    })

    // Циклы для наполнения select
    for (i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        selectDay.appendChild(option)
    }

    for (i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        selectMonth.appendChild(option)
    }

    for (i = date.getFullYear() - 18; i >= date.getFullYear() - 100; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        selectYear.appendChild(option)
    }

    // Кнопки перед блоком с микрофоном
    microBtns.forEach(function (btn) {
        const micro = document.querySelector('.micro__inner');
        const dateText = document.querySelector('.phoneCall__partText');
        // Узнаём день и месяц
        const days = date.getDate() + 1;
        const months = date.getMonth() + 1;

        // Функция для проверки значения дня и месяца, если меньше 10, то сначала будет отображаться 0
        function formatTime(elem) {
            return elem < 10 ? `0${elem}` : elem;
        }

        btn.addEventListener('click', function () {

            // Убираем блок с номерами вопросов
            questionNumberWrapper.classList.add('disabled');

            // Генерируем текст для последнего блока с датой
            dateText.innerText = "";
            dateText.innerText = `Первое значимое событие может произойти уже ${formatTime(days)}.${formatTime(months)}.${date.getFullYear()}, `


            // Скрипт для progressBar
            var bar = new ProgressBar.Line(micro, {
                strokeWidth: 4,
                easing: 'easeInOut',
                duration: 5000,
                color: '#F6c866',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: { width: '100%', height: '100%', borderRadius: '5px' },
                text: {
                    style: {
                        // Text color.
                        // Default: same as stroke color (options.color)
                        color: '#999',
                        fontSize: '20px',
                        position: 'absolute',
                        right: '167px',
                        top: '40px',
                        padding: 0,
                        margin: 0,
                        transform: null
                    },
                    autoStyleContainer: false
                },
                from: { color: '#F6c866' },
                to: { color: '#F6c866' },
                step: (state, bar) => {
                    bar.setText(Math.round(bar.value() * 100) + ' %');
                }
            });

            bar.animate(1.0);

            if (window.innerWidth <= 630) {
                bar.text.style.right = "97px"
            }

            setTimeout(function () {
                showNextQuestion(micro)
            }, 5000)
        })

    })


    // Для анимаций
    const animItems = document.querySelectorAll(".animItems")

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll(params) {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemPoint > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active');
                } else {
                    animItem.classList.remove('_active')
                }

                // Отображение текста в footer

                if (document.querySelector(".secondText").classList.contains('_active')) {
                    document.querySelector(".firstText").classList.add('disabled')
                } else {
                    document.querySelector(".firstText").classList.remove('disabled')
                }

            }
        }

        // Вычисление расстояния элемента

        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
    }

    // При клике на кнопку звонка
    callBtn.addEventListener('click', function () {

        const xhr = new XMLHttpRequest();
        xhr.onload = onLoad;
        xhr.onerror = () => {
            console.log(xhr.response)
        };
        xhr.responseType = 'json';
        xhr.open("GET", "https://swapi.dev/api/people/1/", true);
        xhr.send();


        // Для заполнения модалки
        function onLoad() {
            const { name, eye_color, hair_color, height, mass, skin_color } = xhr.response;
            document.querySelector(".modal__info").innerHTML = `<p class="modal__name modal__text">Имя: ${name}</p>
            <p class="modal__mass modal__text">Вес: ${mass}</p>
            <p class="modal__height modal__text">Рост: ${height}</p>
            <p class="modal__eyeColor modal__text">Цвет глаз: ${eye_color}</p>
            <p class="modal__hairColor modal__text">Цвет волос: ${hair_color}</p>
            <p class="modal__skinColor modal__text">Цвет кожи: ${skin_color}</p>`
        }




        document.querySelector(".modal-wrapper").classList.remove('disabled');
        document.querySelector("body").classList.add('modal-open');


        document.querySelector(".modal").classList.remove('modalDissapear');
        document.querySelector(".modal").classList.add('modalAppear');
    });

    // Для закрытия модалки
    document.querySelector(".modal__close").addEventListener('click', function () {
        document.querySelector(".modal").classList.remove('modalAppear');
        document.querySelector(".modal").classList.add('modalDissapear');

        // Для анимации исчезания модалки
        setTimeout(function () {
            document.querySelector(".modal-wrapper").classList.add('disabled');
        }, 700)

        document.querySelector("body").classList.remove('modal-open');
    })
}

