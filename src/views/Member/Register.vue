<template>
  <b-card>
    <h4>신규회원등록 <span class="text-danger">*</span><span style="font-size: 10pt"> 필수입력</span> </h4>
    <b-form @submit.prevent>
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="고객명"
            label-for="h-user-name"
            label-cols-md="4"
          >
            <b-form-input
              id="h-user-name"
              placeholder="고객명"
              v-model="form.user_name"
              :state="validation_name"
            />
            <b-form-invalid-feedback :state="validation_name">
              고객의 성명을 입력해주세요.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation_name">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="연락처1"
            label-for="h-user-tel1"
            label-cols-md="4"
          >
            <b-form-input
              id="h-user-tel1"
              type="number"
              placeholder="전화번호"
              v-model="form.tel1"
              :state="validation_tel1"
            />
            <b-form-invalid-feedback :state="validation_tel1">
              전화번호를 입력해주세요.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation_tel1">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="연락처2"
            label-for="h-number-2"
            label-cols-md="4"
          >
            <b-form-input
              id="h-number-2"
              type="number"
              placeholder="전화번호"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="Email"
            label-for="h-user-email"
            label-cols-md="4"
          >
            <b-row>
              <b-col sm="12" md="5">
                <b-form-input
                  id="h-user-email"
                  placeholder="Email"
                  v-model="form.email"
                />
              </b-col>
              <b-col style="display: flex;">
                <span>@</span>
                <b-form-select class="ml-1"  v-model="selected" :options="options"></b-form-select>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="성별"
            label-cols-md="4"
            v-model="form.sex"
          >
            <b-button class="mr-1" :variant="form.sex == 0 ? 'danger': 'outline-danger'" @click="form.sex = 0;">여자</b-button>
            <b-button :variant="form.sex == 1 ? 'danger': 'outline-danger'" @click="form.sex = 1">남자</b-button>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="생년월일"
            label-for="h-birthday"
            label-cols-md="4"
          >
            <b-form-datepicker id="h-birthday"></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="주소"
            label-for="h-address"
            label-cols-md="4"
          >
          <b-row>
            <b-col sm="12" md="4">
              <b-input-group>
                <b-form-input
                    v-model="zonecode"
                    disabled
                  />
                <b-input-group-append>
                  <b-button @click="modal_show = !modal_show" variant="info" class="mr-1">우편번호</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
            <b-col>
              <b-form-input
                id="h-address"
                placeholder="상세주소"
              />
            </b-col>
          </b-row>
          <b-modal v-model="modal_show">
            <vue-daum-postcode @complete="daum_post_complete"/>
          </b-modal>
          </b-form-group>
        </b-col>

        <!-- submit and reset -->
        <b-col offset-md="4">
          <b-button
            type="submit"
            variant="primary"
            class="mr-1"
            @click="formSubmit"
          >
            회원정보를 저장하고 반려동물 정보 등록하기
          </b-button>
          <b-button
            type="reset"
            variant="outline-secondary"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>

      <!-- 회원등록 확인 모달 -->
      <b-modal
        v-model="regist_confirm_modal_show"
        ok-variant="success"
        ok-title="Accept"
        modal-class="modal-success"
        centered
        title="회원등록 확인"
        @ok="handleOk"
      >
        <b-card-text>
          회원정보를 저장하시겠습니까?
        </b-card-text>
      </b-modal>
    </b-form>
  </b-card>
</template>

<script>
export default {
  data() {
    return {
      modal_show: false,
      regist_confirm_modal_show: false,
      zonecode: '',
      selected: null,
      options: [
        { value: null, text: 'naver.com' },
        { value: 'a', text: 'gmail.com' },
        { value: 'b', text: 'nate.com' },
        { value: { C: '3PO' }, text: 'daum.net' }
      ],
      sex_variant: [ "outline-danger", "danger" ],
      form: {
        user_name: '',
        sex: 0,
        email: ''
      }
    }
  },
  computed: {
    validation_name() {
      return this.form.user_name ? true : false;
    },
    validation_tel1() {
      return this.form.tel1 ? true : false;
    }
  },
  methods: {
    daum_post_complete: function(data) {
      this.zonecode = data.zonecode;
      this.modal_show = false;
    },
    validateEmail: function (email) {
      const re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*$/i
      return re.test(email);
    },
    formSubmit: function () {
      
      if (!this.validation_name) {
        document.getElementById('h-user-name').focus();
        return;
      }
      if (!this.validation_tel1) {
        document.getElementById('h-user-tel1').focus();
        return;
      }
      if (this.form.email && !this.validateEmail(this.form.email)) {
        document.getElementById('h-user-email').focus();
        this.$bvToast.toast('이메일 형식이 올바르지 않습니다.', {
          title: `신규회원등록`,
          variant: 'warning',
          solid: true,
        })
      }

      this.regist_confirm_modal_show = true;
      
    },
    handleOk: async function () {
      console.log('i am ok');
      // await sendData
      // if ok and return registed user data. espacially user_id
      // go pet register form

      // this is test data
      const user = {
        user_id: 1,
        user_name: this.form.user_name
      }
      this.$router.push({name: 'member-pet-register', params: {user}})
    }
  }
}
</script>
