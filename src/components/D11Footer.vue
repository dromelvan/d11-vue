<template>
  <div class="footer-background">
    <v-container>
      <div class="footer">
        <div>D11 4.0.0-beta1</div>
        <v-spacer />
        <div>
          <a href="https://github.com/dromelvan/d11-vue">D11 Vue</a>
          <a href="https://github.com/dromelvan/d11-boot">D11 Boot</a>
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
  background: url("../assets/images/app-bar-background.png");
  background-color: var(--v-brand-base);
  color: white;

  .footer {
    display: flex;
    a {
      margin-left: $d11-large-spacer;
      color: white;
      text-decoration: none;
    }
  }
}

@media print {
  .footer-background {
    display: none !important;
  }
}
</style>
