<template>
<div class="w-screen h-screen flex items-center justify-center">
    <div class="flex justify-center flex-col gap-2 items-center h-[600px] w-[600px] shadow-lg rounded-lg">
        <h1>Login sahifasi</h1>
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 w-[400px] " action="">
            <UInput :required="true" v-model="loginValue" type="text" placeholder="Username" />
            <UInput :required="true" v-model="passwordValue" type="password" placeholder="Password" />
            <UButton color="secondary" class="w-full flex justify-center text-white" type="submit">
                {{ loadingButton ? 'Loading...' : 'Login' }}
            </UButton>
        </form>
    </div>
</div>
</template>
<script lang="ts" setup>
const loginValue = ref <string>('');
const passwordValue = ref <string>('');
const toast = useToast();
const loadingButton = ref <boolean>(false);

onMounted(() => {
 
})

const handleSubmit = async () => {
    loadingButton.value = true;
   const {data, status, error, pending } = await useFetch('/api/auth/login', {
    method : "POST",
    body : {
        username : loginValue.value,
        password : passwordValue.value
    }
   });

   if(error.value?.statusCode == 401){
    toast.add({
        title : "Xatolik",
        description : error.value?.statusMessage,
        color : "error"
    });
    loginValue.value = '';
    passwordValue.value = '';
    return ;
   }
   if(data.value){
    toast.add({
        title : "Muvaffaqiyatli",
        description : "Login qilindi",
        color : "success"
    })
   }
   loadingButton.value = false;
}

</script>