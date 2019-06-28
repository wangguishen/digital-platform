<template>
  <div class="login">
    <el-row class="login_wrap">
      <el-col :span="18">
        <div class="login_wrap__left">
          <div>
            <img src="static/logo.png">
          </div>
          <div>
            <img src="static/login-img.png">
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="login_wrap__right">
          <div>数字化运营平台</div>
          <div>欢迎登录数字化运营平台</div>
          <div>帐号</div>
          <div>密码</div>
          <div>登录</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
  .login {
    width: 100%;
    height: 100%;
    padding: 9.2% 7%;
    background: pink;
    box-sizing: border-box;
    &_wrap {
      width: 100%;
      height: 100%;
      padding: 7.4% 5.2%;
      background-color: #fff;
      box-shadow: 0px 0px 40px 0px rgba(59, 123, 230, 0.16);
      border-radius: 20px;
      &__left {
        background-color: yellow;
        div:nth-child(2) {
          // margin-top: 65px;
          img {
            width: 100%;
            // height: 100%;
          }
        }
      }
      &__right {
        margin-top: 85px;
      }
    }
  }
</style>

