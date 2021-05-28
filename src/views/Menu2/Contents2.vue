<template>
<div>
    
    <b-container fluid class="pb-6 pb-8 pt-6 pt-md-8 bg-gradient-success">
        <b-row>
            <b-col xl="8" class="mb-5 mb-xl-0">
                <b-card no-body class="p-3">
                    <b-table striped hover :items="items"></b-table>
                </b-card>
            </b-col>
        </b-row>
    </b-container>

</div>
</template>

<script>
export default {
    components: {},
    data: function() {
        return {
            items: [{
                    age: 40,
                    first_name: 'Dickerson',
                    last_name: 'Macdonald'
                },
                {
                    age: 21,
                    first_name: 'Larsen',
                    last_name: 'Shaw'
                },
                {
                    age: 89,
                    first_name: 'Geneva',
                    last_name: 'Wilson'
                },
                {
                    age: 38,
                    first_name: 'Jami',
                    last_name: 'Carney'
                }
            ]
        };
    },
    methods: {

    },
    mounted() {

    }
};
</script>
