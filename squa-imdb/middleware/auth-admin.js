export default async function({$auth, redirect, store}){
    let user = $auth.user;
    if (user && user.admin){

    }else{
        store.dispatch('snackbar/setSnackBar', {color:'error', text:'Vous devez être un admin'})
        redirect('/home')
    }

}