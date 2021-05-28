<template>
<div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
        style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row >
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Hello Contnent2</h1>
              <p class="text-white mt-0 mb-5">젠장 디폴트 디자인이 상단을 이만큼이나 먹는다... 아놔.</p>
              <a href="#!" class="btn btn-info">Edit profile</a>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
    <b-container fluid class="mt--7">
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
