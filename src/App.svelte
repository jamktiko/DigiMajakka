<script>
</script>

<main>
  <h1>Tikotyökkäri</h1>
  <div class="loginblock">
    <div class="headUnderline" />
    <div id="login">
      <h3>Login</h3>
    </div>
  </div>

  <content>
    <div class="firstRow">
      <div class="isoLaatikko">
        <h3>Ilmoita avoimesta työtehtävästä</h3>
        <div class="pieniLaatikko">
          <h2>Työnantajille</h2>
        </div>
      </div>

      <div class="isoLaatikko">
        <h3>Löydä töitä</h3>
        <div class="pieniLaatikko">
          <h2>Opiskelijoille</h2>
        </div>
      </div>
    </div>
    <div class="secondRow">
      <div class="isoLaatikko">
        <h3>Löydä tekijä työtehtävään</h3>
        <div class="pieniLaatikko">
          <h2>Selaa opiskelijoita</h2>
        </div>
      </div>

      <div class="isoLaatikko">
        <h3>Palvelun toiminta ja laskutus</h3>
        <div class="pieniLaatikko">
          <h2>Ohjeita</h2>
        </div>
      </div>
    </div>
  </content>
</main>

<style>
  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    background-color: #037797;
  }

  h1 {
    color: #d6eafe;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin-left: 100px;
  }

  h3 {
    color: #d6eafe;
  }

  .headUnderline {
    background-color: #d6eafe;
    height: 2.5px;
    width: 900px;
  }

  .loginblock {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 50px;
  }

  #login {
    width: 200px;
    height: 50px;
    border-radius: 10px;
    background-color: #0eadd9;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  content {
    display: flex;
  }

  .isoLaatikko {
    background-color: #015870;
    height: 200px;
    width: 500px;
    margin: 10px;
    padding: 20px;
  }

  .pieniLaatikko {
    height: 50px;
    width: 300px;
    border-radius: 25px;
    background-color: #d6eafe;
    margin-left: 100px;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
