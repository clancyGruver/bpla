<template>
    <nav class="navbar navbar-expand-lg batman-yellow static-top">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="/dist/batman.png" alt="" class="">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                <a class="nav-link" href="#">Home
                        <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Services</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Contact</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
    .batman-yellow{
        background-color: #ff0 !important;
        border-bottom-color: #000;
        border-bottom-width: 2px;
        border-bottom-style: solid;
    }
    .nav-link{
        color: #000;
    }
    img{
        width: 75px;
    }

</style>