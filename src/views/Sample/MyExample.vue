<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="
        min-height: 600px;
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
        <b-container fluid class="d-flex align-items-center">
          <b-row>
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Sample</h1>
              <p class="text-white mt-0 mb-5">
                젠장 디폴트 디자인이 상단을 이만큼이나 먹는다... 아놔.
              </p>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col xl="8" class="mb-5 mb-xl-0">
          <b-card no-body class="p-3" align="left">
            <b-card-text class="pt-2">
              <b-button
                @click="messageOpen('normal')"
                variant="success"
                size="sm"
                >message normal</b-button
              >
              <b-button
                @click="messageOpen('message')"
                variant="success"
                size="sm"
                >message value</b-button
              >
              <b-button
                @click="messageOpen('callback')"
                variant="success"
                size="sm"
                >message callback</b-button
              >
            </b-card-text>
            <b-card-text class="image-wrap">
              <div>
                <b-img :src="photo_url || photo_prev" fluid></b-img>
              </div>
            </b-card-text>
            <b-card-text class="pt-2">
              <b-input-group>
                <b-form-file
                  v-model="photo"
                  @change="onFileChange($event, 'photo_url')"
                  size="sm"
                ></b-form-file>
                <b-input-group-append>
                  <b-button
                    @click="
                      photo = null;
                      photo_url = null;
                    "
                    size="sm"
                    variant="danger"
                    >삭제</b-button
                  >
                </b-input-group-append>
              </b-input-group>
            </b-card-text>
            <b-card-text>
              <b-textarea v-model="axios_data" class="mb-1"></b-textarea>
              <b-button size="sm" @click="getAxiosGlobal">axios</b-button>
            </b-card-text>
            <b-card-text>
              <b-form-group label="Tag datalist">
                <b-form-tags
                  id="tags-component-select"
                  v-model="tagValue"
                  size="sm"
                  add-on-change
                  no-outer-focus
                >
                  <template v-slot="{ tags, addTag, disabled, removeTag }">
                    <ul
                      v-if="tags.length > 0"
                      class="list-inline d-inline-block mb-2"
                    >
                      <li
                        v-for="tag in tags"
                        :key="tag"
                        class="list-inline-item"
                      >
                        <b-form-tag
                          @remove="removeTag(tag)"
                          :title="tag"
                          :disabled="disabled"
                          variant="info"
                          >{{ tag }}</b-form-tag
                        >
                      </li>
                    </ul>

                    <b-form-input
                      v-model="search"
                      id="tag-search-input"
                      type="search"
                      size="sm"
                      autocomplete="off"
                      list="input-list"
                      ref="shobal"
                      @update="
                        multi_onOptionClick({ search, addTag, removeTag })
                      "
                    ></b-form-input>
                    <datalist id="input-list">
                      <option
                        v-for="option in availableOptions"
                        :key="option.id"
                      >
                        {{ option.name }}
                      </option>
                      <option v-if="availableOptions.length === 0">
                        There are no tags available to select
                      </option>
                    </datalist>
                  </template>
                </b-form-tags>
              </b-form-group>
            </b-card-text>

            <b-card-text>
              
              <b-form-group label="Unique select list">
                <b-input-group v-for="(item, index) in select_arr" :key="item.value" class="mt-1">
                  <b-form-input size="sm" type="text" v-model="item.memo"></b-form-input>
                  <b-form-select size="sm" style="height:31px;" v-model="item.value" @change.native="selectedChange($event, item, index)">
                    <b-form-select-option v-for="(user) in item.available" :key="user.value" :value="user.value" @click="selectedChange">{{ user.text }}</b-form-select-option>
                  </b-form-select>
                  <b-input-group-append>
                    <b-button size="sm" variant="danger" @click="removeList(item, index)">X</b-button>
                  </b-input-group-append>
                </b-input-group>
                
                <b-row class="text-center mt-2">
                  <b-col>
                    <b-button size="sm" variant="info" @click="addList"><b-icon-plus></b-icon-plus> list 추가</b-button>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-card-text>

            <b-card-text>
              <quill-editor
                ref="quillEditor"
                class="editor"
                :options="editorOption"
                v-model="copyright"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              />
              <br />
              <div class="content ql-editor" v-html="copyright"></div>

            </b-card-text>

            <b-card-text>
                            
              <b-form-group label="설문 문항">
                  <b-card class="mb-1" bg-variant="light" v-for="(item, index) in question" v-bind:key="index">
                      <b-form-group label="문항 제목">
                          <b-form-input type="text" v-model="item.title" size="sm"></b-form-input>
                      </b-form-group>
                      <b-form-group label="보기">
                          <b-input-group size="sm" class="mb-1"
                              v-for="(choice, index) in item.case" v-bind:key="index">
                              <b-form-input type="text" v-model="item.case[index]"></b-form-input>
                              <b-input-group-append><b-button variant="danger" size="sm" @click="item.case.splice(index, 1)">x</b-button></b-input-group-append>
                          </b-input-group>
                          <b-button variant="success" size="sm" class="mt-1" @click="item.case.push('')">보기 추가하기</b-button>
                      </b-form-group>
                      <b-card-footer>
                          <b-button variant="outline-danger" size="sm" @click="question.splice(index, 1)">문항 삭제하기</b-button>
                      </b-card-footer>
                  </b-card>
              </b-form-group>
              <b-button variant="primary" size="sm" @click="addArray(question, question_type1)">문항 추가하기</b-button>

            </b-card-text>
            
            <b-card-text>
              <b-table 
                  :fields="operator_fields"
                  :items="operator_items" 
                  selectable
                  select-mode="multi"
                  @row-selected="onRowSelected"
                  ref="selectableTable"
                  small bordered head-variant="light">

                  <template #head(selected)="scope">
                      <div class="text-center">
                          <b-form-checkbox 
                              v-model="operator_all" 
                              :indeterminate="operator_indeterminate"
                              @change="toggleAll"> {{ scope.label }}</b-form-checkbox>
                      </div>
                  </template>
                    
                  <template #cell(selected)="row">
                      <template v-if="row.rowSelected">
                          <div class="text-center">
                              <b-form-checkbox v-model="row.rowSelected" 
                                @change="checked(row.index, row.rowSelected, 'selectableTable')">{{row.index}}</b-form-checkbox>
                          </div>
                      </template>
                      <template v-else>
                          <div class="text-center">
                              <b-form-checkbox v-model="row.rowSelected" 
                                  @change="checked(row.index, row.rowSelected, 'selectableTable')">{{row.index}}</b-form-checkbox>
                          </div>
                      </template>
                  </template>
              </b-table>
              <b-pagination
                  v-model="operator_pagination.current_page"
                  :total-rows="operator_pagination.total_count"
                  :per-page="operator_pagination.limit"
                  align="center"
                  size="sm"
                  class="my-0"
                  @change="paginationFn($event, 'Operate')"
              ></b-pagination>
                
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      photo: null,
      photo_url: "",
      photo_prev: this.$store.getters.image_placeholder(["100x100"]),

      axios_data: "",

      /** 데이터리스트 + 태그 start */
      datalist_items: [
        { id: "a1", name: "abcde@abc.com" },
        { id: "a2", name: "efg@gmail.com" },
        { id: "a3", name: "kyle@gmail.com" },
        { id: "a4", name: "havard@gmail.com" },
        { id: "a5", name: "jhon@gmail.com" },
      ],
      search: "",
      tagValue: [],
      /** 데이터리스트 + 태그 end */

      /** 메모 + 유니크 셀렉트 */
      lang_options: [
        { value: "b1", text: "박지성", memo: "" },
        { value: "b2", text: "김종국", memo: "" },
        { value: "b3", text: "홀란드", memo: "" },
        { value: "b4", text: "파루크", memo: "" },
        { value: "b5", text: "이순신", memo: "" },
      ],
      lang_options_values: [],
      lang_options_obj: {},
      select_arr: [], // {value, text, available}
      // available: [],
      /** 데이터리스트 + 태그 end */
      
      /** quill editor */
      copyright: null,
      editorOption: {
        // modules: {}, // 이 주석을 해제하여 빈 객체가 바인딩 되면, 퀼 에디터의 옵션이 줄어듭니다.
        placeholder: "게시물을 작성해주세요.",
        theme: "snow",
      },
      /** quill editor */
      
            /** 설문문항 추가하기 */
      question: [{"title":"만족하십니까", "case":["매우만족","만족","불만족"]}],
      question_type1: { title: '', case: [] },
      /** 설문문항 추가하기 */
      
      /** 테이블 체크박스 및 페이지네이션 */
      operator_items: [
        {
            id: 1,
            name: 'hello name',
            email: 'hello@inowing.com',
            part: '개발팀',
            grade: '과장',
            created_at: '2020-04-16',
            invited_at: '2020-04-16',
            passcode: 'zepd1235'
        },
        {
            id: 2,
            name: 'hello name',
            email: 'hello@inowing.com',
            part: '개발팀',
            grade: '과장',
            created_at: '2020-04-16',
            invited_at: '2020-04-16',
            passcode: 'zepd1235'
        },
        {
            id: 3,
            name: 'hello name',
            email: 'hello@inowing.com',
            part: '개발팀',
            grade: '과장',
            created_at: '2020-04-16',
            invited_at: '2020-04-16',
            passcode: 'zepd1235'
        },
        {
            id: 4,
            name: 'hello name',
            email: 'hello@inowing.com',
            part: '개발팀',
            grade: '과장',
            created_at: '2020-04-16',
            invited_at: '2020-04-16',
            passcode: 'zepd1235'
        },
        {
            id: 5,
            name: 'hello name',
            email: 'hello@inowing.com',
            part: '개발팀',
            grade: '과장',
            created_at: '2020-04-16',
            invited_at: '2020-04-16',
            passcode: 'zepd1235'
        },
        {
            id: 6,
            name: 'hello name',
            email: 'hello@inowing.com',
            part: '개발팀',
            grade: '과장',
            created_at: '2020-04-16',
            invited_at: '2020-04-16',
            passcode: 'zepd1235'
        },
      ],
      operator_fields: [
        {key: 'selected', label: 'No'},
        {key: 'name', label: '이름'},
        {key: 'email', label: '이메일'},
        {key: 'part', label: '소속'},
        {key: 'grade', label: '직책'},
        {key: 'created_at', label: '생성시간'},
        {key: 'invited_at', label: '초대시간'},
        {key: 'passcode', label: 'passcode'}
      ],
      operator_pagination: {
        "total_count": 6,
        "count_pages": 1,
        "current_page": 1,
        "limit": 5
      },
      operator_allSelected: [],
      operator_all: false,
      operator_indeterminate: false,
      /** 테이블 체크박스 및 페이지네이션 */

    };
  },
  watch: {
    operator_allSelected (newValue, oldValue) {
      // Handle changes in individual flavour checkboxes
      console.log(newValue, oldValue);
      if (newValue.length === 0) {
        this.operator_indeterminate = false
        this.operator_all = false
      } else if (newValue.length === this.operator_items.length) {
        this.operator_indeterminate = false
        this.operator_all = true
      } else {
        this.operator_indeterminate = true
        this.operator_all = false
      }
    }
  },
  computed: {
    criteria() {
      // datalist + tag
      return this.search.trim().toLowerCase();
    },
    availableOptions() {
      // datalist + tag
      const criteria = this.criteria;
      const options = this.datalist_items.filter(
        (opt) => this.tagValue.indexOf(opt.name) === -1
      );
      if (criteria) {
        return options.filter(
          (opt) => opt.name.toLowerCase().indexOf(criteria) > -1
        ); // return new array
      }
      return options;
    },
  },
  mounted() {
    this.set_lang_option_values();
  },
  methods: {
    messageOpen: function (key) {
      function callback() {
        this.$toast("Alert", "폼을 모두 입력해 주세요.", "danger");
      }
      switch (key) {
        case "normal":
          this.$msgBox(200);
          break;
        case "message":
          this.$msgBox(400, "insert", "유저가 입력한 메시지 입니다.");
          break;
        case "callback":
          this.$msgBox(
            200,
            "delete",
            "메시지 이후, 콜백이 실행됩니다.",
            callback.bind(this)
          );
          break;
        default:
          break;
      }
    },
    getAxiosGlobal: async function () {
      let res = await this.$http.get(
        "https://jsonplaceholder.typicode.com/users/"
      );
      this.axios_data = res.data[0].name;
    },
    multi_onOptionClick({ search, addTag }) {
      // datalist + tag
      for (let option of this.datalist_items) {
        if (option.name == search) {
          addTag(option.name);
          this.conference_id = option.id;
          this.search = "";
          this.$refs.shobal.localValue = "";
        }
      }
    },
    reset_available: function (type) {
      if (this.select_arr[0].available.length == 0) { // 가능한 목록이 없으면 그만한다.
        return;
      }

      let selected_value = [];
      for (let item of this.select_arr) {
        selected_value.push(item.value);
      }
      
      let vanila_values = []; // [value, value, value]
      for (let item of this.lang_options_values) {
        if (!selected_value.includes(item)) {
          vanila_values.push(item);
        }
      }

      let vanila_available = [];
      for (let item of this.lang_options) {
        if (vanila_values.includes(item.value)) {
          vanila_available.push(item);
        }
      }

      if (type == 'add') {
        selected_value.push(vanila_available[0].value); // 추가할 아이템 넣어준다.
        vanila_available.splice(0, 1); // 바닐라에서 하나 빼준다.
      }

      let new_arr = []; // init
      for (var i = 0; i < selected_value.length; i++) {
        let value = selected_value[i];
        let item_available = [this.lang_options_obj[value], ...vanila_available]; // 자기 자신과 바닐라 = 리스트별 선택 가능목록
        let memo = this.lang_options_obj[value].memo;
        if (this.select_arr[i]) {
          memo = this.select_arr[i].memo;
        }
        let new_item = {value: value, text: this.lang_options_obj[value].text, memo, available: item_available};
        new_arr.push(new_item);
      }
      this.select_arr = new_arr;
    },
    selectedChange: function (event, item, index) {
      // item.value -> event.target.value로 바꿔야 한다.
      let value = event.target.value;
      item.value = value;
      // item.text = this.lang_options_obj[value].text;
      // item.memo = this.lang_options_obj[value].memo;
      // available 아이템 변경한다.
      this.reset_available();
    },
    addList: function () {
      if (this.select_arr.length == 0) {
        let value = this.lang_options[0].value;
        let text = this.lang_options[0].text;
        let memo = this.lang_options[0].memo;
        let available = this.lang_options;
        this.select_arr.push({value, text, memo, available});
        return;
      }
      // 최초순환 끝
      
      // 두번째부터 수행 -- available을 모두 재생산 하는것이 관건이다.
      this.reset_available('add');
    },
    set_lang_option_values: function () {
      let arr = [];
      let obj = {};
      this.lang_options.forEach(el => {
        arr.push(el.value);
        obj[el.value] = el;
      });
      this.lang_options_values = arr;
      this.lang_options_obj = obj;
    },
    removeList: function (item, index) {
      this.select_arr.splice(index, 1);
      let revive = { value: item.value, text: item.text, memo: item.memo }; // 되살릴 아이템 구성
      for (let item of this.select_arr) {
        item.available.push(revive); // 남은 목록 안에 선택 가능한 옵션으로 되살린 아이템 넣어준다.
      }
    },
    onEditorBlur(quill) {
      // console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      // console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      // console.log("editor ready!", quill);
    },
    
    addArray: function (array, new_item) {
      function cloneObject(obj) {
          var clone = {};
          for (var key in obj) {
              if (Array.isArray(obj[key])) {
                  let new_arr = obj[key].slice();
                  clone[key] = new_arr;
              } else if (typeof obj[key] == "object" && obj[key] != null) {
                  clone[key] = cloneObject(obj[key]);
              } else {
                  clone[key] = obj[key];
              }
          }
          return clone;
      }
      let clone = cloneObject(new_item);
      array.push(clone);
    },
    
    paginationFn: async function(requestPage, type) {
        // await getOperationList()
        console.log('requestPage ', requestPage, type);
    },
    onRowSelected(items) {
        this.operator_allSelected = items
    },
    selectAllRows() {
        this.$refs.selectableTable.selectAllRows()
    },
    clearSelected() {
        this.$refs.selectableTable.clearSelected()
    },
    checked(index, checked, selectableTable) {
        let tableRef = this.$refs[selectableTable]
        // to select all use tableRef.selectAllRows()
        // to see all availabe table properties just do a console.log(tableRef)
        if (checked === true){
            tableRef.selectRow(index)
        } else {
            tableRef.unselectRow(index)
        }
    },
    toggleAll(checked) {
        this.operator_all = checked;
        checked ? this.selectAllRows() : this.clearSelected();
    }

  },
  
};
</script>
<style scoped>
.image-wrap {
  height: 100px;
}
.image-wrap > div {
  display: inline-block;
  width: 100px;
  height: 100%;
  border: 1px solid silver;
  border-radius: 3px;
}
.image-wrap > div > img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
