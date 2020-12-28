<template>
    <div class="container" id="login">
        <div class="row row justify-content-center">
            <div class="col-xs-12">
                <form name="login" :action="login_URL" method="POST" class="box">
                    <h1 class="h3">Please sign in</h1>
                    <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
                    <input name="email" type="email" id="defaultFormLoginEmailEx" class="form-control input is-rounded" dir="auto" value="email@email.com" />
                    <br/>
                    <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
                    <input name="password" type="password" class="form-control input is-rounded" dir="auto" value="Pass" />
                    <div class="text-center mt-4">
                    <input href="#" type="submit" class="btn btn-primary" value="Login" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { config } from '../config.js';
export default {

    
    name: "login",
    data() {
        return {
            input: {
                username: "",
                password: ""
            },
            login_URL: config.$backend_url + '/dologin'

        }
    }
}
</script>

<style scoped>
.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}
</style>