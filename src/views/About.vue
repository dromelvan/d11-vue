<template>
  <v-container>
    <div class="about">
      <h1>About Drömelvan</h1>

      <p>Your D11 experience is made possible by the following technologies.</p>

      <v-row>
        <v-col md="3" sm="6" xs="12">
          <h2>Java</h2>
          <img src="@/assets/images/about/java.png" class="technology-icon" />

          <p>
            Java is a programming language and computing platform first released
            by Sun Microsystems in 1995. Java is fast, secure, and reliable.
            From laptops to datacenters, game consoles to scientific
            supercomputers, cell phones to the Internet, Java is everywhere!
          </p>
          <p>
            <a href="http://www.java.com/">http://www.java.com/</a>
          </p>
        </v-col>

        <v-col md="3" sm="6" xs="12">
          <h2>Spring Boot</h2>
          <img
            src="@/assets/images/about/spring-boot.png"
            class="technology-icon"
          />
          <p>
            Spring Boot makes it easy to create stand-alone, production-grade
            Spring based Applications that you can "just run". We take an
            opinionated view of the Spring platform and third-party libraries so
            you can get started with minimum fuss.
          </p>
          <p>
            <a href="http://spring.io/projects/spring-boot/">
              http://spring.io/projects/spring-boot/
            </a>
          </p>
        </v-col>

        <v-col md="3" sm="6" xs="12">
          <h2>Vue.js</h2>
          <img src="@/assets/images/about/vue-js.png" class="technology-icon" />
          <p>
            Vue.js is an open-source model–view–viewmodel front end JavaScript
            framework for building user interfaces and single-page applications.
          </p>
          <p style="white-space: nowrap">
            <a href="http://www.vuejs.org/">http://www.vuejs.org/</a>
            <span style="color: white">filler</span>
          </p>
        </v-col>

        <v-col md="3" sm="6" xs="12">
          <h2>Vuetify</h2>
          <img
            src="@/assets/images/about/vuetify.png"
            class="technology-icon"
          />
          <p>
            Vuetify is a Vue UI Library with beautifully handcrafted Material
            Components. No design skills required — everything you need to
            create amazing applications is at your fingertips.
          </p>
          <p>
            <a href="http://vuetifyjs.com/">https://vuetifyjs.com/</a>
          </p>
        </v-col>

        <v-col md="3" sm="6" xs="12">
          <h2>PostgreSQL</h2>
          <img
            src="@/assets/images/about/postgresql.png"
            class="technology-icon"
          />

          <p>
            The PostgreSQL database is a powerful, open source object-relational
            database system. Its proven architecture has earned it a strong
            reputation for reliability, data integrity, and correctness.
          </p>
          <p>
            <a href="http://www.postgresql.org/">http://www.postgresql.org/</a>
          </p>
        </v-col>
        <!--
        <v-col md="3" sm="6" xs="12">
          <h2>Vue.js</h2>
          <img src="@/assets/images/about/vue-js.png" class="technology-icon" />
          <p>
            Vue.js is an open-source model–view–viewmodel front end JavaScript
            framework for building user interfaces and single-page applications.
          </p>
          <p>
            <a href="http://vuejs.org/">http://vuejs.org/</a>
          </p>
        </v-col>
-->
        <v-col md="3" sm="6" xs="12">
          <h2>Docker</h2>
          <img src="@/assets/images/about/docker.png" class="technology-icon" />
          <p>
            Docker makes development efficient and predictable Docker takes away
            repetitive, mundane configuration tasks and is used throughout the
            development lifecycle for fast, easy and portable application
            development - desktop and cloud.
          </p>
          <p>
            <a href="http://www.docker.com/">http://www.docker.com/</a>
          </p>
        </v-col>

        <v-col md="3" sm="6" xs="12">
          <h2>Mac Mini</h2>
          <img
            src="@/assets/images/about/mac-mini.png"
            class="technology-icon"
          />
          <p>
            Mac mini is an affordable powerhouse that packs the entire Mac
            experience into a 7.7-inch-square frame. Just connect your own
            display, keyboard, and mouse, and you’re ready to make big things
            happen. It’s mini in a massive way.
          </p>
          <p>
            <a href="http://www.apple.com/mac-mini/">
              http://www.apple.com/mac-mini/
            </a>
          </p>
        </v-col>

        <v-col md="3" sm="6" xs="12">
          <h2>macOS Big Sur</h2>
          <img src="@/assets/images/about/apple.png" class="technology-icon" />
          <p>
            macOS Big Sur elevates the most advanced desktop operating system in
            the world to a new level of power and beauty. Experience Mac to the
            fullest with a refined new design.
          </p>
          <p>
            <a href="http://www.apple.com/macos/big-sur/">
              https://www.apple.com/macos/big-sur/
            </a>
          </p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style lang="scss" scoped>
.section {
  display: flex;
}
.sub-section {
  margin: $d11-large-spacer;
  width: 25%;
}

h2 {
  margin-bottom: $d11-large-spacer;
}

.technology-icon {
  margin-right: 15px;
  float: left;
}
</style>
