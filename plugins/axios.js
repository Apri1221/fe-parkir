// interceptor axios in nuxt, strategy to look at auth._token.local

export default function (context) {
    context.$axios.onError((error) => {
        console.log("error", error);
        if (error.response.status === 401) {
            if (window.localStorage.getItem("auth._token.local").toLowerCase() !== "false") {
                context.$auth.logout();
            }
        }
    })
}