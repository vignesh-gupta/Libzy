const books = [
  {
    title: "Atomic Habbits",
    description: "How small habit can make huge impacts!How small habit can make huge impacts!How small habit can make huge impacts!How small habit can make huge impacts!How small habit can make huge impacts!How small habit can make huge impacts!",
    imgUrl: "https://m.media-amazon.com/images/I/51gJpbOQpHL._SY346_.jpg",
    isTrending: true,
    count: 4,
    rating: 5,
    author: "Hames Clear",
    id: 1
  },
  {
    title: "Btomic Habbits",
    description: "How small habit can make huge impacts!",
    imgUrl: "https://m.media-amazon.com/images/I/51gJpbOQpHL._SY346_.jpg",
    isTrending: true,
    count: 5,
    rating: 3,
    author: "James Clear",
    id: 2
  },
  {
    title: "Ctomic Habbits",
    description: "How small habit can make huge impacts!",
    imgUrl: "https://m.media-amazon.com/images/I/51gJpbOQpHL._SY346_.jpg",
    isTrending: true,
    count: 5,
    rating: 2,
    author: "James Clear",
    id: 3
  },
  {
    title: "Dtomic Habbits",
    description: "How small habit can make huge impacts!",
    imgUrl: "https://m.media-amazon.com/images/I/51gJpbOQpHL._SY346_.jpg",
    isTrending: false,
    count: 5,
    rating: 1,
    author: "James Clear",
    id: 4
  }
]

let selectedBook = {
  title: "Habbits",
  description: "How small habit can make huge impacts!",
  imgUrl: "https://m.media-amazon.com/images/I/51gJpbOQpHL._SY346_.jpg",
  isTrending: false,
  count: 5,
  rating: 1,
  author: "James Clear",
  id: 4,
}

books.splice(selectedBook.id - 1, 1, selectedBook)
console.log(books)