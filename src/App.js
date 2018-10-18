import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListOfBooks from './components/ListOfBooks'
import SearchBooks from './components/SearchBooks'
import './App.css'

class BooksApp extends React.Component {
	state = {
		currentlyReadingBooks: [],

		wantToReadBooks: [],

		readBooks: []
	}

	collectBooks(books) {
		const currentlyReadingBooksTmp = []
		const wantToReadBooksTmp = []
		const readBooksTmp = []
		for (let i = 0; i < books.length; i++) {
			const book = books[i]
			const shelf = book.shelf
			if (shelf === 'currentlyReading') {
				currentlyReadingBooksTmp.push(book)
			} else if (shelf === 'wantToRead') {
				wantToReadBooksTmp.push(book)
			} else if (shelf === 'read') {
				readBooksTmp.push(book)
			}
		}
		this.setState({
			currentlyReadingBooks: currentlyReadingBooksTmp,
			wantToReadBooks: wantToReadBooksTmp,
			readBooks: readBooksTmp
		})
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.collectBooks(books)
		})
	}

	changeShelf(book, shelf) {
		BooksAPI.update(book, shelf).then(() => {
			BooksAPI.getAll().then((books) => {
				this.collectBooks(books)
			})
		})
	}

	render() {
		if (this.state.currentlyReadingBooks.length === 0) {
			return (<div/>)
		}

		const myBooks = this.state.currentlyReadingBooks.concat(this.state.wantToReadBooks, this.state.readBooks)

		return (
			<div className='app'>
				<Route exact path='/' render={() => (
					<ListOfBooks
						currentlyReadingBooks={this.state.currentlyReadingBooks}
						wantToReadBooks={this.state.wantToReadBooks}
						readBooks={this.state.readBooks}
						changeShelf={this.changeShelf.bind(this)}
					/>
				)}/>
				<Route path='/search' render={() => (
					<SearchBooks
						myBooks={myBooks}
						changeShelf={this.changeShelf.bind(this)}
					/>
				)}/>
			</div>
		)
	}
}

export default BooksApp