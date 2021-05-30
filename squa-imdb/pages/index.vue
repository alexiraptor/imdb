<template>
  <div>
    <div class="welcome">
      <h1 class="text-center">Welcome in KineAddix :</h1>
      <p class="text-center">the Best Website to Enjoy Films from all over the World</p>
    </div>
    <div>
      <NuxtLink class="containerPhotos" to="/home">
          <div class="sousconteneur">
            <img alt="citededieu" src="../assets/citededieu.jpeg" class="citedieu"/>
          </div>
          <div class="sousconteneur2">
            <div class="hello2">
                <img alt="Deathnote" src= "../assets/Deathnote.jpeg" class="deathnote"/>
                <img alt="mary" src= "../assets/mary.jpg" class="mary"/>
            </div>
            <div class="hello3">
                <img alt="snatch" src= "../assets/snatch.jpg" class="snatch"/>
                <img alt="nollywood" src= "../assets/nollywood.jpeg" class="nollywood"/>
            </div>
          </div>
      </Nuxtlink>
    </div>
  </div>
</template>

<script>

</script>

<style>

h1{
    color: #fa2a2a;
    text-shadow: 2px 2px 2px grey;
    margin-top: 1%;
    margin-bottom: 1%;
}

p {
    color: coral;
    text-shadow: 2px 2px 45px grey;
    justify-content: center;
}
.sousconteneur img {
      height: 480px;
      margin: 10px;
      transition-duration: 0.5s;
      border-radius: 4px;
  }

  .sousconteneur img:hover {
      transform:scale(1.05)
  }

.sousconteneur2 img {
      height: 232.5px;
      margin: 10px;
      transition-duration: 0.5s;
      border-radius: 4px;
  }

.sousconteneur2 img:hover {
    transform:scale(1.05)
}

.sousconteneur2 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .containerPhotos{
    display: flex;
    flex-direction: row;
    justify-content: center;
    object-fit: cover;
  }

  .hello2 img {
    width: 300px;
    object-fit: cover;
    display: flex;
    flex-direction:column;
  }

  .hello3 img {
    width: 300px;
    display: flex;
    flex-direction:column;
  }

</style>
