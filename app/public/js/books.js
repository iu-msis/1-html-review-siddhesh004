const BookApp = {
    data() {
      return {

        // "books": {title:{}, author:{}, year_pub:{}, pages:{}, msrp:{}}
        books:[],
        bookForm: {},
        selectedBook: null
      }
    },
    computed: {

    },
    methods: {
      prettyDollar(n) {
          const d = new Intl.NumberFormat("en-US").format(n);
          return "$ " + d;
      },
      selectBook(o) {
        this.selectedBook = o;
        this.bookForm = Object.assign({}, this.selectedBook);
      },
      postBook(evt) {
        if (this.selectedBook === null) {
            this.postNewBook(evt);
        } else {
            this.postEditBook(evt);
        }
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

      },
      postEditBook(evt) {
                this.bookForm.id = this.selectedBook.id;


                console.log("Updating!", this.bookForm);

                fetch('api/books/update.php', {
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

                    this.bookForm = {};
                  });
              },
        postDeleteBook(book) {
                if (!confirm("Are you sure you want to delete the record for "+book.title+"?")) {
                      return;
                }
                console.log("Starting to Delete");
                fetch('api/books/delete.php', {
                method:'POST',
                body: JSON.stringify(book),
                headers: {
                      "Content-Type": "application/json; charset=utf-8"
                      }
                  })
                .then( response => response.json() )
                .then( json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.books = json;



                    });
          }

    },
    created() {
        // this.fetchUserData();
        this.fetchBookData();
    }

  }

  Vue.createApp(BookApp).mount('#bookApp');
