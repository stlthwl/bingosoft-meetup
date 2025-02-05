const {createApp} = Vue;

const RegistrationForm = {
    template: `
          <div class="container-fluid footer">
          <div class="row contact" id="block-registration">
            <div class="col-md-6 contact-form">
              <h3 class="content-ct"><span class="ti-email"></span> Регистрация</h3>
              
              <div v-if="submitted && !error" class="alert alert-success">
                {{ message }}
              </div>
              <div v-if="!submitted && error" class="alert alert-danger">
                {{ message }}
              </div>
              
              <form @submit.prevent="submitForm" class="form-horizontal" data-toggle="validator" role="form">
                <div class="form-group" v-for="(field, index) in fields" :key="index">
                  <label :for="field.id" class="col-sm-3 control-label">{{ field.label }}<sup>*</sup></label>
                  <div class="col-sm-9">
                    <input
                        type="text"
                        class="form-control"
                        :id="field.id"
                        v-model="formData[field.id]"
                        :placeholder="field.placeholder"
                        :required="field.required"
                        :readonly="field.id === 'telegram_id'"
                    />
                    <div class="help-block with-errors pull-right"></div>
                    <span class="form-control-feedback" aria-hidden="true"></span>
                  </div>
                </div>
                <div class="pull-right form-check form-switch checkbox-group">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="firstDayInPerson"
                      v-model="formData['firstDayInPerson']"
                    > 
                    <label class="form-check-label" for="firstDayInPerson">Первый день, буду очно</label>
                  </div>
                  
                  <div v-if="formData.firstDayInPerson" class="form-check">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="firstDayOfficeObserve"
                      v-model="formData['firstDayOfficeObserve']"
                    > 
                    <label class="form-check-label" for="firstDayOfficeObserve">Хочу посмотреть офис</label>
                  </div>
                  
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="secondDayRace"
                      v-model="formData['secondDayRace']"
                    > 
                    <label class="form-check-label" for="secondDayRace">Второй день, гонка</label>
                  </div>
                  
                  <div v-if="formData.secondDayRace" class="form-check">
                      <input 
                        class="form-check-input" 
                        type="checkbox" 
                        name="flexRadioDefault" 
                        id="pilot"
                        v-model="formData['pilot']"
                        @change="togglePilot"
                      >
                      <label class="form-check-label" for="pilot">
                        Пилот
                      </label>
                    </div>
                    <div v-if="formData.secondDayRace" class="form-check">
                      <input 
                        class="form-check-input" 
                        type="checkbox" 
                        name="flexRadioDefault" 
                        id="fan"
                        v-model="formData['fan']" 
                        @change="toggleFan"
                        checked>
                      <label class="form-check-label" for="fan">
                        Болельщик
                      </label>
                    </div>
                    
                    <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="checkbox" 
                      id="secondDayPicnic"
                      v-model="formData['secondDayPicnic']"
                    > 
                    <label class="form-check-label" for="secondDayPicnic">Второй день, пикник</label>
                    </div>
                    
                    <div v-if="formData.secondDayPicnic" class="form-check">
                      <input 
                        class="form-check-input" 
                        type="checkbox" 
                        name="flexRadioDefault" 
                        id="masterClass"
                        v-model="formData['masterClass']"
                      >
                      <label class="form-check-label" for="masterClass">
                        Пойду на мастер-класс
                      </label>
                    </div>
                    <div v-if="formData.secondDayPicnic" class="form-check">
                      <input 
                        class="form-check-input" 
                        type="checkbox" 
                        name="flexRadioDefault" 
                        id="sauna"
                        v-model="formData['sauna']" 
                        checked>
                      <label class="form-check-label" for="sauna">
                        Бронирую баню
                      </label>
                    </div>
                 
                </div>
                
                <div class="form-check">
                  <div class="col-sm-offset-3 col-sm-9">
                    <button
                        v-if="!submitted"
                        type="button"
                        @click="handleButtonClick"
                        @touch="handleButtonClick"
                        class="btn btn-yellow pull-right"
                        id="submit_btn">
                      Отправить
                      <span class="ti-arrow-right"></span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="row footer-credit">
            <div class="col-md-6 col-sm-6">
              <p><a target="_blank" href="https://bingosoft.ru">БИНГО-СОФТ</a> | 2025 </p>
            </div>
          </div>
          </div>
        `,
    data() {
        return {
            formData: {
                telegram_id: '',
                name: '',
                surname: '',
                organization: '',
                position: '',
                firstDayInPerson: false,
                firstDayOfficeObserve: false,
                secondDayRace: false,
                pilot: false,
                fan: false,
                secondDayPicnic: false,
                masterClass: false,
                sauna: false,
            },
            fields: [
                {id: 'telegram_id', label: 'telegram_id', placeholder: 'telegram_id', required: false},
                {id: 'name', label: 'Имя', placeholder: 'Имя', required: true},
                {id: 'surname', label: 'Фамилия', placeholder: 'Фамилия', required: true},
                {id: 'organization', label: 'Организация', placeholder: 'Организация', required: true},
                {id: 'position', label: 'Должность', placeholder: 'Должность', required: true},
            ],
            submitted: false,
            error: false,
            message: '',
        };
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        const telegramId = urlParams.get('telegram_id');
        if (telegramId) {
            this.formData.telegram_id = telegramId;
        }
    },
    methods: {
        togglePilot() {
            if (this.formData.pilot) {
                this.formData.fan = false;
            }
        },
        toggleFan() {
            if (this.formData.fan) {
                this.formData.pilot = false;
            }
        },
        handleButtonClick() {
            this.submitForm(); // Вызов метода отправки формы
        },
        async submitForm() {
            // Проверка на заполненность обязательных полей
            if (!this.formData.name || !this.formData.surname || !this.formData.organization || !this.formData.position) {
                this.submitted = false;
                this.error = true;
                this.message = 'Пожалуйста, заполните все обязательные поля';
                return;
            }

            window.tg_id = this.formData.telegram_id
            console.log('telegram_id', this.formData.telegram_id)
            if (this.formData.telegram_id === '') {
                this.submitted = false;
                this.error = true;
                this.message = 'Не удалось определить telegram_id. Запустите бот @bingosoft_msk.'
                return;
            }

            try {
                // Проверка доступности Telegram Web App
                if (window.Telegram && window.Telegram.WebApp) {
                    console.log('Telegram Web App is available!');
                    console.log(window.Telegram.WebApp);

                    let data = JSON.stringify({
                        name: this.formData.name,
                        surname: this.formData.surname,
                        organization: this.formData.organization,
                        position: this.formData.position,
                        telegram_id: this.formData.telegram_id === '' ? 0 : parseInt(this.formData.telegram_id),
                        first_day_in_person: this.formData.firstDayInPerson,
                        first_day_office_observe: this.formData.firstDayInPerson ? this.formData.firstDayOfficeObserve : false,
                        second_day_race: this.formData.secondDayRace,
                        pilot: this.formData.secondDayRace ? this.formData.pilot : false,
                        fan: this.formData.secondDayRace ? this.formData.fan : false,
                        second_day_picnic: this.formData.secondDayPicnic,
                        master_class: this.formData.secondDayPicnic ? this.formData.masterClass : false,
                        sauna: this.formData.secondDayPicnic ? this.formData.sauna : false
                    });

                    console.log(data)

                    // Отправка данных в Telegram Web App
                    window.Telegram.WebApp.sendData(data);

                    this.submitted = true;
                    this.error = false;
                    this.message = 'Данные успешно отправлены';
                } else {
                    console.error('Telegram Web App is NOT available.');
                    console.log('URL', window.location.href); // вывод текущего URL для отладки
                    this.message = 'Не удалось инициализировать Telegram Web App. Запустите бот @bingosoft_msk';
                    this.error = true;
                    this.submitted = false;
                }
            } catch (e) {
                this.submitted = false;
                this.error = true;
                this.message = 'Ошибка: внутренний серверный сбой';
            }
        }
    }
};

createApp(RegistrationForm).mount('#reg-form');