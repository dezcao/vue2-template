<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
              :link="{
                name: 'Member',
                icon: 'ni ni-single-02 text-yellow'
                }">

          <sidebar-item
            :link="{
                name: 'member-list',
                path: '/member/list'
                }"
              >
          </sidebar-item>
          <sidebar-item
            :link="{
                name: 'member-register',
                path: '/member/register'
                }"
              >
          </sidebar-item>
          <sidebar-item
            :link="{
                name: 'member-pet-register',
                path: '/member/pet/register'
                }"
              >
          </sidebar-item>
        </sidebar-item>
        <sidebar-item
            :link="{
                name: 'reservation',
                path: '/reservation'
                }"
              >
          </sidebar-item>


        <sidebar-item
          :link="{
            name: 'Sample',
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
           <sidebar-item
            :link="{
                name: 'MyExample',
                path: '/sample/my-example'
                }"
              >
          </sidebar-item>
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Menu2',
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
           <sidebar-item
            :link="{
                name: 'Contents1',
                path: '/menu2/contents1'
                }"
              >
          </sidebar-item>
           <sidebar-item
            :link="{
                name: 'Contents2',
                path: '/menu2/contents2'
                }"
              >
          </sidebar-item>
           <sidebar-item
            :link="{
                name: 'Contents3',
                path: '/menu2/contents3'
                }"
              >
          </sidebar-item>
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
           <sidebar-item
            :link="{
                name: 'Dashboard',
                path: '/dashboard'
                }"
              >
          </sidebar-item>
           <sidebar-item
            :link="{
                name: 'Icons',
                path: '/icons'
                }"
              >
          </sidebar-item>
        </sidebar-item>

        <sidebar-item
              :link="{
                name: 'Maps',
                path: '/maps',
                icon: 'ni ni-pin-3 text-orange'
              }">
        </sidebar-item>

        <sidebar-item
              :link="{
                name: 'User Profile',
                path: '/profile',
                icon: 'ni ni-single-02 text-yellow'
                }">
        </sidebar-item>

        <sidebar-item
                :link="{
                  name: 'Tables',
                  path: '/tables',
                  icon: 'ni ni-bullet-list-67 text-red'
                }">
        </sidebar-item>

        <sidebar-item
                  :link="{
                    name: 'Login',
                    path: '/login',
                    icon: 'ni ni-key-25 text-info'
                  }">
        </sidebar-item>
        <sidebar-item
                  :link="{
                    name: 'Register',
                    path: '/register',
                    icon: 'ni ni-circle-08 text-pink'
                  }">
        </sidebar-item>
      </template>

      <template slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">Documentation</h6>

        <b-nav class="navbar-nav mb-md-3">
          <b-nav-item
               href="https://www.creative-tim.com/learning-lab/bootstrap-vue/quick-start/argon-dashboard"
               >
              <i class="ni ni-spaceship"></i>
              <b-nav-text class="p-0">Getting started</b-nav-text>
          </b-nav-item>
          <b-nav-item href="https://www.creative-tim.com/learning-lab/bootstrap-vue/colors/argon-dashboard">
              <i class="ni ni-palette"></i>
              <b-nav-text class="p-0">Foundation</b-nav-text>
          </b-nav-item>
          <b-nav-item href="https://www.creative-tim.com/learning-lab/bootstrap-vue/avatar/argon-dashboard">
              <i class="ni ni-ui-04"></i>
              <b-nav-text class="p-0">Components</b-nav-text>
          </b-nav-item>
        </b-nav>
      </template>
    </side-bar>
    <div class="main-content">
      <main-navbar :type="$route.meta.navbarType"></main-navbar>
      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>

    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';

  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import MainNavbar from './MainNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import MainContent from './Content.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      MainNavbar,
      ContentFooter,
      MainContent,
      FadeTransition
    },
    methods: {
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('sidenav');
        }
      }
    },
    mounted() {
      this.initScrollbar()
    }
  };
</script>
<style lang="scss">
</style>
