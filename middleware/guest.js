export default function ({ store, redirect }) {
  if (store.state.auth.loggedIn) {
    let roleId = store.state.auth.user.data.id_role;
    console.log(roleId)
    if (roleId == 2) {
      return redirect("/dashboard/operator");
    }
    return redirect("/dashboard");
  }
}
