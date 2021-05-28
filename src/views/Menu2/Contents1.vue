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
              <h1 class="display-2 text-white">Hello Menu2 Content1</h1>
              <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your
                work and manage your projects or assigned tasks</p>
              <a href="#!" class="btn btn-info">Edit profile</a>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>

    <b-container fluid class="mt--7">
        <b-row>
            <b-col xl="8" class="mb-5 mb-xl-0">
                <card type="default" header-classes="bg-transparent">
                    {{message}}
                </card>
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
            message: 'Hello menu1/content1'
        };
    },
    methods: {
    },
    mounted() {

    }
};
</script>
