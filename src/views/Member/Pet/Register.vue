
<template>
  <b-card>
    <h4>반려동물정보 등록하기 <span class="text-danger">*</span><span style="font-size: 10pt"> 필수입력</span> </h4>
    <p>
      <b-button variant="info">
        <b-icon icon="chevron-compact-left"></b-icon>
      </b-button>
      <span class="pr-1 pl-1" sm="10">{{user.user_name}} 회원님의 반려동물 정보를 입력하세요</span>
      <b-button variant="primary" sm="12" :disabled="user.user_id ? false : true">반려동물정보 등록 완료</b-button>
    </p>
      <div>
        <b-form
          ref="form"
          :style="{height: trHeight}"
          class="repeater-form"
          @submit.prevent="repeateAgain"
        >

          <!-- Row Loop -->
          <b-row
            v-for="(item, index) in items"
            :id="item.id"
            :key="item.id"
            ref="row"
          >

            <!-- Item Name -->
            <b-col md="4">
              <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
              <el-upload
                class="avatar-uploader"
                action="http://52.78.104.139/uploadimage"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              
              <b-form-group
                label="Item Name"
                label-for="item-name"
              >
                <b-form-input
                  id="item-name"
                  type="text"
                  placeholder="Vuexy Admin Template"
                />
              </b-form-group>
            </b-col>

            <!-- Cost -->
            <b-col md="2">
              <b-form-group
                label="Cost"
                label-for="cost"
              >
                <b-form-input
                  id="cost"
                  type="number"
                  placeholder="32"
                />
              </b-form-group>
            </b-col>

            <!-- Quantity -->
            <b-col md="2">
              <b-form-group
                label="Quantity"
                label-for="quantity"
              >
                <b-form-input
                  id="quantity"
                  type="number"
                  placeholder="1"
                />
              </b-form-group>
            </b-col>


            <!-- Remove Button -->
            <b-col
              lg="2"
              md="3"
              class="mb-50"
            >
              <b-button
                variant="outline-danger"
                class="mt-0 mt-md-2"
                @click="removeItem(index)"
              >
                <feather-icon
                  icon="XIcon"
                  class="mr-25"
                />
                <span>Delete</span>
              </b-button>
            </b-col>
            <b-col cols="12">
              <hr>
            </b-col>
          </b-row>
        </b-form>
      </div>

      <b-button
        variant="primary"
        @click="repeateAgain"
      >
        <feather-icon
          icon="PlusIcon"
          class="mr-25"
        />
        <span>Add New</span>
      </b-button>
    
  </b-card>
</template>

<script>

export default {
  data() {
    return {
      user: {},
      imageUrl: '', // elimuntui

      items: [{
        id: 1,
        selected: 'male',
        selected1: 'designer',
        prevHeight: 0,
      }],
      nextTodoId: 2,
    }
  },
  mounted() {
    if (!this.$route.params.user || !this.$route.params.user.user_id) {
      this.emptyUserToast();
    }
    this.user = this.$route.params.user || {};
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    emptyUserToast: function () {
      this.$bvToast.toast('펫을 등록하기 위한 고객이 특정되지 않았습니다.', {
        title: `펫 등록 오류`,
        autoHideDelay: 1500,
        variant: 'warning',
        solid: true
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);

    },
    beforeAvatarUpload(file) {
      const isJPG = true;
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!');
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
      }
      return isJPG && isLt2M;
    },
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
    useInputImageRenderer: function (refInputEl, base64) {
      // eslint-disable-next-line no-param-reassign
      this.userData.avatar = base64
    }
  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
 
 <style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>