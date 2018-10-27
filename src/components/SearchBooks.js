import React from 'react'
import * as BooksAPI from '../BooksAPI'
import Book from './Book.js'
import { Link } from 'react-router-dom'

class SearchBooks extends React.Component {
	state = {
		query: '',
		searchedBooks: []
	}
	debounce = (a,b,c) => {var d,e;return function(){function h(){d=null,c||(e=a.apply(f,g))}var f=this,g=arguments;return clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e}}
	
	setSearchTerm = this.debounce(query => {
		this.setState({ query })
		this.collectSearchedBooks(query)
    }, 500)//delay is 500ms

	collectSearchedBooks = (query) => {
		if (query) {
			BooksAPI.search(query).then((searchResult) => {
				console.log(searchResult);
				if (searchResult.error) {
					this.setState({ searchedBooks: [] })
				} else {
					this.setState({ searchedBooks: searchResult })
				}
			})
		} else {
			this.setState({ searchedBooks: [] })
		}
	}

	render() {
		const createSearchedBooksContainer = (searchedBook) => {
			let bookShelf = 'none'

			const compareBooks = (book) => {
				if (book.id === searchedBook.id) {
					bookShelf = book.shelf
				}
			}

			this.props.myBooks.forEach(compareBooks)

			return (
				<Book
					key={searchedBook.id}
					book={searchedBook}
					changeShelf={this.props.changeShelf}
					currentShelf={bookShelf}
				/>
			)
		}

		let searchedBookContainers = this.state.searchedBooks.map(createSearchedBooksContainer)

		return (
			<div className='search-books'>
				<div className='search-books-bar'>
					<Link
						className='close-search'
						to='/'
					>Close</Link>
					<div className='search-books-input-wrapper'>
						{
							// NOTES: The search from BooksAPI is limited to a particular set of search terms.
							// You can find these search terms here:
							// https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							// However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							// you don't find a specific author or title. Every search is limited by search terms.
						}
						<input
							type='text'
							placeholder='Search by title or author'
							// value={this.state.query}
							onChange={(event) => this.setSearchTerm(event.target.value)}
						/>

					</div>
				</div>
				<div className='search-books-results'>
					<ol className='books-grid'>
						{searchedBookContainers}
					</ol>
				</div>
			</div>
		)
	}

	
}

export default SearchBooks