<template>
    <b-container>
        <b-row>
            <b-col
                col
                sm="9"
                md="7"
                lg="5"
            >
                <card
                    class="my-5 text-center"
                    title="Вход"
                >
                    <b-card-body>
                        <b-card-text>
                           <b-form @submit="login">
                                <b-form-group
                                    label="Логин"
                                    description="Введите логин"
                                >
                                    <b-form-input
                                    v-model="name"
                                    type="text"
                                    required
                                    placeholder="Логин"
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    label="Пароль"
                                    description="Введите пароль"
                                >
                                    <b-form-input
                                    v-model="password"
                                    type="password"
                                    required
                                    placeholder="Пароль"
                                    ></b-form-input>
                                </b-form-group>
                           </b-form>
                        </b-card-text>
                    </b-card-body>

                    <b-button type="submit" variant="primary">Войти</b-button>

                </card>
            </b-col>
        </b-row>
    </b-container>

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
    methods:{
        login(){
            this.infoError = false;

            axios.post('/api/login',{
                name: this.name,
                password: this.password,
            }).then( resp => {
                const data = res.data;
                localStorage.setItem('token', data.token);
                axios.headers[]
                this.$store.commit('LOGIN_USER');
                this.$router.push('/');
            } ).catch( err => {
                this.password = '';
                this.infoError = true;
            })
        }
    }
}
</script>