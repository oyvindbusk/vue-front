<template>
    <div id="login">

        <form name="login" action="http://localhost:5001/dologin" method="POST" class="box">
            <p class="h4 text-center mb-4">Sign in</p>
            <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
            <input name="email" type="email" id="defaultFormLoginEmailEx" class="form-control input is-rounded" dir="auto" value="email@email.com"/>
            <br/>
            <label for="defaultFormLoginPasswordEx" class="grey-text">Your password</label>
            <input name="password" type="password" class="form-control input is-rounded" dir="auto" value="Pass"/>
            
            <div class="text-center mt-4">
                <b-button class="btn btn-indigo" type="submit" value="Login">Login</b-button>
            </div>
        </form>
    
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            input: {
                username: "",
                password: ""
            }

        }
    }
}
</script>