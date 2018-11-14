<template>
  <div class="gvt-error-page">
    <Row style="height: 100%;" type="flex">
      <Col span="14" style="height: 100%;position:relative;">
        <img class="gvt-error-img" src="//47.75.105.17:22124/group1/M00/01/07/wKi5SlvrjFaAZP0QAAHMUON2yTg737.pngg"/>
      </Col>
      <Col span="10" style="height: 100%;position:relative;">
        <div class="error-info">
          <p class="error-title">—&emsp;404 Not Found</p> 
          <p class="error-desc">页面不见了只是为了下一次的与你</p>
          <p class="error-desc">——重逢~</p>
          <div class="error-btns">
            <span class="home_btn" @click="window.location.href = '/'">返回首页</span>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {};
</script>
