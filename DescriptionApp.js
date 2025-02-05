import description from './Description.js';

const { createApp } = Vue;

const DescriptionApp = {
    template: `
        <div class="row me-row content-ct speaker" id="About_meetup">
<!--            <h2 class="row-title content-ct"> {{ description.title }} </h2>-->
            <h2 class="row-title content-ct"> {{ description.subtitle1 }} </h2>
            <p> {{ description.description }} </p>
            <div class="row me-row content-ct speaker">
                <h2> {{ description.subtitle2 }} </h2>
                <div v-for="ticket in description.tickets" class="col-md-4 col-sm-6 feature">
                    <h3>{{ ticket.title }}</h3>
                    <p>{{ ticket.description }}</p>
                </div>
            </div>
        </div>
    `,
    setup() {
        return {description};
    },
};

createApp(DescriptionApp).mount('#description_block');
