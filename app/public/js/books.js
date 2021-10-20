const BookApp = {
    data() {
      return {

        // "books": {title:{}, author:{}, year_pub:{}, pages:{}, msrp:{}}
        books:[],
        bookForm: {}
      }
    },
    computed: {

    },
    methods: {
      prettyDollar(n) {
          const d = new Intl.NumberFormat("en-US").format(n);
          return "$ " + d;
      },

    fetchBookData() {
          fetch('/api/books')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.books = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
        },
      postNewBook(evt) {
          //     this.offerForm.studentId = this.selectedStudent.id;

              // console.log("Posting!", this.bookForm);
              console.log("Posting!");

              fetch('api/books/create.php', {
                  method:'POST',
                  body: JSON.stringify(this.bookForm),
                  headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  }
                })
                .then( response => response.json() )
                .then( json => {
                  console.log("Returned from post:", json);
                  // TODO: test a result was returned!
                  this.books = json;

                  // reset the form
                  this.bookForm = {};
                });

      }
    },
    created() {
        // this.fetchUserData();
        this.fetchBookData();
    }

  }

  Vue.createApp(BookApp).mount('#bookApp');
