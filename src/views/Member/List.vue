<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="
        min-height: 100px;
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <b-container fluid>
        <span class="mask bg-gradient-success opacity-8"></span>
      </b-container>
    </div>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col xl="12" class="mb-5 mb-xl-0">
          <b-card no-body class="mb-0">
            <div class="m-2">
              <!-- Table Top -->
              <b-row>
                <!-- column sort -->
                <b-col
                  cols="12"
                  md="6"
                  class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
                >
                  <b-form-select
                    v-model="selectedOrderBy"
                    :options="orderByOptions"
                  ></b-form-select>
                </b-col>

                <!-- Search -->
                <b-col cols="12" md="6">
                  <div class="d-flex align-items-center justify-content-end">
                    <b-input-group class="input-group-merge">
                      <b-form-input
                        v-model="searchQuery"
                        placeholder="Search..."
                        class="search-product"
                      />
                      <b-input-group-append is-text>
                        <b-icon icon="search"></b-icon>
                        <!-- <feather-icon
                    icon="SearchIcon"
                    class="text-muted"
                  /> -->
                      </b-input-group-append>
                    </b-input-group>

                    <b-button
                      variant="primary"
                      class="ml-1"
                      v-b-toggle.accordion-1
                    >
                      <span class="text-nowrap">상세검색</span>
                    </b-button>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-collapse
                  id="accordion-1"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <b-row>
                      <b-col lg="6">
                        <label for="service-select"
                          >Choose a service type</label
                        >
                        <b-form-select
                          id="service-select"
                          v-model="selected_service"
                          :options="service_options"
                        ></b-form-select>
                      </b-col>
                      <b-col lg="6">
                        <label for="period-select">Choose a period type</label>
                        <b-form-select
                          id="period-select"
                          v-model="selected_period"
                          :options="period_options"
                        ></b-form-select>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="6">
                        <label for="startDate-datepicker"
                          >Choose a start date</label
                        >
                        <b-form-datepicker
                          id="startDate-datepicker"
                          locale="kr"
                          v-model="startDate"
                        />
                      </b-col>
                      <b-col lg="6">
                        <label for="endDate-datepicker"
                          >Choose a end date</label
                        >
                        <b-form-datepicker
                          id="endDate-datepicker"
                          locale="kr"
                          v-model="endDate"
                        />
                      </b-col>
                    </b-row>
                  </b-card-body>
                </b-collapse>
              </b-row>
            </div>

            <div id="example-table"></div>

            <div class="mx-2 mb-2 mt-2">
              <b-row>
                <!-- Pagination -->
                <b-col
                  cols="12"
                  sm="6"
                  class="d-flex align-items-center justify-content-center justify-content-sm-end"
                >
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="totalUsers"
                    :per-page="perPage"
                    first-number
                    last-number
                    class="mb-0 mt-1 mt-sm-0"
                    prev-class="prev-item"
                    next-class="next-item"
                  >
                    <template #prev-text>
                      <b-icon icon="arrow-left"></b-icon>
                      <!-- <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                /> -->
                    </template>
                    <template #next-text>
                      <b-icon icon="arrow-right"></b-icon>
                      <!-- <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                /> -->
                    </template>
                  </b-pagination>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOrderBy: 1,
      orderByOptions: [
        { value: 1, text: "이메일" },
        { value: 2, text: "생년월일" },
      ],
      items: [
        {
          user_id: 40,
          user_name: "Dickerson",
          tel1: "010-000-0030",
          tel2: "",
          email: "petmeOh@gmail.com",
          sex: "남",
          birthday: "82.04.14",
          address: "서울특별시 은평구 용암동 삼성 편한아파트 103동 505호",
          staff: "김오혁이",
          reg_dt: "2020.10.12",
          reserve_dt: "2021.05.20",
          recent_reserve_dt: "2021.04.23",
          pet_name: "반디",
        },
        {
          user_id: 40,
          user_name: "Sim Jin Wha",
          tel1: "010-000-0030",
          tel2: "",
          email: "dastan@gmail.com",
          sex: "남",
          birthday: "82.04.14",
          address: "서울특별시 은평구 용암동 삼성 편한아파트 103동 505호",
          staff: "김오혁이",
          reg_dt: "2020.10.12",
          reserve_dt: "2021.05.20",
          recent_reserve_dt: "2021.04.23",
          pet_name: "반디",
        },
      ],
      fetchUsers: [],
      userTableColumns: [
        {
          formatter: "responsiveCollapse",
          width: 30,
          minWidth: 30,
          hozAlign: "center",
          resizable: false,
          headerSort: false,
        },
        { title: "NO", field: "user_id", width: 200, responsive: 0 },
        { title: "고객명", field: "user_name", width: 200, responsive: 0 },
        // {title:"연락처", field:"tel1", width:200, responsive:0},
        { title: "연락처1", field: "tel1", hozAlign: "right", width: 150 },
        // {title:"연락처1", field:"tel1", hozAlign:"right", sorter:"number", width:150},
        { title: "연락처2", field: "tel2", width: 150, responsive: 2 },
        { title: "이메일", field: "email", hozAlign: "center", width: 150 },
        { title: "성별", field: "sex", width: 150 },
        {
          title: "생년월일",
          field: "birthday",
          hozAlign: "center",
          sorter: "date",
          width: 150,
        },
        {
          title: "주소",
          field: "address",
          hozAlign: "center",
          sorter: "date",
          width: 150,
        },
        {
          title: "담당자",
          field: "staff",
          hozAlign: "center",
          sorter: "date",
          width: 150,
        },
        {
          title: "등록일",
          field: "reg_dt",
          hozAlign: "center",
          sorter: "date",
          width: 150,
        },
        {
          title: "예약일",
          field: "reserve_dt",
          hozAlign: "center",
          sorter: "date",
          width: 150,
        },
        {
          title: "최근예약",
          field: "recent_reserve_dt",
          hozAlign: "center",
          width: 150,
        },
        {
          title: "반려동물",
          field: "pet_name",
          hozAlign: "center",
          width: 150,
        },
      ],
      sortBy: "user_id",
      isSortDirDesc: true,
      currentPage: 1,
      totalUsers: 10,
      perPage: 10,

      // 상세검색
      selected_service: null,
      selected_period: null,
      service_options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
      period_options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
      startDate: "",
      endDate: "",
    };
  },
  computed: {
    searchQuery: {
      get: function () {
        return "";
      },
      set: function (newValue) {
        this.fetchUsers = this.items.filter((el) => {
          let result =
            el.user_name.includes(newValue) ||
            el.pet_name.includes(newValue) ||
            el.email.includes(newValue) ||
            el.staff.includes(newValue);
          return result;
        });
        this.setTablulator();
      },
    },
  },
  mounted: async function () {
    await this.getData();
    this.setUserTableColumns();
    this.setTablulator();
  },
  methods: {
    getData: async function () {
      // await axios.post()
      this.fetchUsers = this.items.slice();
    },
    setUserTableColumns: function () {
      const arr = JSON.parse(localStorage.getItem("userTableColumns"));
      if (Array.isArray(arr)) {
        this.userTableColumns = arr;
      }
    },
    setTablulator: function () {
      let th = this;
      new Tabulator("#example-table", {
        height: "500px",
        layout: "fitDataFill",
        responsiveLayout: "collapse",
        columns: this.userTableColumns,
        movableColumns: true, //enable user movable columns
        columnMoved: function (column, columns) {
          //column - column component of the moved column - column._column.field
          //columns- array of columns in new order
          let newAlignColumns = columns.map((column) => column._column.field);
          let newUserTableColumns = [th.userTableColumns[0]];
          for (var j = 0; j < newAlignColumns.length; j++) {
            let field = newAlignColumns[j];
            for (var i = 1; i < th.userTableColumns.length; i++) {
              if (th.userTableColumns[i].field == field) {
                newUserTableColumns.push(th.userTableColumns[i]);
              }
            }
          }
          localStorage.setItem(
            "userTableColumns",
            JSON.stringify(newUserTableColumns)
          );
        },
        data: this.fetchUsers, //assign data to table
        responsiveLayoutCollapseStartOpen: false, // 컬럼 컬랩스 +/-를 닫고 시작함.
        responsiveLayoutCollapseFormatter: function (data) {
          var list = document.createElement("ul");
          data.forEach(function (col) {
            let item = document.createElement("li");
            item.innerHTML =
              "<strong>" + col.title + "</strong> - " + col.value;
            list.appendChild(item);
          });
          return Object.keys(data).length ? list : "";
        },
      });
    },
  },
};
</script>

<style>
</style>
