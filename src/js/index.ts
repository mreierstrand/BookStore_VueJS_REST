import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface IBook {
    id: Number;
    title: String;
    author: String;
    publisher: String;
    price: Number;
}

let baseUrl: string = "http://anbo-bookstorerest.azurewebsites.net/api/Books"

new Vue({
    el: "#app",
    data: {
        books: [],
        errorMessage: "",
        formData: {
            id: 0,
            title: "",
            author: "",
            publisher: "",
            price: 0
        },
        addMessage: "",
        deleteId: "",
        deleteMessage: ""
    },

    methods: {
        getAllBooks() {
            console.log("getAllBooks")
            axios.get<IBook[]>(baseUrl)
                .then((response: AxiosResponse<IBook[]>) => {
                    console.log(response.data)
                    this.books = response.data
                })

                .catch((error: AxiosError) => {
                    this.errorMessage = error.message
                })
        },
        addBook() {
            axios.post<IBook>(baseUrl, this.formData)
                .then((response: AxiosResponse<IBook>) => {
                    console.log(response.data)
                    this.addMessage = "Book Added"
                    this.getAllBooks()

                })
                .catch((error: AxiosError) => {
                    this.errorMessage = error.message
                })
        },
        deleteBook(deleteId: number) {
            let uri: string = baseUrl + "/" + deleteId
            axios.delete<void>(uri)
                .then((response: AxiosResponse<void>) => {
                    this.deleteMessage = "Book deleted"
                    this.getAllBooks()
                })
                .catch((error: AxiosError) => {
                    this.errorMessage = error.message
                })
        }
    }
})