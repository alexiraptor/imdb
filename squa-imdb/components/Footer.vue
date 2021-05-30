<template>
    <footer class="mt-4 footer">
        <div class="container h-100">
            <div class="wrapper">
                <div class="h-75 d-flex flex-column justify-content-between section">
                    <h6 class="text-uppercase font-weight-bold section-title">Nous contacter</h6>
                    <div class="mb-2">
                        <i class="bi bi-geo-alt-fill mr-2 section-icon"></i>
                        <span>1, rue Demo 75000 Paris, France</span>
                    </div>
                    <div class="mb-2">
                        <i class="bi bi-telephone-fill mr-2 section-icon"></i>
                        <span>01 71 00 00 00</span>
                    </div>
                    <div class="mb-2">
                        <i class="bi bi-envelope-fill mr-2 section-icon"></i>
                        <span>KineAddix@KineAddix.fr</span>
                    </div>
                </div>

                <div class="h-75 section">
                    <h6 class="text-uppercase font-weight-bold section-title">Informations</h6>
                    <div class="mb-2 section-body">
                        <a class="mb-2 section-item">
                            Qui sommes-nous ?
                        </a>
                        <br>
                        <a class="mb-2 section-item">
                            Livraison
                        </a>
                        <br>
                        <a class="mb-2 section-item">
                            Conditions générales de vente
                        </a>
                        <br>
                        <a class="mb-2 section-item">
                            Mentions générales
                        </a>
                        <br>
                        </div>
                    </div>

                    <div class="h-75 section">
                        <h6 class="text-uppercase font-weight-bold section-title">Mon compte</h6>
                        <div class="section-body" ref="footerAccount">
                            <a class="mb-2 section-item">
                                Mon compte
                            </a>
                            <br>
                            <a class="mb-2 section-item">
                                Historique des achats
                            </a>
                            <br>
                            <a class="mb-2 section-item">
                                Plan du site
                            </a>
                            <br>
                        </div>
                    </div>

                <NuxtLink class="logo-link" to="/home">
                    <img :src="require('@/assets/logoCine.png')"
                    alt="Logo Kineaddix"
                    class="logo-link">
                </NuxtLink>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
 name: 'Footer',
}
</script>


<style scoped>

.mt-4 {
  background-color: #fa2a2a;
}

h6 {
  padding-top: 30px;
}


.wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
}

.logo-link {
    width: 5rem;
    height: auto;
    margin-top: 25px;
}

.section {

    font-size: 0.9rem;
    padding-left: 1rem;
    padding-bottom: 0.5rem;
    margin-bottom: 30px;
}

.section-title {
    color: ivory;
    font-size: 1.1rem;
}
/*
.section-icon {
    color:#e611e9;
    font-size: 1.1rem;
    margin-right: 10px;
}
*/
span {
    color:ivory;
}

.section-item {
    color:ivory;
    cursor: pointer;
    text-decoration: none;
    transition: all 300ms ease-out;
}

.section-item:hover {
    color:#e611e9;
    transform: translateX(1rem);
}

</style>
