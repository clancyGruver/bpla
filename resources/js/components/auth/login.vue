<template>
    <div class="container h-100">
		<div class="d-flex justify-content-center h-100">
			<div class="user_card">
				<div class="d-flex justify-content-center">
					<div class="brand_logo_container">
						<img src="/dist/batman.png" class="brand_logo" alt="Logo">
					</div>
				</div>
				<div class="d-flex justify-content-center form_container">
					<form>
						<div class="input-group mb-3">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-user"></i></span>
							</div>
							<input required v-model="name" type="text" name="" class="form-control input_user" value="" placeholder="Имя пользователя">
						</div>
						<div class="input-group mb-2">
							<div class="input-group-append">
								<span class="input-group-text"><i class="fas fa-key"></i></span>
							</div>
							<input required v-model="password" type="password" name="" class="form-control input_pass" value="" placeholder="Пароль">
						</div>
                        <div class="d-flex justify-content-center mt-3 login_container">
                            <button type="button" name="button" class="btn login_btn" @click="login">Войти</button>
                        </div>
                    </form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: 'login',
    data: () => ({
        infoError:false,
        name: '',
        password: ''
    }),
    beforeCreate(){
        if(this.$store.state.isLogged){
            this.$router.push('/');
        }
    },
    mounted(){
        const appEl = document.getElementById('app');       
        const classElements = [
            'd-flex',
            'justify-content-center',
            'h-100'
        ];
        classElements.map( el => appEl.classList.add(el) );
    },
    methods:{
        login(){
            this.infoError = false;

            let name = this.name;
            let password = this.password;

            this.$store
                .dispatch('login', { name, password })
                .then(() => this.$router.push('/'))
                .catch(err => {
                    this.infoError = true;
                    console.log(err)
                });
        }
    }
}
</script>

<style>
    body,html {
        margin: 0;
        padding: 0;
        height: 100%;
        background: #60a3bc !important;
    }
    .user_card {
        height: 400px;
        width: 350px;
        margin-top: auto;
        margin-bottom: auto;
        background: #f39c12;
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 5px;

    }
    .brand_logo_container {
        position: absolute;
        height: 170px;
        width: 170px;
        top: -75px;
        border-radius: 50%;
        background: #60a3bc;
        padding: 10px;
        text-align: center;
    }
    .brand_logo {
        height: 150px;
        width: 150px;
        border-radius: 50%;
    }
    .form_container {
        margin-top: 100px;
    }
    .login_btn {
        width: 100%;
        background: #c0392b !important;
        color: white !important;
    }
    .login_btn:focus {
        box-shadow: none !important;
        outline: 0px !important;
    }
    .login_container {
        padding: 0 2rem;
    }
    .input-group-text {
        background: #c0392b !important;
        color: white !important;
        border: 0 !important;
        border-radius: 0.25rem 0 0 0.25rem !important;
    }
    .input_user,
    .input_pass:focus {
        box-shadow: none !important;
        outline: 0px !important;
    }
    .custom-checkbox .custom-control-input:checked~.custom-control-label::before {
        background-color: #c0392b !important;
    }
</style>