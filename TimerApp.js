const { createApp, ref, onMounted, onUnmounted } = Vue;

createApp({
    template: `
          <div class="timer-container">
          <h3 v-if="countdown">До начала мероприятия</h3>
          <h3 v-if="countdown">{{ countdown }}</h3>
          <h3 v-if="eventStatusMessage === 'Событие началось'">Событие началось</h3>
          <h3 v-if="eventStatusMessage === 'Событие завершилось'">Событие завершилось</h3>
          </div>
        `,
    setup() {
        const countdown = ref('');
        const eventStatusMessage = ref('');
        let intervalId;
        const regBtnRef = ref(null);
        const regBlock = ref(null);

        const calculateCountdown = () => {
            const startDate = new Date('2025-02-12T09:30:00').getTime();
            const endDate = new Date('2025-02-13T16:00:00').getTime();
            const now = new Date().getTime();

            if (now > endDate) {
                eventStatusMessage.value = 'Событие завершилось';
                clearInterval(intervalId);
                countdown.value = '';
                // Скрываем элемент
                if (regBtnRef.value && regBlock.value){
                    regBtnRef.value.style.display = 'none';
                    regBlock.value.style.display = 'none';
                }
                return;
            }

            if (now >= startDate && now <= endDate) {
                eventStatusMessage.value = 'Событие началось';
                clearInterval(intervalId);
                countdown.value = '';
                return;
            }

            const difference = startDate - now;

            if (difference <= 0) {
                countdown.value = '';
                eventStatusMessage.value = 'Событие началось';
                clearInterval(intervalId);
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            countdown.value = `${days} дн. ${hours} ч. ${minutes} мин. ${seconds} сек.`;
        };

        onMounted(() => {
            calculateCountdown();
            intervalId = setInterval(calculateCountdown, 1000);
            regBtnRef.value = document.getElementById('reg-btn');
            regBlock.value = document.getElementById('block-registration');
        });

        onUnmounted(() => {
            clearInterval(intervalId);
        });

        return {countdown, eventStatusMessage, regBtnRef};
    },
    style: `
        .timer-container{
          text-align: center;
        }
      `,
}).mount("#timer");