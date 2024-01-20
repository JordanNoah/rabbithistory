new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        events: [],
        headers: [
            { text: 'Id', align: 'start', value: 'id' },
            { text: 'Message id', align: 'start', value: 'property.messageId' },
            { text: 'Type', align: 'start', value: 'property.type' },
            { text: 'Content', align: 'start', value: 'content' }
        ],
        options: {},
        totalEvents: 0,
        loading: false,
    },
    watch: {
        options: {
            async handler() {
                await this.getData()
            },
            deep: true,
        },
    },
    methods: {
        async getData() {
            this.loading = true
            await axios.post('../api/events',{
                options:this.options
            }).then((res) => {
                this.events = res.data.events
                this.totalEvents = res.data.total
                console.log(this.events);
            }).catch((err) =>{
                console.log(err);
            }).finally(() => {
                this.loading = false
            })
        }
    }
})