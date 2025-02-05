import description from './Description.js';

const {createApp} = Vue;

const DescriptionApp = {
    template: `
        <!-- Start: About meetup -->
        <div class="row me-row content-ct speaker" id="About_meetup">
            <h2 class="row-title content-ct"> {{ description.title }} </h2>
            <h2 class="row-title content-ct"> {{ description.subtitle1 }} </h2>
            <hr>
            <p> {{ description.description }} </p>
            <hr>
            <div class="row me-row content-ct speaker">
                <h2> {{ description.subtitle2 }} </h2>
                <div v-for="ticket in description.tickets" class="col-md-4 col-sm-6 feature">
                    <h4>{{ ticket.title }}</h4>
                    <p>{{ ticket.description }}</p>
                </div>
            </div>
        </div>
        <!-- End: About meetup -->
    `,
    setup() {
        return {description};
    },
};

createApp(DescriptionApp).mount('#description_block');
