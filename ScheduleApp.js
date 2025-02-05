import schedule from './Schedule.js';
const { createApp, ref } = Vue;

createApp({
    template: `
          <div class="schedule-container">
          <h2 class="row-title content-ct">Программа</h2>
          <ul class="nav nav-tabs">
            <li v-for="(day, key) in schedule"
                :key="key"
                role="presentation"
                :class="{active: activeTab === key}">
              <a href="#" @click.prevent="activeTab = key">
                {{ formatDate(day.date, 'full') }}
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div v-for="(day, key) in schedule"
                 :key="key"
                 class="tab-pane"
                 :class="{ 'fade' : activeTab !== key, 'in' : activeTab === key, 'active': activeTab === key}"
            >
              <h3>Место проведения: <a :href="day.part1.link_to_location" target="_blank"> {{ day.part1.location }} </a></h3>
              <div class="row">
                <div class="col-md-6">
                  <div v-for="(event, index) in day.part1.schedule"
                       :key="index"
                       class="media">
                    <div class="media-body">
                      <h3 class="media-heading">{{ event.from }} - {{ event.to }}</h3>
                      <h4>{{ event.description }}</h4>
                      <div v-if="event.speakers.length > 0">
                        <h4>Спикеры:</h4>
                        <h5 v-for="name in event.speakers">{{ name }}</h5>
                      </div>
                    </div>
                    <hr>
                  </div>
                </div>
              </div>
              <h3>Место проведения: <a :href="day.part2.link_to_location" target="_blank"> {{ day.part2.location }} </a></h3>
              <div class="row">
                <div class="col-md-6">
                  <div v-for="(event, index) in day.part2.schedule"
                       :key="index"
                       class="media">
                    <div class="media-body">
                      <h3 class="media-heading">{{ event.from }} - {{ event.to }}</h3>
                      <h4>{{ event.description }}</h4>
                      <div v-if="event.speakers.length > 0">
                        <h4>Спикеры:</h4>
                        <h5 v-for="name in event.speakers">{{ name }}</h5>
                      </div>
                    </div>
                    <hr>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        `,
    setup() {
        const activeTab = ref('day1');

        const formatDate = (value, type) => {
            const date = new Date(value);
            const day = String(date.getDate()).padStart(2, '0'); // Добавляем ведущий ноль
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Добавляем ведущий ноль и корректируем месяц
            const year = date.getFullYear();

            if (type === 'day') {
                return day;
            } else if (type === 'full') {
                return `${day}.${month}.${year}`;
            }
        };
        return { schedule, activeTab, formatDate };
    },
}).mount("#schedule");