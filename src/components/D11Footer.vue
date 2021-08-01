<template>
  <div class="footer-background">
    <v-container>
      <div class="footer">
        <div>D11 4.0.0-beta1</div>
        <v-spacer />
        <div>
          <a href="https://github.com/dromelvan/d11-vue">D11 VUE</a>
          <a href="https://github.com/dromelvan/d11-boot">D11 BOOT</a>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "D11Footer"
};
</script>

<style lang="scss" scoped>
.footer-background {
  border-top: 1px solid #dddddd;
  background-color: #f5f5f5;
  letter-spacing: 0;
  font-size: 14px;
  max-height: 50px;

  .footer {
    display: flex;
    a {
      margin-left: $d11-large-spacer;
      text-decoration: none;
    }
  }
}

.v-application-xs {
  .footer {
    padding: $d11-spacer;
  }
}

@media print {
  .footer-background {
    display: none !important;
  }
}
</style>
